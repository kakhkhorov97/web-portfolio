import type { AppProps } from 'next/app';
import { Noto_Sans_KR, Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-jakarta', display: 'swap' });
const notoKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-kr', display: 'swap', preload: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${jakarta.variable} ${notoKr.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
