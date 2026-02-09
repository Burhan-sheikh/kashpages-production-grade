import { create } from 'zustand'
import { ActiveUser, CursorPosition, Selection } from '@/types'

interface CollaborationState {
  activeUsers: Record<string, ActiveUser>
  cursors: Record<string, CursorPosition>
  selections: Record<string, Selection>
  isCollaborating: boolean
  
  setActiveUsers: (users: Record<string, ActiveUser>) => void
  addActiveUser: (userId: string, user: ActiveUser) => void
  removeActiveUser: (userId: string) => void
  updateActiveUser: (userId: string, updates: Partial<ActiveUser>) => void
  
  setCursors: (cursors: Record<string, CursorPosition>) => void
  updateCursor: (userId: string, cursor: CursorPosition) => void
  
  setSelections: (selections: Record<string, Selection>) => void
  updateSelection: (userId: string, selection: Selection) => void
  removeSelection: (userId: string) => void
  
  setIsCollaborating: (isCollaborating: boolean) => void
  reset: () => void
}

export const useCollaborationStore = create<CollaborationState>((set) => ({
  activeUsers: {},
  cursors: {},
  selections: {},
  isCollaborating: false,

  setActiveUsers: (users) => set({ activeUsers: users }),
  
  addActiveUser: (userId, user) =>
    set((state) => ({
      activeUsers: { ...state.activeUsers, [userId]: user },
    })),
  
  removeActiveUser: (userId) =>
    set((state) => {
      const { [userId]: _, ...rest } = state.activeUsers
      return { activeUsers: rest }
    }),
  
  updateActiveUser: (userId, updates) =>
    set((state) => ({
      activeUsers: {
        ...state.activeUsers,
        [userId]: { ...state.activeUsers[userId], ...updates },
      },
    })),

  setCursors: (cursors) => set({ cursors }),
  
  updateCursor: (userId, cursor) =>
    set((state) => ({
      cursors: { ...state.cursors, [userId]: cursor },
    })),

  setSelections: (selections) => set({ selections }),
  
  updateSelection: (userId, selection) =>
    set((state) => ({
      selections: { ...state.selections, [userId]: selection },
    })),
  
  removeSelection: (userId) =>
    set((state) => {
      const { [userId]: _, ...rest } = state.selections
      return { selections: rest }
    }),

  setIsCollaborating: (isCollaborating) => set({ isCollaborating }),
  
  reset: () =>
    set({
      activeUsers: {},
      cursors: {},
      selections: {},
      isCollaborating: false,
    }),
}))