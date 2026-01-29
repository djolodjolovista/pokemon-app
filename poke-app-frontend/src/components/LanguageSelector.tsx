import { useTranslation } from 'react-i18next'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import usaFlag from '../assets/images/usa.png'
import serbianFlag from '../assets/images/serbia.png'

interface Language {
  code: string
  flag: string
  label: string
}

const languages: Language[] = [
  { code: 'en', flag: usaFlag, label: 'English' },
  { code: 'sr', flag: serbianFlag, label: 'Serbian' },
]

const FlagButton = styled.button.attrs({ className: 'focus-ring' })`
  all: unset;
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
`

const FlagImage = styled.img<{ selected?: boolean }>`
  width: 18px;
  height: 18px;
  object-fit: contain;
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
`

const StyledDropdownContent = styled(DropdownMenu.Content)`
  min-width: 100px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 50;
`

const StyledDropdownItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 10px;
  cursor: pointer;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 0;

  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.navbarHoverBackground};
    outline: none;
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('language', code)
  }

  const selectedLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  return (
    <Container>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <FlagButton aria-label="Select language">
            <FlagImage src={selectedLanguage.flag} alt={selectedLanguage.label} selected />
          </FlagButton>
        </DropdownMenu.Trigger>

        <StyledDropdownContent side="bottom" align="end">
          {languages.map((lang) => (
            <StyledDropdownItem key={lang.code} onSelect={() => handleLanguageChange(lang.code)}>
              <FlagImage
                src={lang.flag}
                alt={lang.label}
                selected={lang.code === selectedLanguage.code}
              />
              {lang.label}
            </StyledDropdownItem>
          ))}
        </StyledDropdownContent>
      </DropdownMenu.Root>
    </Container>
  )
}

export default LanguageSelector
