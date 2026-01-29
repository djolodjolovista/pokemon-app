import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.header`
  width: 100%;
  height: 64px;
  background: ${({ theme }) => theme.navbarBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 0 22px;
  position: relative;
  z-index: 50;
`

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`

export const LogoButton = styled.button.attrs({ className: 'focus-ring' })`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const LogoImg = styled.img`
  height: 38px;
  object-fit: contain;
`

export const DesktopNav = styled.nav`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
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

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

export const ThemeToggle = styled.button.attrs({ className: 'focus-ring' })`
  all: unset;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`

export const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: none;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: block;
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`
