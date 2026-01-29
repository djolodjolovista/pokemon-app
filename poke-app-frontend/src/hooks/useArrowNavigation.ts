import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

const focusElement = (
  elements: HTMLElement[],
  index: number,
  onNavigate?: (index: number, el: HTMLElement) => void,
) => {
  const el = elements[index]
  if (!el) return
  el.focus()
  onNavigate?.(index, el)
}

const getFocusableElements = (container: HTMLElement, elementSelector: string): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(elementSelector)).filter(
    (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
  )

const handleNoFocusEdgeCase = (
  e: KeyboardEvent,
  elements: HTMLElement[],
  onNavigate?: (index: number, el: HTMLElement) => void,
): boolean => {
  const isForward = e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Home'
  const isBackward = e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'End'

  if (isForward) {
    e.preventDefault()
    focusElement(elements, 0, onNavigate)
    return true
  }

  if (isBackward) {
    e.preventDefault()
    focusElement(elements, elements.length - 1, onNavigate)
    return true
  }

  return false
}

const getGridColumns = (
  container: HTMLElement,
  elements: HTMLElement[],
  gridColumns: number | 'auto',
): number | null => {
  if (typeof gridColumns === 'number') return gridColumns
  if (!elements.length) return null

  const firstItem = elements[0]
  const containerWidth = container.clientWidth
  const itemWidth = firstItem.getBoundingClientRect().width

  const styles = window.getComputedStyle(container)
  const gap = parseFloat(styles.columnGap || '0')

  return Math.max(1, Math.floor((containerWidth + gap) / (itemWidth + gap)))
}

const handleGridNavigation = (
  e: KeyboardEvent,
  elements: HTMLElement[],
  currentIndex: number,
  columns: number,
  loop: boolean,
): number | null => {
  const currentCol = currentIndex % columns
  const totalRows = Math.ceil(elements.length / columns)

  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault()
      if (currentIndex + 1 < elements.length) return currentIndex + 1
      return loop ? 0 : null

    case 'ArrowLeft':
      e.preventDefault()
      if (currentIndex > 0) return currentIndex - 1
      return loop ? elements.length - 1 : null

    case 'ArrowDown': {
      e.preventDefault()
      const next = currentIndex + columns
      if (next < elements.length) return next
      if (!loop) return null
      return currentCol < elements.length ? currentCol : null
    }

    case 'ArrowUp': {
      e.preventDefault()
      const prev = currentIndex - columns
      if (prev >= 0) return prev
      if (!loop) return null
      const lastRowStart = (totalRows - 1) * columns
      return Math.min(lastRowStart + currentCol, elements.length - 1)
    }

    case 'Home':
      e.preventDefault()
      return 0

    case 'End':
      e.preventDefault()
      return elements.length - 1

    default:
      return null
  }
}

const handleLinearNavigation = (
  e: KeyboardEvent,
  orientation: 'horizontal' | 'vertical' | 'both',
  currentIndex: number,
  length: number,
  loop: boolean,
): number | null => {
  const isNext =
    (orientation === 'horizontal' && e.key === 'ArrowRight') ||
    (orientation === 'vertical' && e.key === 'ArrowDown') ||
    (orientation === 'both' && (e.key === 'ArrowRight' || e.key === 'ArrowDown'))

  const isPrev =
    (orientation === 'horizontal' && e.key === 'ArrowLeft') ||
    (orientation === 'vertical' && e.key === 'ArrowUp') ||
    (orientation === 'both' && (e.key === 'ArrowLeft' || e.key === 'ArrowUp'))

  if (isNext) {
    e.preventDefault()
    const next = currentIndex + 1
    if (next < length) return next
    return loop ? 0 : length - 1
  }

  if (isPrev) {
    e.preventDefault()
    const prev = currentIndex - 1
    if (prev >= 0) return prev
    return loop ? length - 1 : 0
  }

  if (e.key === 'Home') {
    e.preventDefault()
    return 0
  }

  if (e.key === 'End') {
    e.preventDefault()
    return length - 1
  }

  return null
}

interface UseArrowNavigationOptions {
  enabled?: boolean
  orientation?: 'horizontal' | 'vertical' | 'both' | 'grid'
  loop?: boolean
  selector?: string
  gridColumns?: number | 'auto'
  onNavigate?: (index: number, element: HTMLElement) => void
}

export const useArrowNavigation = <T extends HTMLElement = HTMLElement>({
  enabled = true,
  orientation = 'horizontal',
  loop = false,
  selector = 'a, button, [tabindex]:not([tabindex="-1"])',
  gridColumns = 'auto',
  onNavigate,
}: UseArrowNavigationOptions = {}): RefObject<T | null> => {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!enabled) return undefined

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return

      // Get all focusable elements
      const elements = getFocusableElements(containerRef.current, selector)

      if (elements.length === 0) return

      const currentIndex = elements.findIndex((el) => el === document.activeElement)

      if (currentIndex === -1 && handleNoFocusEdgeCase(e, elements, onNavigate)) return

      let nextIndex: number | null = null
      //  grid navigation
      if (orientation === 'grid') {
        const columns = getGridColumns(containerRef.current, elements, gridColumns)
        if (!columns) return

        nextIndex = handleGridNavigation(e, elements, currentIndex, columns, loop)
      } else {
        // linear navigation
        nextIndex = handleLinearNavigation(e, orientation, currentIndex, elements.length, loop)
      }

      if (nextIndex !== null && nextIndex !== currentIndex) {
        focusElement(elements, nextIndex, onNavigate)
      }
    }

    const container = containerRef.current
    container?.addEventListener('keydown', handleKeyDown)

    return () => {
      container?.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, orientation, loop, selector, gridColumns, onNavigate])

  return containerRef
}
