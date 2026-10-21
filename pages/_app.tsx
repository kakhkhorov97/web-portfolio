import type { AppProps } from 'next/app';
import { Bricolage_Grotesque, Geist, Geist_Mono, Noto_Sans_KR } from 'next/font/google';
import '../styles/globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '600', '800'], variable: '--font-display', display: 'swap' });
const body = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-mono', display: 'swap' });
const notoKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-kr', display: 'swap', preload: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} ${notoKr.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
