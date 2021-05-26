export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const parseFileName = (file) => {
  const name = file.split(/-(.+)/)[1]
  const words = name.split('-')
  const [fistWord, ...others] = words
  const title = [capitalize(fistWord), ...others].join(' ')

  return { name, title }
}
