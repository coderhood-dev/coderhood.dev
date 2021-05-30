export const LessonVideo = ({ videoURL, title }) => {
  console.log('videoURL', videoURL)
  if (!videoURL) {
    return (
      <aside className='p-4 m-2 bg-gray-800 rounded-xl'>
        <p className='text-sm'>
          Al parecer todavía no hay un video asignado a la clase, si el video de
          Youtube ya está listo podés agregar el link al documento de la clase
          para que aparezca acá.
        </p>
      </aside>
    )
  }
  return (
    <div
      className='relative w-full overflow-hidden'
      style={{ paddingTop: '56.25%' }}
    >
      <iframe
        className='absolute top-0 bottom-0 left-0 right-0 w-full h-full'
        src={videoURL}
        title={title}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  )
}
