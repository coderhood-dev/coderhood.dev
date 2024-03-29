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
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap'
            rel='stylesheet'
          />
          <link rel='apple-touch-icon' sizes='57x57' href='/icons/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/icons/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/icons/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/icons/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='/icons/apple-icon-114x114.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/icons/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='/icons/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/icons/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-icon-180x180.png' />
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/icons/android-icon-192x192.png'
          />
          <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/icons/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/icons/manifest.json' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />

          {/* Meta Tags for HTML pages on Mobile */}
          <meta name='format-detection' content='telephone=yes' />
          <meta name='HandheldFriendly' content='true' />
          <meta name='theme-color' content='#000' />
          <link rel='shortcut icon' href='/icons/favicon.ico' />
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
