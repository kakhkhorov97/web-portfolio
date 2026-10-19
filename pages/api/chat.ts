import type { NextApiRequest, NextApiResponse } from 'next';
import { answer, createLimiter, isSameSite, parseRequest } from '../../lib/chat';

const limiter = createLimiter();

export const config = { api: { bodyParser: { sizeLimit: '32kb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  if (!isSameSite(req.headers.origin, req.headers.host)) {
    return res.status(403).json({ error: 'forbidden' });
  }
  const parsed = parseRequest(req.body);
  if ('error' in parsed) return res.status(400).json({ error: parsed.error });

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  const limit = limiter.check(ip);
  if (limit !== 'ok') return res.status(429).json({ error: limit === 'daily' ? 'daily_cap' : 'rate_limited' });

  const reply = await answer(parsed, process.env.GEMINI_API_KEY);
  return res.status(200).json({ reply });
}
