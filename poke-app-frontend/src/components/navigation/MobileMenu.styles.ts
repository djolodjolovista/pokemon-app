import { NavLink } from "react-router-dom"
import styled from "styled-components"

export const Wrapper = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.navbarBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  gap: 12px;
  z-index: 40;
`

export const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  transition: 0.2s ease;

  &.active {
    background: ${({ theme }) => theme.primary};
    color: white;
  }

  &:hover {
    background: ${({ theme }) => theme.navbarHoverBackground};
  }
`

export const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.border};
  margin: 8px 0;
`

export const UserName = styled.span`
  padding: 8px 0;
  font-size: 15px;
  opacity: 0.85;
`

export const LogoutButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`