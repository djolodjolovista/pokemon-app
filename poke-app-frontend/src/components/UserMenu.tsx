/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react'
import styled from 'styled-components'
import { LogOut } from 'lucide-react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { handleKeyboardNavigation } from '../utils/keyboardNavigation'
import { useAuthStore } from '../store/authStore'
import { useLogout } from '../hooks/api/useLogout'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false))

  const { user } = useAuthStore()
  const logout = useLogout()

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  if (!user) return null

  return (
    <Container ref={modalRef}>
      <UserButton
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={(e) => handleKeyboardNavigation(e, toggleDropdown)}
      >
        <Avatar src={user.avatar} alt="User" />
        <UserName>{user.firstName}</UserName>
      </UserButton>

      {isOpen && (
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            tabIndex={0}
            onKeyDown={(e) => handleKeyboardNavigation(e, () => logout())}
          >
            Logout
            <LogOut size={16} color="red" />
          </DropdownItem>
        </DropdownMenu>
      )}
    </Container>
  )
}

export default UserMenu

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`

const UserButton = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  user-select: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
  }
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: contain;
`

const UserName = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`

const DropdownMenu = styled.div`
  min-width: 115px;
  position: absolute;
  top: 48px;
  right: 0;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  z-index: 10;
  overflow: hidden;
`

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 12px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.navbarHoverBackground};
  }

  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.navbarHoverBackground};
  }
`
