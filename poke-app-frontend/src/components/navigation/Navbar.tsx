import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import {
  Actions,
  DesktopNav,
  Left,
  LogoImg,
  MobileMenuButton,
  Right,
  StyledNavLink,
  ThemeToggle,
  Wrapper,
} from './Navbar.styles'

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
            {theme === Theme.Dark ? <Moon size={18} /> : <Sun size={18} />}
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
