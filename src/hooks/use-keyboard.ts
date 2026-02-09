import { useEffect } from 'react'

type KeyboardHandler = (event: KeyboardEvent) => void

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  handler: () => void
}

export function useKeyboard(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown: KeyboardHandler = (event) => {
      for (const shortcut of shortcuts) {
        const { key, ctrlKey, shiftKey, altKey, metaKey, handler } = shortcut
        
        const ctrlMatch = ctrlKey === undefined || event.ctrlKey === ctrlKey
        const shiftMatch = shiftKey === undefined || event.shiftKey === shiftKey
        const altMatch = altKey === undefined || event.altKey === altKey
        const metaMatch = metaKey === undefined || event.metaKey === metaKey
        
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch &&
          altMatch &&
          metaMatch
        ) {
          event.preventDefault()
          handler()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}