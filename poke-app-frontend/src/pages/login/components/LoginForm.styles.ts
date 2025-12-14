import styled from "styled-components"

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background};
`

export const Card = styled.div`
  width: 380px;
  padding: 32px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const LogoImg = styled.img`
  width: 170px;
  margin-bottom: 24px;
`

export const Title = styled.h2`
  margin: 0 0 24px 0;
  text-align: center;
  color: ${({ theme }) => theme.text};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const SubmitButton = styled.button`
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