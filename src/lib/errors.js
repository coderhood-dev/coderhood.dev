export const getErrorMessage = (error) => {
  const translatedError = {
    'Invalid email or password': 'No encontramos esa combinación de email y contraseña',
    'A user with this email address has already been registered':
      'Ya existe un usuario registrado con ese email',
  }[error]

  return translatedError || error
}
