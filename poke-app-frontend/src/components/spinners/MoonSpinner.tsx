import styled, { useTheme } from 'styled-components'
import { MoonLoader } from 'react-spinners'

type FlexAlignment = keyof typeof POSITION_MAP

interface SpinnerProps {
  size?: number
  color?: string
  align?: FlexAlignment
  className?: string
}

const POSITION_MAP = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const

const SpinnerWrapper = styled.div<{ $align: FlexAlignment }>`
  display: flex;
  justify-content: ${({ $align }) => POSITION_MAP[$align]};
  align-items: center;
  width: 100%;
  min-height: 100px;
`

const MoonSpinner = ({ size = 50, color, align = 'center', className }: SpinnerProps) => {
  const theme = useTheme()
  const spinnerColor = color || theme.primary

  return (
    <SpinnerWrapper $align={align} className={className}>
      <MoonLoader size={size} color={spinnerColor} />
    </SpinnerWrapper>
  )
}

export default MoonSpinner
