import type { KeyboardEvent } from 'react'

export const handleKeyboardNavigation = <T extends HTMLElement>(
  event: KeyboardEvent<T>,
  action: () => void,
) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    action()
  }
}
