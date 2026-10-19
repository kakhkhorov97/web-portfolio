import type { AppProps } from 'next/app';
import { Archivo, IBM_Plex_Mono, Noto_Sans_KR } from 'next/font/google';
import '../styles/globals.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex', display: 'swap' });
const notoKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-kr', display: 'swap', preload: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${archivo.variable} ${plex.variable} ${notoKr.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
