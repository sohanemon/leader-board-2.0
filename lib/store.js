import { create } from 'zustand';

const store = (set) => ({
  user: null,
  setUser(user) {
    set((s) => ({ ...s, user }));
  },
  memberData: [
    {
      img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
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
    console.log('🛑 ~ updateMemberData ~ data:', data);

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
