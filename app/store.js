import { create } from "zustand"

const useStore = create((set) => ({
    navExpanded: false,
    setNavExpanded: (state) => set({ navExpanded: state }),

    // name: "",
    // setName: (name) => set(state => ({ ...state, name }))
}))

export default useStore