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
    {
      img: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Man',
      email: 'man@nobody.com',
      position: 6,
      location: 'Dhaka',
      dayLeft: 20,
      school: 'Dhaka High School',
    },
    {
      img: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      name: 'Jane',
      email: 'jane@nobody.com',
      position: 2,
      location: 'New York',
      dayLeft: 15,
      school: 'New York High School',
    },
    {
      img: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Alex',
      email: 'alex@nobody.com',
      position: 4,
      location: 'London',
      dayLeft: 18,
      school: 'London High School',
    },
    {
      img: 'https://images.pexels.com/photos/3557589/pexels-photo-3557589.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Sophia',
      email: 'sophia@nobody.com',
      position: 3,
      location: 'Paris',
      dayLeft: 21,
      school: 'Paris High School',
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
