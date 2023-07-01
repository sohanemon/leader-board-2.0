import { create } from 'zustand';

const store = (set) => ({
  user: null,
  setUser(user) {
    set((s) => ({ ...s, user }));
  },
});

const useStore = create(store);
export default useStore;
