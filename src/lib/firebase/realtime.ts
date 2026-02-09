import {
  ref,
  set,
  update,
  remove,
  onValue,
  onDisconnect,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/database'
import { realtimeDb } from './config'
import { ActiveUser, CursorPosition, Selection, Presence } from '@/types'

// Presence management
export const setUserPresence = async (
  userId: string,
  pageId: string,
  userData: Partial<ActiveUser>
) => {
  const presenceRef = ref(realtimeDb, `presence/${pageId}/${userId}`)
  
  await set(presenceRef, {
    ...userData,
    status: 'online',
    joinedAt: serverTimestamp(),
    lastActivity: serverTimestamp(),
  })

  // Remove presence on disconnect
  onDisconnect(presenceRef).remove()
}

export const updateUserPresence = async (
  userId: string,
  pageId: string,
  updates: Partial<ActiveUser>
) => {
  const presenceRef = ref(realtimeDb, `presence/${pageId}/${userId}`)
  await update(presenceRef, {
    ...updates,
    lastActivity: serverTimestamp(),
  })
}

export const removeUserPresence = async (userId: string, pageId: string) => {
  const presenceRef = ref(realtimeDb, `presence/${pageId}/${userId}`)
  await remove(presenceRef)
}

export const listenToPresence = (
  pageId: string,
  callback: (users: Record<string, ActiveUser>) => void
): Unsubscribe => {
  const presenceRef = ref(realtimeDb, `presence/${pageId}`)
  return onValue(presenceRef, (snapshot) => {
    const data = snapshot.val() || {}
    callback(data)
  })
}

// Cursor tracking
export const updateCursor = async (
  userId: string,
  pageId: string,
  x: number,
  y: number
) => {
  const cursorRef = ref(realtimeDb, `cursors/${pageId}/${userId}`)
  await set(cursorRef, {
    x,
    y,
    timestamp: serverTimestamp(),
  })
}

export const listenToCursors = (
  pageId: string,
  callback: (cursors: Record<string, CursorPosition>) => void
): Unsubscribe => {
  const cursorsRef = ref(realtimeDb, `cursors/${pageId}`)
  return onValue(cursorsRef, (snapshot) => {
    const data = snapshot.val() || {}
    callback(data)
  })
}

// Selection tracking
export const updateSelection = async (
  userId: string,
  pageId: string,
  selection: { type: 'section' | 'element'; id: string }
) => {
  const selectionRef = ref(realtimeDb, `selections/${pageId}/${userId}`)
  await set(selectionRef, {
    ...selection,
    timestamp: serverTimestamp(),
  })
}

export const clearSelection = async (userId: string, pageId: string) => {
  const selectionRef = ref(realtimeDb, `selections/${pageId}/${userId}`)
  await remove(selectionRef)
}

export const listenToSelections = (
  pageId: string,
  callback: (selections: Record<string, Selection>) => void
): Unsubscribe => {
  const selectionsRef = ref(realtimeDb, `selections/${pageId}`)
  return onValue(selectionsRef, (snapshot) => {
    const data = snapshot.val() || {}
    callback(data)
  })
}

// Collaboration changes
export const broadcastChange = async (
  userId: string,
  pageId: string,
  change: any
) => {
  const changeRef = ref(realtimeDb, `changes/${pageId}/${Date.now()}`)
  await set(changeRef, {
    userId,
    ...change,
    timestamp: serverTimestamp(),
  })
}

export const listenToChanges = (
  pageId: string,
  callback: (change: any) => void
): Unsubscribe => {
  const changesRef = ref(realtimeDb, `changes/${pageId}`)
  return onValue(changesRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      callback(childSnapshot.val())
    })
  })
}