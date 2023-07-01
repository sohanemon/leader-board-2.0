import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
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
      updateProfile(user, {
        displayName: name,
        photoURL: 'https://ui-avatars.com/api/?name=' + name,
      })
        .then(() => {
          console.log(user);
          goHome();
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
