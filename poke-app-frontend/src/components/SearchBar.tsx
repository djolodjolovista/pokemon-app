/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  delay?: number
}

const SearchBar = ({ value, onChange, placeholder, delay = 300 }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value)
  const { t } = useTranslation('global')

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue)
      }
    }, delay)

    return () => clearTimeout(handler)
  }, [inputValue, delay, onChange, value])

  return (
    <Wrapper>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder || t('searchPlaceholder')}
      />
    </Wrapper>
  )
}

export default SearchBar

const Wrapper = styled.div`
  width: 100%;

  input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 16px;
    outline: none;

    &:focus {
      border-color: #888;
    }
  }
`
