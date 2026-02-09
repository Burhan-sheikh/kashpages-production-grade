export interface CollaborationSession {
  id: string
  pageId: string
  activeUsers: ActiveUser[]
  cursors: CursorPosition[]
  selections: Selection[]
  changes: Change[]
  createdAt: Date
  lastActivity: Date
}

export interface ActiveUser {
  id: string
  displayName: string
  photoURL: string | null
  color: string
  isTyping: boolean
  currentSection: string | null
  currentElement: string | null
  joinedAt: Date
  lastActivity: Date
}

export interface CursorPosition {
  userId: string
  x: number
  y: number
  timestamp: Date
}

export interface Selection {
  userId: string
  type: 'section' | 'element'
  id: string
  timestamp: Date
}

export interface Change {
  id: string
  userId: string
  type: 'add' | 'update' | 'delete' | 'move'
  target: 'section' | 'element'
  targetId: string
  data: any
  timestamp: Date
}

export interface Presence {
  userId: string
  pageId: string
  status: 'online' | 'away' | 'offline'
  lastSeen: Date
}