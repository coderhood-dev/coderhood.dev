import NextHead from 'next/head'

const TITLE = 'Coderhood'
const URL = 'https://coderhood.dev/'
const DESCRIPTION = 'La comunidad que impulsa el aprendizaje autodidacta y colaborativo'
const author = 'Ema Lorenzo'

export const Head = ({ title = TITLE, url = URL, description = DESCRIPTION }) => {
  return (
    <>
      <NextHead>
        {/* Recommended Meta Tags */}
        <meta charSet='utf-8' />
        <meta content='es' name='language' />
        <meta content='text/html' httpEquiv='content-type' />
        <meta content={author} name='author' />
        <meta content={author} name='designer' />
        <meta content={author} name='publisher' />

        {/* Search Engine Optimization Meta Tags */}
        <title>{title}</title>
        <meta content={description} name='description' />
        <meta
          content='Programacion, Code, Software Engineer, Aprender, Full Stack, Frontend, Backend'
          name='keywords'
        />
        <meta content='index,follow' name='robots' />
        <meta content='web' name='distribution' />
        {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
        <meta content={title} name='og:title' />
        <meta content='site' name='og:type' />
        <meta content={url} name='og:url' />
        <meta content={'/icons/logo-full.png'} name='og:image' />
        <meta content={title} name='og:site_name' />
        <meta content={description} name='og:description' />

        {/* 
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
        <meta content='summary' name='twitter:card' />
        <meta content='@onirenaud' name='twitter:site' />
      </NextHead>
    </>
  )
}
