import { create } from 'zustand'

interface UIState {
  // Sidebar
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  
  // Panels
  activeLeftPanel: 'sections' | 'elements' | 'templates' | 'media'
  activeRightPanel: 'properties' | 'settings' | 'seo'
  
  // Modals
  showTemplateModal: boolean
  showPublishModal: boolean
  showSettingsModal: boolean
  showMediaLibrary: boolean
  
  // UI flags
  showGrid: boolean
  showRulers: boolean
  snapToGrid: boolean
  
  // Actions
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  setLeftSidebarOpen: (open: boolean) => void
  setRightSidebarOpen: (open: boolean) => void
  
  setActiveLeftPanel: (panel: UIState['activeLeftPanel']) => void
  setActiveRightPanel: (panel: UIState['activeRightPanel']) => void
  
  setShowTemplateModal: (show: boolean) => void
  setShowPublishModal: (show: boolean) => void
  setShowSettingsModal: (show: boolean) => void
  setShowMediaLibrary: (show: boolean) => void
  
  toggleGrid: () => void
  toggleRulers: () => void
  toggleSnapToGrid: () => void
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  activeLeftPanel: 'sections',
  activeRightPanel: 'properties',
  showTemplateModal: false,
  showPublishModal: false,
  showSettingsModal: false,
  showMediaLibrary: false,
  showGrid: false,
  showRulers: false,
  snapToGrid: true,

  // Sidebar actions
  toggleLeftSidebar: () => set((state) => ({ leftSidebarOpen: !state.leftSidebarOpen })),
  toggleRightSidebar: () => set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
  setLeftSidebarOpen: (open) => set({ leftSidebarOpen: open }),
  setRightSidebarOpen: (open) => set({ rightSidebarOpen: open }),

  // Panel actions
  setActiveLeftPanel: (panel) => set({ activeLeftPanel: panel, leftSidebarOpen: true }),
  setActiveRightPanel: (panel) => set({ activeRightPanel: panel, rightSidebarOpen: true }),

  // Modal actions
  setShowTemplateModal: (show) => set({ showTemplateModal: show }),
  setShowPublishModal: (show) => set({ showPublishModal: show }),
  setShowSettingsModal: (show) => set({ showSettingsModal: show }),
  setShowMediaLibrary: (show) => set({ showMediaLibrary: show }),

  // UI flags
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleRulers: () => set((state) => ({ showRulers: !state.showRulers })),
  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
}))