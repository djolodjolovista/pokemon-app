import styled from 'styled-components'
import { LogOut } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useAuthStore } from '../store/authStore'
import { useLogout } from '../hooks/api/useLogout'

const UserButton = styled.button.attrs({ className: 'focus-ring' })`
  all: unset;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  user-select: none;
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

const StyledDropdownMenu = styled(DropdownMenu.Content)`
  min-width: 115px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  margin-top: 3px;
  z-index: 50;
`

const DropdownItem = styled(DropdownMenu.Item)`
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
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.navbarHoverBackground};
  }

  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.navbarHoverBackground};
  }
`

const UserMenu = () => {
  const { user } = useAuthStore()
  const logout = useLogout()

  if (!user) return null

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <UserButton>
          <Avatar src={user.avatar} alt={`${user.firstName} avatar`} />
          <UserName>{user.firstName}</UserName>
        </UserButton>
      </DropdownMenu.Trigger>

      <StyledDropdownMenu side="bottom" align="end">
        <DropdownItem onClick={() => logout()}>
          Logout
          <LogOut size={16} color="red" />
        </DropdownItem>
      </StyledDropdownMenu>
    </DropdownMenu.Root>
  )
}

export default UserMenu
