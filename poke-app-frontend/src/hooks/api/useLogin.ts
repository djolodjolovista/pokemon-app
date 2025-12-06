import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { login } from '../../api/authApi'
import { ROUTES } from '../../routes/paths.enum'
import { useAuthStore } from '../../store/authStore'
import { loginSchema, type LoginSchema } from '../../validation/login.schema'

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof LoginSchema, string>>>({})

  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation('toast')

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      setLoading(true)

      const result = loginSchema.safeParse({ email, password })
      if (!result.success) {
        const fieldErrors: Partial<Record<keyof LoginSchema, string>> = {}
        result.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as keyof LoginSchema] = issue.message
        })
        setErrors(fieldErrors)
        setLoading(false)
        return
      }

      setErrors({})

      try {
        const res = await login({ email, password })

        toast.success(t('loginSuccessful'), {
          style: {
            background: theme.background,
            color: theme.text,
            border: `1px solid ${theme.border}`,
          },
        })

        useAuthStore.getState().login(res.accessToken, res.user)

        navigate(ROUTES.POKEMON_LIST)
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, theme],
  )

  return {
    loading,
    errors,
    handleLogin,
  }
}
