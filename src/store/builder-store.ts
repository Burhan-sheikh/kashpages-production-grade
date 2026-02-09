import { create } from 'zustand'
import { PageSection, PageElement, Viewport } from '@/types'
import { v4 as uuidv4 } from 'uuid'

interface BuilderState {
  // Page data
  pageId: string | null
  pageTitle: string
  sections: PageSection[]
  
  // Selection
  selectedSection: string | null
  selectedElement: string | null
  
  // Viewport
  viewport: Viewport
  
  // History
  history: PageSection[][]
  historyIndex: number
  canUndo: boolean
  canRedo: boolean
  
  // UI state
  isDragging: boolean
  isSaving: boolean
  lastSaved: Date | null
  
  // Actions
  setPageId: (id: string) => void
  setPageTitle: (title: string) => void
  setSections: (sections: PageSection[]) => void
  
  addSection: (section: PageSection, index?: number) => void
  updateSection: (id: string, updates: Partial<PageSection>) => void
  deleteSection: (id: string) => void
  moveSection: (fromIndex: number, toIndex: number) => void
  duplicateSection: (id: string) => void
  
  addElement: (sectionId: string, element: PageElement, index?: number) => void
  updateElement: (sectionId: string, elementId: string, updates: Partial<PageElement>) => void
  deleteElement: (sectionId: string, elementId: string) => void
  moveElement: (sectionId: string, fromIndex: number, toIndex: number) => void
  duplicateElement: (sectionId: string, elementId: string) => void
  
  setSelectedSection: (id: string | null) => void
  setSelectedElement: (id: string | null) => void
  
  setViewport: (viewport: Viewport) => void
  
  undo: () => void
  redo: () => void
  saveToHistory: () => void
  
  setIsDragging: (isDragging: boolean) => void
  setIsSaving: (isSaving: boolean) => void
  setLastSaved: (date: Date) => void
  
  reset: () => void
}

const MAX_HISTORY = 50

export const useBuilderStore = create<BuilderState>((set, get) => ({
  // Initial state
  pageId: null,
  pageTitle: 'Untitled Page',
  sections: [],
  selectedSection: null,
  selectedElement: null,
  viewport: 'desktop',
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,
  isDragging: false,
  isSaving: false,
  lastSaved: null,

  // Page actions
  setPageId: (id) => set({ pageId: id }),
  
  setPageTitle: (title) => {
    set({ pageTitle: title })
    get().saveToHistory()
  },
  
  setSections: (sections) => set({ sections }),

  // Section actions
  addSection: (section, index) => {
    const { sections } = get()
    const newSections = [...sections]
    
    if (index !== undefined) {
      newSections.splice(index, 0, section)
    } else {
      newSections.push(section)
    }
    
    // Update order
    newSections.forEach((s, i) => {
      s.order = i
    })
    
    set({ sections: newSections })
    get().saveToHistory()
  },

  updateSection: (id, updates) => {
    const { sections } = get()
    const newSections = sections.map(s => 
      s.id === id ? { ...s, ...updates } : s
    )
    set({ sections: newSections })
    get().saveToHistory()
  },

  deleteSection: (id) => {
    const { sections } = get()
    const newSections = sections.filter(s => s.id !== id)
    
    // Update order
    newSections.forEach((s, i) => {
      s.order = i
    })
    
    set({ 
      sections: newSections,
      selectedSection: null,
      selectedElement: null,
    })
    get().saveToHistory()
  },

  moveSection: (fromIndex, toIndex) => {
    const { sections } = get()
    const newSections = [...sections]
    const [moved] = newSections.splice(fromIndex, 1)
    newSections.splice(toIndex, 0, moved)
    
    // Update order
    newSections.forEach((s, i) => {
      s.order = i
    })
    
    set({ sections: newSections })
    get().saveToHistory()
  },

  duplicateSection: (id) => {
    const { sections } = get()
    const section = sections.find(s => s.id === id)
    if (!section) return

    const duplicated: PageSection = {
      ...JSON.parse(JSON.stringify(section)),
      id: uuidv4(),
      name: `${section.name} (Copy)`,
    }

    const index = sections.findIndex(s => s.id === id)
    get().addSection(duplicated, index + 1)
  },

  // Element actions
  addElement: (sectionId, element, index) => {
    const { sections } = get()
    const newSections = sections.map(section => {
      if (section.id === sectionId) {
        const elements = [...section.elements]
        if (index !== undefined) {
          elements.splice(index, 0, element)
        } else {
          elements.push(element)
        }
        // Update order
        elements.forEach((e, i) => {
          e.order = i
        })
        return { ...section, elements }
      }
      return section
    })
    set({ sections: newSections })
    get().saveToHistory()
  },

  updateElement: (sectionId, elementId, updates) => {
    const { sections } = get()
    const newSections = sections.map(section => {
      if (section.id === sectionId) {
        const elements = section.elements.map(element =>
          element.id === elementId ? { ...element, ...updates } : element
        )
        return { ...section, elements }
      }
      return section
    })
    set({ sections: newSections })
    get().saveToHistory()
  },

  deleteElement: (sectionId, elementId) => {
    const { sections } = get()
    const newSections = sections.map(section => {
      if (section.id === sectionId) {
        const elements = section.elements.filter(e => e.id !== elementId)
        // Update order
        elements.forEach((e, i) => {
          e.order = i
        })
        return { ...section, elements }
      }
      return section
    })
    set({ 
      sections: newSections,
      selectedElement: null,
    })
    get().saveToHistory()
  },

  moveElement: (sectionId, fromIndex, toIndex) => {
    const { sections } = get()
    const newSections = sections.map(section => {
      if (section.id === sectionId) {
        const elements = [...section.elements]
        const [moved] = elements.splice(fromIndex, 1)
        elements.splice(toIndex, 0, moved)
        // Update order
        elements.forEach((e, i) => {
          e.order = i
        })
        return { ...section, elements }
      }
      return section
    })
    set({ sections: newSections })
    get().saveToHistory()
  },

  duplicateElement: (sectionId, elementId) => {
    const { sections } = get()
    const section = sections.find(s => s.id === sectionId)
    if (!section) return

    const element = section.elements.find(e => e.id === elementId)
    if (!element) return

    const duplicated: PageElement = {
      ...JSON.parse(JSON.stringify(element)),
      id: uuidv4(),
      name: `${element.name} (Copy)`,
    }

    const index = section.elements.findIndex(e => e.id === elementId)
    get().addElement(sectionId, duplicated, index + 1)
  },

  // Selection
  setSelectedSection: (id) => set({ selectedSection: id, selectedElement: null }),
  setSelectedElement: (id) => set({ selectedElement: id }),

  // Viewport
  setViewport: (viewport) => set({ viewport }),

  // History
  saveToHistory: () => {
    const { sections, history, historyIndex } = get()
    
    // Remove any redo history
    const newHistory = history.slice(0, historyIndex + 1)
    
    // Add current state
    newHistory.push(JSON.parse(JSON.stringify(sections)))
    
    // Limit history size
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift()
    }
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: newHistory.length > 1,
      canRedo: false,
    })
  },

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      set({
        sections: JSON.parse(JSON.stringify(history[newIndex])),
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: true,
      })
    }
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      set({
        sections: JSON.parse(JSON.stringify(history[newIndex])),
        historyIndex: newIndex,
        canUndo: true,
        canRedo: newIndex < history.length - 1,
      })
    }
  },

  // UI state
  setIsDragging: (isDragging) => set({ isDragging }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setLastSaved: (date) => set({ lastSaved: date }),

  // Reset
  reset: () => set({
    pageId: null,
    pageTitle: 'Untitled Page',
    sections: [],
    selectedSection: null,
    selectedElement: null,
    viewport: 'desktop',
    history: [],
    historyIndex: -1,
    canUndo: false,
    canRedo: false,
    isDragging: false,
    isSaving: false,
    lastSaved: null,
  }),
}))