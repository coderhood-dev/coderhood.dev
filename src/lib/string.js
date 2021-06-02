export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// fundamentos-de-programacion -> Fundamentos de programacion
export const getTitleFromKebab = (name, prefix) => {
  const words = name.split('-')
  const [fistWord, ...others] = words
  const title = [capitalize(fistWord), ...others].join(' ')

  return title
}

export const getTitleFromFile = (file) => {
  const name = file.split(/-(.+)/)[1]

  return getTitleFromKebab(name)
}

// 01-fundamentos-de-programacion -> {
//    url: 'fundamentos-de-programacion',
//    title: 'Fundamentos de programacion
// }
export const buildLessonStrings = (url, urlPrefix) => {
  const name = url.split(/-(.+)/)[1]
  return {
    url: `${urlPrefix}/${name}`,
    text: getTitleFromKebab(name),
  }
}
