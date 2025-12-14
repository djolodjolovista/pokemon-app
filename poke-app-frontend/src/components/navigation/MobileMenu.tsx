import { Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Theme } from '../../store/theme.enum'
import { useAuthStore } from '../../store/authStore'
import { ROUTES } from '../../routes/paths.enum'
import { StyledNavLink, ThemeToggle, Wrapper } from './Navbar.styles'
import { Divider, LogoutButton, UserName } from './MobileMenu.styles'

interface MobileMenuProps {
  theme: Theme
  onToggleTheme: () => void
  onClose: () => void
  onLogout: () => void
}

const MobileMenu = ({ theme, onToggleTheme, onClose, onLogout }: MobileMenuProps) => {
  const user = useAuthStore((state) => state.user)
  const { t } = useTranslation('navbar')

  return (
    <Wrapper>
      <StyledNavLink to={ROUTES.POKEMON_LIST} onClick={onClose}>
        {t('pokemon')}
      </StyledNavLink>

      <StyledNavLink to={ROUTES.LOCATIONS} onClick={onClose}>
        {t('locations')}
      </StyledNavLink>

      <Divider />

      <ThemeToggle onClick={onToggleTheme}>
        {theme === Theme.Dark ? (
          <>
            <Sun size={18} /> {t('lightMode')}
          </>
        ) : (
          <>
            <Moon size={18} /> {t('darkMode')}
          </>
        )}
      </ThemeToggle>

      <Divider />

      {user && (
        <>
          <UserName>{user.firstName}</UserName>
          <LogoutButton onClick={onLogout}>{t('logout')}</LogoutButton>
        </>
      )}
    </Wrapper>
  )
}

export default MobileMenu
