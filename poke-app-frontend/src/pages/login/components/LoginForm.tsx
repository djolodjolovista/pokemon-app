/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Input from '../../../components/Input'
import Logo from '../../../assets/images/pokemon_app_logo.png'
import { useLogin } from '../../../hooks/api/useLogin'
import MoonSpinner from '../../../components/spinners/MoonSpinner'
import PasswordInput from '../../../components/PasswordInput'

const Login = () => {
  const { t } = useTranslation('login')
  const { handleLogin, loading, errors } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin(email, password)
  }

  return (
    <Wrapper>
      <Card>
        {loading ? (
          <MoonSpinner position="center" size={60} />
        ) : (
          <>
            <LogoContainer>
              <LogoImg src={Logo} />
            </LogoContainer>
            <Title>{t('login')}</Title>

            <Form onSubmit={onSubmit}>
              <FieldGroup>
                <Input
                  label={t('email')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={errors.email}
                />
              </FieldGroup>

              <FieldGroup>
                <PasswordInput
                  label={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
              </FieldGroup>

              <SubmitButton type="submit">{t('login')}</SubmitButton>
            </Form>
          </>
        )}
      </Card>
    </Wrapper>
  )
}

export default Login

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background};
`

const Card = styled.div`
  width: 380px;
  padding: 32px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`

const LogoImg = styled.img`
  width: 170px;
  margin-bottom: 24px;
`

const Title = styled.h2`
  margin: 0 0 24px 0;
  text-align: center;
  color: ${({ theme }) => theme.text};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`
