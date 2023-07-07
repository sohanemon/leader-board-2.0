import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import useStore from './store';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};

// Initializes
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);
const collectionName = 'members';

// Utils
const goHome = () => (window.location.pathname = '/');

// Functions
export function getCurrentUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('🛑 ~ onAuthStateChanged ~ user:', user);
      useStore.getState().setUser(user);
    } else {
      // User is signed out
    }
  });
}

export function googleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      useStore.getState().setUser(user);
      goHome();
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log('🛑 ~ googleLogin ~ errorMessage:', errorMessage);
    });
}

export function createUser(name: string, email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      useStore.getState().setPromptDescription(true);
      updateProfile(user, {
        displayName: name,
        photoURL: 'https://ui-avatars.com/api/?name=' + name,
      })
        .then(() => {
          console.log(user);
          window.location.pathname = '/new';
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log('🛑 ~ createUser ~ errorMessage:', errorMessage);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log('🛑 ~ createUser ~ errorMessage:', errorMessage);
    });
}

export function signIn(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      goHome();
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log('🛑 ~ createUser ~ errorMessage:', errorMessage);
    });
}

export function logOut() {
  signOut(auth)
    .then(() => {
      useStore.getState().setUser(null);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log('🛑 ~ logOut ~ errorMessage:', errorMessage);
    });
}

// firebase db actions

export async function setData(data: any) {
  await setDoc(doc(db, collectionName, data?.id), data);
}

export async function getData(id: string) {
  const docSnap = await getDoc(doc(db, collectionName, id));

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
  }
}

export async function getAllData() {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export async function deleteData(id: string) {
  await deleteDoc(doc(db, collectionName, id));
}
