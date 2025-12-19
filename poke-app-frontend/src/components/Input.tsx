import React from 'react'
import styled from 'styled-components'

interface InputProps {
  label: string
  error?: string | boolean
  name?: string
  type?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  autoComplete?: string
  ref?: React.Ref<HTMLInputElement>

  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input<{ $error?: boolean | string }>`
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.input};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ $error, theme }) => ($error ? '#f56565' : theme.border)};
  font-size: 14px;
  transition: 0.2s border-color ease;

  &:focus {
    outline: none;
    border-color: ${({ $error, theme }) => ($error ? '#f56565' : theme.primary)};
    box-shadow: 0 0 0 1px ${({ $error, theme }) => ($error ? '#f56565' : theme.primary)};
  }
`

const Label = styled.label<{ $error?: boolean }>`
  position: absolute;
  top: -10px;
  left: 0.5rem;
  padding: 0 0.25rem;
  font-size: 12px;
  z-index: 1;
  font-weight: 500;
  transition: all 0.2s ease;

  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.card} 0%,
    ${({ theme }) => theme.card} 50%,
    ${({ theme }) => theme.input} 50%,
    ${({ theme }) => theme.input} 100%
  );

  color: ${({ $error, theme }) => ($error ? '#f56565' : theme.text)};
`

const ErrorText = styled.span`
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #f56565;
`

const Input = ({
  label,
  error,
  name,
  type,
  value,
  defaultValue,
  placeholder,
  disabled,
  required,
  autoComplete,
  ref,
  onChange,
  onBlur,
}: InputProps) => (
  <Wrapper>
    <Label $error={!!error}>{label}</Label>

    <StyledInput
      ref={ref}
      $error={!!error}
      name={name}
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      onChange={onChange}
      onBlur={onBlur}
    />

    {error && typeof error === 'string' && <ErrorText>{error}</ErrorText>}
  </Wrapper>
)

export default Input
