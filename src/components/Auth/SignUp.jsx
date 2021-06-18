export const SignUp = ({ onRequestSignIn }) => {
  return (
    <div>
      <form>
        <h3 className='p-5 text-md dark:text-white'>SignUp</h3>
        <button type='button' onClick={onRequestSignIn}>
          Ingresar
        </button>
      </form>
    </div>
  )
}
