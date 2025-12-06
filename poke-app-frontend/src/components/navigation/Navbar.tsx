/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Menu, X } from 'lucide-react'
import Logo from '../../assets/images/pokemon_app_logo.png'
import { useAppStore } from '../../store/appStore'
import { Theme } from '../../store/theme.enum'
import LanguageSelector from '../LanguageSelector'
import { useLogout } from '../../hooks/api/useLogout'
import { handleKeyboardNavigation } from '../../utils/keyboardNavigation'
import UserMenu from '../UserMenu'
import { usePokemonStore } from '../../store/pokemonStore'
import MobileMenu from './MobileMenu'
import { ROUTES } from '../../routes/paths.enum'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const { setPage, setSearch } = usePokemonStore()
  const { theme, toggleTheme } = useAppStore()

  const logout = useLogout()
  const navigate = useNavigate()
  const { t } = useTranslation('navbar')

  const handleClickOnLogo = () => {
    setPage(1)
    setSearch('')
    navigate(ROUTES.POKEMON_LIST)
  }

  return (
    <Wrapper>
      <Left>
        <LogoImg src={Logo} onClick={handleClickOnLogo} />

        <DesktopNav>
          <StyledNavLink to={ROUTES.POKEMON_LIST}>{t('pokemon')}</StyledNavLink>
          <StyledNavLink to={ROUTES.LOCATIONS}>{t('locations')}</StyledNavLink>
        </DesktopNav>
      </Left>

      <Right>
        <LanguageSelector />
        <Actions>
          <ThemeToggle
            onClick={toggleTheme}
            tabIndex={0}
            onKeyDown={(e) => handleKeyboardNavigation(e, toggleTheme)}
          >
            {theme === Theme.Dark ? <Sun size={18} /> : <Moon size={18} />}
          </ThemeToggle>
          <UserMenu />
        </Actions>

        <MobileMenuButton onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </MobileMenuButton>
      </Right>

      {open && (
        <MobileMenu
          theme={theme}
          onToggleTheme={toggleTheme}
          onLogout={logout}
          onClose={() => setOpen(false)}
        />
      )}
    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.header`
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

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`

const LogoImg = styled.img`
  height: 38px;
  object-fit: contain;
  &:hover {
    cursor: pointer;
  }
`

const DesktopNav = styled.nav`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`

const StyledNavLink = styled(NavLink)`
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

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const ThemeToggle = styled.span`
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

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: none;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: block;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`
