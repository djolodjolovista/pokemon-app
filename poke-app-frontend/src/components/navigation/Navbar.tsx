import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Menu, X } from 'lucide-react'
import * as Toggle from '@radix-ui/react-toggle'
import Logo from '../../assets/images/pokemon_app_logo.png'
import { useAppStore } from '../../store/appStore'
import { Theme } from '../../store/theme.enum'
import LanguageSelector from '../LanguageSelector'
import { useLogout } from '../../hooks/api/useLogout'
import UserMenu from '../UserMenu'
import MobileMenu from './MobileMenu'
import { ROUTES } from '../../routes/paths.enum'
import {
  Actions,
  DesktopNav,
  Left,
  LogoButton,
  LogoImg,
  MobileMenuButton,
  Right,
  StyledNavLink,
  ThemeToggle,
  Wrapper,
} from './Navbar.styles'
import { useArrowNavigation } from '../../hooks/useArrowNavigation'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const { theme, toggleTheme } = useAppStore()
  const logout = useLogout()
  const navigate = useNavigate()
  const { t } = useTranslation('navbar')

  const navbarRef = useArrowNavigation<HTMLElement>({
    enabled: true,
    orientation: 'horizontal',
    loop: false,
  })

  const handleClickOnLogo = () => {
    navigate({ pathname: ROUTES.POKEMON_LIST, search: '?page=1&search=' })
  }

  return (
    <Wrapper ref={navbarRef}>
      <Left>
        <LogoButton onClick={handleClickOnLogo}>
          <LogoImg src={Logo} alt="Pokemon app logo" />
        </LogoButton>

        <DesktopNav>
          <StyledNavLink to={ROUTES.POKEMON_LIST}>{t('pokemon')}</StyledNavLink>
          <StyledNavLink to={ROUTES.LOCATIONS}>{t('locations')}</StyledNavLink>
        </DesktopNav>
      </Left>

      <Right>
        <LanguageSelector />
        <Actions>
          <Toggle.Root pressed={theme === Theme.Dark} onPressedChange={toggleTheme} asChild>
            <ThemeToggle>
              {theme === Theme.Dark ? <Moon size={18} /> : <Sun size={18} />}
            </ThemeToggle>
          </Toggle.Root>
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
