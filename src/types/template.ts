import { PageSection } from './section'

export enum TemplateCategory {
  BUSINESS = 'business',
  PORTFOLIO = 'portfolio',
  ECOMMERCE = 'ecommerce',
  AGENCY = 'agency',
  SAAS = 'saas',
  PERSONAL = 'personal',
  NONPROFIT = 'nonprofit',
}

export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  thumbnail: string
  preview: string
  sections: PageSection[]
  isPremium: boolean
  price: number | null
  tags: string[]
  userId: string | null // null for system templates
  downloads: number
  rating: number
  createdAt: Date
  updatedAt: Date
}