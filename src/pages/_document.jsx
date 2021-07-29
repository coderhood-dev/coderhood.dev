import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='es'>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              var DEV_TOOLS = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;            
              if (typeof DEV_TOOLS === "object") DEV_TOOLS.inject = function () {};
            `,
          }}
        /> */}
        <Head>
          <link href='https://fonts.googleapis.com' rel='preconnect' />
          <link crossOrigin href='https://fonts.gstatic.com' rel='preconnect' />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap'
            rel='stylesheet'
          />
          <link href='/icons/apple-icon-57x57.png' rel='apple-touch-icon' sizes='57x57' />
          <link href='/icons/apple-icon-60x60.png' rel='apple-touch-icon' sizes='60x60' />
          <link href='/icons/apple-icon-72x72.png' rel='apple-touch-icon' sizes='72x72' />
          <link href='/icons/apple-icon-76x76.png' rel='apple-touch-icon' sizes='76x76' />
          <link href='/icons/apple-icon-114x114.png' rel='apple-touch-icon' sizes='114x114' />
          <link href='/icons/apple-icon-120x120.png' rel='apple-touch-icon' sizes='120x120' />
          <link href='/icons/apple-icon-144x144.png' rel='apple-touch-icon' sizes='144x144' />
          <link href='/icons/apple-icon-152x152.png' rel='apple-touch-icon' sizes='152x152' />
          <link href='/icons/apple-icon-180x180.png' rel='apple-touch-icon' sizes='180x180' />
          <link
            href='/icons/android-icon-192x192.png'
            rel='icon'
            sizes='192x192'
            type='image/png'
          />
          <link href='/icons/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
          <link href='/icons/favicon-96x96.png' rel='icon' sizes='96x96' type='image/png' />
          <link href='/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
          <link href='/icons/manifest.json' rel='manifest' />
          <meta content='#ffffff' name='msapplication-TileColor' />
          <meta content='/ms-icon-144x144.png' name='msapplication-TileImage' />
          <meta content='#ffffff' name='theme-color' />

          {/* Meta Tags for HTML pages on Mobile */}
          <meta content='telephone=yes' name='format-detection' />
          <meta content='true' name='HandheldFriendly' />
          <meta content='#000' name='theme-color' />
          <link href='/icons/favicon.ico' rel='shortcut icon' />
        </Head>
        <body className='text-black bg-white dark:bg-gray-900 dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
