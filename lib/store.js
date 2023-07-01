import { create } from 'zustand';

const store = (set) => ({
  user: null,
  setUser(user) {
    console.log('🛑 ~ setUser ~ user:', user);

    set((s) => ({ ...s, user }));
  },
});

const useStore = create(store);
export default useStore;
