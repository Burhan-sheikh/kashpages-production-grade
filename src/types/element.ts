export enum ElementType {
  HEADING = 'heading',
  TEXT = 'text',
  IMAGE = 'image',
  BUTTON = 'button',
  FORM = 'form',
  VIDEO = 'video',
  ICON = 'icon',
  DIVIDER = 'divider',
  SPACER = 'spacer',
  HTML = 'html',
}

export interface PageElement {
  id: string
  type: ElementType
  name: string
  order: number
  visible: boolean
  content: ElementContent
  styling: ElementStyling
  responsive: ElementResponsive
  animation: ElementAnimation | null
}

export type ElementContent = 
  | HeadingContent
  | TextContent
  | ImageContent
  | ButtonContent
  | FormContent
  | VideoContent
  | IconContent
  | DividerContent
  | SpacerContent
  | HTMLContent

export interface HeadingContent {
  text: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export interface TextContent {
  html: string
}

export interface ImageContent {
  url: string
  alt: string
  caption: string | null
  link: string | null
  width: number | null
  height: number | null
}

export interface ButtonContent {
  text: string
  link: string
  openInNewTab: boolean
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  icon: string | null
  iconPosition: 'left' | 'right'
}

export interface FormContent {
  fields: FormField[]
  submitButton: string
  successMessage: string
  errorMessage: string
  action: string
  method: 'POST' | 'GET'
}

export interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio'
  label: string
  placeholder: string
  required: boolean
  options?: string[] // For select, checkbox, radio
}

export interface VideoContent {
  url: string
  provider: 'youtube' | 'vimeo' | 'custom'
  autoplay: boolean
  loop: boolean
  controls: boolean
  muted: boolean
}

export interface IconContent {
  name: string
  library: 'lucide' | 'heroicons' | 'custom'
  size: number
  color: string
}

export interface DividerContent {
  style: 'solid' | 'dashed' | 'dotted'
  width: number
  color: string
}

export interface SpacerContent {
  height: number
}

export interface HTMLContent {
  html: string
}

export interface ElementStyling {
  typography?: {
    fontSize: number
    fontWeight: number
    lineHeight: number
    letterSpacing: number
    textAlign: 'left' | 'center' | 'right' | 'justify'
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    color: string
  }
  spacing?: {
    padding: Spacing
    margin: Spacing
  }
  background?: {
    color: string
    image?: string
  }
  border?: {
    width: number
    style: string
    color: string
    radius: number
  }
  shadow?: string
}

export interface Spacing {
  top: number
  right: number
  bottom: number
  left: number
}

export interface ElementResponsive {
  mobile: Partial<ElementStyling>
  tablet: Partial<ElementStyling>
  desktop: ElementStyling
}

export interface ElementAnimation {
  type: 'fade' | 'slide' | 'scale' | 'rotate'
  duration: number
  delay: number
  easing: string
}