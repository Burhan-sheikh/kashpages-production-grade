import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from './config'
import { Page, Template, User } from '@/types'

// Generic CRUD operations
export const createDocument = async <T>(
  collectionName: string,
  data: Partial<T>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating document:', error)
    throw error
  }
}

export const getDocument = async <T>(
  collectionName: string,
  documentId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, documentId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T
    }
    return null
  } catch (error) {
    console.error('Error getting document:', error)
    throw error
  }
}

export const updateDocument = async <T>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

export const deleteDocument = async (
  collectionName: string,
  documentId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

// Page operations
export const getUserPages = async (userId: string): Promise<Page[]> => {
  try {
    const q = query(
      collection(db, 'pages'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Page[]
  } catch (error) {
    console.error('Error getting user pages:', error)
    throw error
  }
}

export const getPublishedPages = async (limitCount: number = 20): Promise<Page[]> => {
  try {
    const q = query(
      collection(db, 'pages'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Page[]
  } catch (error) {
    console.error('Error getting published pages:', error)
    throw error
  }
}

// Template operations
export const getTemplates = async (category?: string): Promise<Template[]> => {
  try {
    let q
    if (category) {
      q = query(
        collection(db, 'templates'),
        where('category', '==', category),
        orderBy('downloads', 'desc')
      )
    } else {
      q = query(
        collection(db, 'templates'),
        orderBy('downloads', 'desc')
      )
    }
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Template[]
  } catch (error) {
    console.error('Error getting templates:', error)
    throw error
  }
}

// User operations
export const getUserProfile = async (userId: string): Promise<User | null> => {
  return getDocument<User>('users', userId)
}

export const updateUserProfile = async (
  userId: string,
  data: Partial<User>
): Promise<void> => {
  return updateDocument<User>('users', userId, data)
}

// Utility functions
export const convertTimestamp = (timestamp: Timestamp | null): Date | null => {
  if (!timestamp) return null
  return timestamp.toDate()
}