import { create } from 'zustand';

const store = (set) => ({
  user: null,
  setUser(user) {
    set((s) => ({ ...s, user }));
  },
  memberData: [
    {
      img: 'https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Emon',
      email: 'emon@nobody.com',
      position: 1,
      location: 'Dhaka',
      dayLeft: 23,
      school: 'Dhaka High School',
    },
  ],
  addMemberData(data) {
    set((s) => ({ ...s, memberData: [...s.memberData, data] }));
  },
  updateMemberData(data) {
    set((s) => {
      const index = s.memberData.findIndex(
        (el) => el.position == data.position
      );

      const arr = s.memberData;
      arr[index] = data;
      return { ...s, memberData: arr };
    });
  },
});

const useStore = create()(store);
export default useStore;
