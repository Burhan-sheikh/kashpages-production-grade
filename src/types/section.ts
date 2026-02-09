import { PageElement } from './element'

export enum SectionType {
  HERO = 'hero',
  FEATURES = 'features',
  TESTIMONIALS = 'testimonials',
  PRICING = 'pricing',
  CONTACT = 'contact',
  FAQ = 'faq',
  CTA = 'cta',
  STATS = 'stats',
  TEAM = 'team',
  PORTFOLIO = 'portfolio',
  CUSTOM = 'custom',
}

export interface PageSection {
  id: string
  type: SectionType
  name: string
  order: number
  visible: boolean
  elements: PageElement[]
  layout: SectionLayout
  styling: SectionStyling
  responsive: ResponsiveSettings
  animation: AnimationSettings | null
}

export interface SectionLayout {
  container: 'full' | 'boxed' | 'narrow'
  columns: number
  gap: number
  alignment: 'left' | 'center' | 'right'
  padding: Spacing
  margin: Spacing
}

export interface SectionStyling {
  background: BackgroundSettings
  border: BorderSettings
  shadow: string | null
}

export interface BackgroundSettings {
  type: 'none' | 'color' | 'gradient' | 'image' | 'video'
  color?: string
  gradient?: {
    type: 'linear' | 'radial'
    angle: number
    colors: string[]
  }
  image?: {
    url: string
    position: string
    size: 'cover' | 'contain' | 'auto'
    repeat: boolean
    attachment: 'scroll' | 'fixed'
  }
  video?: {
    url: string
    autoplay: boolean
    loop: boolean
    muted: boolean
  }
}

export interface BorderSettings {
  width: number
  style: 'none' | 'solid' | 'dashed' | 'dotted'
  color: string
  radius: number
}

export interface Spacing {
  top: number
  right: number
  bottom: number
  left: number
}

export interface ResponsiveSettings {
  mobile: Partial<SectionLayout>
  tablet: Partial<SectionLayout>
  desktop: SectionLayout
}

export interface AnimationSettings {
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'none'
  duration: number
  delay: number
  easing: string
}