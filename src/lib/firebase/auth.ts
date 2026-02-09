import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'
import { User, UserRole } from '@/types'

const googleProvider = new GoogleAuthProvider()

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile
    await updateProfile(user, { displayName })

    // Create user document in Firestore
    await createUserDocument(user, displayName)

    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Check if user document exists, if not create one
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (!userDoc.exists()) {
      await createUserDocument(user, user.displayName || 'User')
    }

    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

const createUserDocument = async (firebaseUser: FirebaseUser, displayName: string) => {
  const userRef = doc(db, 'users', firebaseUser.uid)
  
  const userData: Partial<User> = {
    id: firebaseUser.uid,
    email: firebaseUser.email!,
    displayName,
    photoURL: firebaseUser.photoURL,
    role: UserRole.USER,
    emailVerified: firebaseUser.emailVerified,
    pages: [],
    settings: {
      theme: 'system',
      notifications: {
        email: true,
        push: true,
        collaboration: true,
      },
      privacy: {
        showProfile: true,
        showPages: true,
      },
    },
  }

  await setDoc(userRef, {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  })
}