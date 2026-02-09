import { useEffect, useRef } from 'react'
import { useDebounce } from './use-debounce'

export function useAutosave<T>(
  value: T,
  onSave: (value: T) => void | Promise<void>,
  delay: number = 2000
) {
  const debouncedValue = useDebounce(value, delay)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    onSave(debouncedValue)
  }, [debouncedValue, onSave])
}