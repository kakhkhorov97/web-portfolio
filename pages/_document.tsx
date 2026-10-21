import { Html, Head, Main, NextScript, type DocumentProps } from 'next/document';

export default function Document({ locale }: DocumentProps) {
  return (
    <Html lang={locale ?? 'en'}>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#121211" />
        {/* Apply the saved or system theme before first paint, so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'){t='dark'}document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add('js')})();`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
