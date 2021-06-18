export const SignIn = ({ onRequestSignUp }) => {
  return (
    <div>
      <form>
        <h3 className='p-5 text-md dark:text-white'>SignIn</h3>
        <button type='button' onClick={onRequestSignUp}>
          Registrarme
        </button>
      </form>
    </div>
  )
}
