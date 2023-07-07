import { create } from 'zustand';
import { getAllData, getData, setData } from './firebase';

interface StoreType {
  user: Object | null;
  setUser: Function;
  memberData: any[];
  promptDescription: boolean;
  updateMemberData: Function;
  preFetch: Function;
  setPromptDescription: (opt: boolean) => void;
}

const useStore = create<StoreType>()((set) => ({
  user: null,
  promptDescription: false,

  setPromptDescription(opt) {
    set(() => ({ promptDescription: opt }));
  },
  setUser(user: any) {
    set((s) => ({ ...s, user }));
  },
  memberData: [],
  preFetch() {
    getAllData().then((e) => set(() => ({ memberData: e })));
  },
  updateMemberData(data: any) {
    setData({ ...data, id: data.email });
    getAllData().then((e) => set(() => ({ memberData: e })));
  },
}));

export default useStore;
