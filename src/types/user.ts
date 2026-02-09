export enum UserRole {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: string
  email: string
  displayName: string | null
  photoURL: string | null
  role: UserRole
  createdAt: Date
  updatedAt: Date
  lastLoginAt: Date | null
  emailVerified: boolean
  pages: string[] // Array of page IDs
  settings: UserSettings
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  notifications: {
    email: boolean
    push: boolean
    collaboration: boolean
  }
  privacy: {
    showProfile: boolean
    showPages: boolean
  }
}

export interface UserProfile {
  id: string
  displayName: string
  bio: string | null
  photoURL: string | null
  website: string | null
  location: string | null
  socialLinks: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}