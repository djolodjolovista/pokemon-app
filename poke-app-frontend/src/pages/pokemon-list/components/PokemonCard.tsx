import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { handleKeyboardNavigation } from '../../../utils/keyboardNavigation'

interface PokemonCardProps {
  name: string
  sprite: string
  backSprite?: string
  onClick: () => void
}

const Wrapper = styled.div`
  position: relative;
  padding: 1.5rem;
  border-radius: 20px;
  cursor: pointer;

  background: ${({ theme }) =>
    `linear-gradient(145deg, ${theme.card} 0%, ${theme.background} 100%)`};

  border: 1px solid ${({ theme }) => theme.border};
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.08),
    inset 0 0 8px rgba(255, 255, 255, 0.05);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  transition:
    transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
    box-shadow 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/pokeball.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-position: center calc(50% - 20px);

    background-size: 85%;
    opacity: 0.07;
    filter: grayscale(1);
    pointer-events: none;
    z-index: 0;
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 5px 10px rgba(0, 0, 0, 0.12),
      0 0 8px rgba(99, 102, 241, 0.3);
    border-color: ${({ theme }) => theme.primary};
  }
`

const PokemonImage = styled.img`
  width: 110px;
  height: 110px;
  object-fit: contain;
  image-rendering: pixelated;

  transition: transform 0.25s ease;
  ${Wrapper}:hover & {
    transform: scale(1.07);
  }
`

const PokemonName = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  text-transform: capitalize;
  color: ${({ theme }) => theme.text};
  text-align: center;
`

const PokemonCard = ({ name, sprite, onClick, backSprite }: PokemonCardProps) => {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!backSprite) return

    const img = new Image()
    img.src = backSprite
  }, [backSprite])

  return (
    <Wrapper
      tabIndex={0}
      onMouseEnter={() => backSprite && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardNavigation(e, onClick)}
    >
      <PokemonImage src={hovered && backSprite ? backSprite : sprite} alt={name} />
      <PokemonName>{name}</PokemonName>
    </Wrapper>
  )
}

export default PokemonCard
