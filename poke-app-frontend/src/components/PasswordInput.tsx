import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styled from 'styled-components'
import Input from './Input'

interface PasswordInputProps {
  label?: string
  error?: string | boolean
  name?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  ref?: React.Ref<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 21px;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;
  &:hover {
    color: #374151;
  }
`

const PasswordInput = ({
  label = 'Password',
  error = false,
  name,
  value,
  placeholder,
  disabled,
  ref,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Wrapper>
      <Input
        ref={ref}
        label={label}
        error={error}
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />

      <IconWrapper onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </IconWrapper>
    </Wrapper>
  )
}

export default PasswordInput
