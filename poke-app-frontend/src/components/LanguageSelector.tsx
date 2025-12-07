/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import serbianFlag from '../assets/images/serbia.png'
import usaFlag from '../assets/images/usa.png'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { handleKeyboardNavigation } from '../utils/keyboardNavigation'

interface Language {
  code: string
  flag: string
  label: string
}

const languages: Language[] = [
  { code: 'en', flag: usaFlag, label: 'English' },
  { code: 'sr', flag: serbianFlag, label: 'Serbian' },
]

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false))

  const handleLanguageChange = (
    languageCode: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    i18n.changeLanguage(languageCode)
    localStorage.setItem('language', languageCode)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const selectedLanguage = languages.find((language) => language.code === i18n.language)

  return (
    <Container ref={modalRef}>
      <FlagButton
        role="button"
        tabIndex={0}
        onKeyDown={(e) => handleKeyboardNavigation(e, toggleDropdown)}
        onClick={toggleDropdown}
      >
        <FlagImage
          selected={i18n.language === 'en'}
          src={selectedLanguage?.flag}
          width={18}
          height={18}
          alt="Selected Language"
        />
      </FlagButton>

      {isOpen && (
        <DropdownMenu>
          {languages.map((language) => (
            <DropdownItem
              key={language.code}
              tabIndex={0}
              onClick={(event) => handleLanguageChange(language.code, event)}
            >
              <FlagImage
                selected={i18n.language === language.code}
                src={language.flag}
                width={20}
                height={20}
                alt={language.label}
              />
              {language.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Container>
  )
}

export default LanguageSelector

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const FlagButton = styled.span`
  border: none;
  background: none;
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
`

const FlagImage = styled.img<{ selected: boolean }>``

const DropdownMenu = styled.div`
  width: 100px;
  position: absolute;
  top: 40px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  cursor: pointer;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 0;
  &:first-child {
    border-radius: 5px 5px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 5px 5px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.navbarHoverBackground};
  }
`
