import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { AuthUser } from '../../types/auth';

export const mapFirebaseUser = (firebaseUser: FirebaseUser): AuthUser => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName ?? 'User',
  email: firebaseUser.email ?? '',
  phone: firebaseUser.phoneNumber ?? '',
  avatarUrl: firebaseUser.photoURL ?? undefined,
  isVerified: firebaseUser.emailVerified,
});

export const authService = {
  login: async (email: string, password: string): Promise<AuthUser> => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return mapFirebaseUser(user);
  },

  register: async (
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<AuthUser> => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });

    // Best-effort: store extra fields in Firestore. If this fails (e.g. rules not
    // yet configured) we still complete registration — the auth account was created.
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        isVerified: false,
        createdAt: serverTimestamp(),
      });
    } catch (firestoreErr) {
      console.warn('Firestore profile write failed (non-fatal):', firestoreErr);
    }

    return { ...mapFirebaseUser(user), name, phone };
  },

  forgotPassword: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  getUserProfile: async (uid: string) => {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      return snap.exists() ? snap.data() : null;
    } catch {
      return null;
    }
  },
};
