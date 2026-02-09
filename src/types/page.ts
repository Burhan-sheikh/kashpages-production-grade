import { PageElement } from './element'
import { PageSection } from './section'

export enum PageStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  PENDING_APPROVAL = 'pending_approval',
}

export interface Page {
  id: string
  title: string
  slug: string
  description: string | null
  thumbnail: string | null
  status: PageStatus
  userId: string // Owner ID
  templateId: string | null
  sections: PageSection[]
  seo: PageSEO
  settings: PageSettings
  version: number
  versions: PageVersion[]
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  views: number
  collaborators: string[] // User IDs
}

export interface PageSEO {
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  ogTitle: string
  ogDescription: string
  ogImage: string | null
  canonicalUrl: string | null
  structuredData: Record<string, any> | null
  robots: 'index,follow' | 'noindex,nofollow' | 'index,nofollow' | 'noindex,follow'
}

export interface PageSettings {
  favicon: string | null
  customCSS: string | null
  customJS: string | null
  analytics: {
    googleAnalyticsId?: string
    facebookPixelId?: string
  }
  fonts: {
    headings: string
    body: string
  }
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

export interface PageVersion {
  id: string
  pageId: string
  version: number
  sections: PageSection[]
  createdBy: string
  createdAt: Date
  message: string | null
}

export interface PageMetrics {
  pageId: string
  views: number
  uniqueVisitors: number
  averageTimeOnPage: number
  bounceRate: number
  conversions: number
  lastUpdated: Date
}