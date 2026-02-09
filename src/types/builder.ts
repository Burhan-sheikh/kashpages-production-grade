import { PageElement } from './element'
import { PageSection } from './section'

export interface BuilderState {
  page: BuilderPage | null
  selectedElement: string | null
  selectedSection: string | null
  viewport: Viewport
  history: HistoryState
  isDragging: boolean
  clipboard: ClipboardData | null
}

export interface BuilderPage {
  id: string
  title: string
  sections: PageSection[]
}

export type Viewport = 'mobile' | 'tablet' | 'desktop'

export interface HistoryState {
  past: HistoryEntry[]
  future: HistoryEntry[]
  canUndo: boolean
  canRedo: boolean
}

export interface HistoryEntry {
  sections: PageSection[]
  timestamp: Date
  action: string
}

export interface ClipboardData {
  type: 'section' | 'element'
  data: PageSection | PageElement
}

export interface BuilderAction {
  type: string
  payload?: any
}

export interface DragItem {
  id: string
  type: 'section' | 'element' | 'component'
  data: any
}