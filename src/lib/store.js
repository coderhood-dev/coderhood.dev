import create from 'zustand'

const useStore = create((set) => {
  return {
    router: {},
    dom: null,
    lesson: null,
    algo: null,
  }
})

export default useStore
