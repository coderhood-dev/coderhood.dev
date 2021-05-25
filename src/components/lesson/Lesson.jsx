import React from 'react'

export const Lesson = ({ lesson }) => {
  const { id, mdx, pdf } = lesson
  const title = `Clase ${id}`
  return (
    <>
      <div className='flex flex-col items-center justify-start w-full min-h-screen rounded-lg'>
        <div
          className='relative w-full overflow-hidden'
          style={{ paddingTop: '56.25%' }}
        >
          <iframe
            className='absolute top-0 bottom-0 left-0 right-0 w-full h-full'
            src='https://www.youtube.com/embed/T_otbeKpdCE'
            title={`Coderhood Academy - clase ${id}`}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <h1 className='mb-10 text-2xl text-gray-700'>{title}</h1>
        {pdf ? (
          <a
            className='bg-yellow-500 rounded-full hover:ring-4 ring-yellow-500 ring-opacity-50'
            href={pdf}
            download
          >
            <p className='p-4 font-bold text-white'>
              ⚡️ Descarga el pdf de la clase
            </p>
          </a>
        ) : (
          <p className='text-xl text-gray-700'>Próximamente</p>
        )}
        {/* {mdx && <pre className='pt-10 text-gray-700'>{mdx}</pre>} */}
      </div>
    </>
  )
}
