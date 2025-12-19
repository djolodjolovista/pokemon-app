import React from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../../../components/Input'
import Logo from '../../../assets/images/pokemon_app_logo.png'
import { useLogin } from '../../../hooks/api/useLogin'
import MoonSpinner from '../../../components/spinners/MoonSpinner'
import PasswordInput from '../../../components/PasswordInput'
import {
  Card,
  FieldGroup,
  Form,
  LogoContainer,
  LogoImg,
  SubmitButton,
  Title,
  Wrapper,
} from './LoginForm.styles'

const Login = () => {
  const { t } = useTranslation('login')
  const { handleLogin, loading, errors } = useLogin()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    handleLogin(email, password)
  }

  return (
    <Wrapper>
      <Card>
        {loading ? (
          <MoonSpinner align="center" size={60} />
        ) : (
          <>
            <LogoContainer>
              <LogoImg src={Logo} />
            </LogoContainer>
            <Title>{t('login')}</Title>

            <Form onSubmit={onSubmit}>
              <FieldGroup>
                <Input name="email" label={t('email')} type="email" required error={errors.email} />
              </FieldGroup>

              <FieldGroup>
                <PasswordInput name="password" label={t('password')} error={errors.password} />
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
