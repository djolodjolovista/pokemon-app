import styled, { useTheme } from 'styled-components'
import { MoonLoader } from 'react-spinners'

type SpinnerPosition = 'left' | 'center' | 'right'

interface SpinnerProps {
  size?: number
  color?: string
  position?: SpinnerPosition
  className?: string
}

interface WrapperProps {
  $position: SpinnerPosition
}

const SpinnerWrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: ${({ $position }) => {
    const map: Record<SpinnerPosition, string> = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    }
    return map[$position]
  }};
  align-items: center;
  width: 100%;
  min-height: 100px;
`

const MoonSpinner = ({ size = 50, color, position = 'center', className = '' }: SpinnerProps) => {
  const theme = useTheme()
  const spinnerColor = color || theme.primary
  return (
    <SpinnerWrapper $position={position} className={className}>
      <MoonLoader size={size} color={spinnerColor} />
    </SpinnerWrapper>
  )
}

export default MoonSpinner
