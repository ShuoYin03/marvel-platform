import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged, } from 'firebase/auth';

import { httpsCallable } from 'firebase/functions';

import { sendVerification } from './manageUser';

import { AUTH_ERROR_MESSAGES } from '@/libs/constants/auth';

import { auth, functions } from '@/libs/redux/store';

const signUp = async (email, password, fullName) => {
  try {
    const createUser = httpsCallable(functions, 'signUpUser');

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await createUser({ email, fullName, uid: response.user.uid });
    await sendVerification(response.user);

    return response.user;
  } catch (error) {
    throw new Error(AUTH_ERROR_MESSAGES[error?.code]);
  }
};

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export { signUp };
