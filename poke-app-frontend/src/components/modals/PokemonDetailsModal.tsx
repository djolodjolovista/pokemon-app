/* eslint-disable @typescript-eslint/no-use-before-define */
import { useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePokemonDetails } from '../../hooks/api/usePokemonDetails'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import MoonSpinner from '../spinners/MoonSpinner'

interface PokemonModalProps {
  name: string | null
  onClose: () => void
}

const PokemonDetailsModal = ({ name, onClose }: PokemonModalProps) => {
  const { details, loading, error } = usePokemonDetails(name || null)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)
  const mainType = details?.types?.[0] || 'normal'

  useOutsideClick(modalRef, onClose)

  const goToExtended = () => {
    navigate(`/pokemon/${name}`)
  }

  if (!name) return null

  return (
    <Overlay>
      <ModalCard ref={modalRef} $typeColor={typeColors[mainType]}>
        {loading && <MoonSpinner color="black" />}
        {error && <ErrorBox>{error}</ErrorBox>}

        {!loading && details && (
          <>
            <Title>{details.name}</Title>

            <ImageRow>
              <SpriteWrapper>
                <Sprite src={details.sprite_front} alt="front" />
              </SpriteWrapper>
              <SpriteWrapper>
                <Sprite src={details.sprite_back!} alt="back" />
              </SpriteWrapper>
            </ImageRow>

            <StatsBox>
              <StatRow>
                <Label>{t('pokemon.height', 'Height')}</Label>
                <Value>{details.height}</Value>
              </StatRow>

              <StatRow>
                <Label>{t('pokemon.weight', 'Weight')}</Label>
                <Value>{details.weight}</Value>
              </StatRow>

              <StatRow>
                <Label>{t('pokemon.types', 'Types')}</Label>
                <Value>{details.types.join(', ')}</Value>
              </StatRow>
            </StatsBox>

            <MoreButton onClick={goToExtended}>
              {t('pokemon.moreDetails', 'More Details')}
            </MoreButton>
          </>
        )}
      </ModalCard>
    </Overlay>
  )
}

export default PokemonDetailsModal

const typeColors: Record<string, string> = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  poison: '#A040A0',
  bug: '#A8B820',
  rock: '#B8A038',
  ground: '#E0C068',
  steel: '#B8B8D0',
  flying: '#A890F0',
  fighting: '#C03028',
  ghost: '#705898',
  normal: '#A8A878',
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`

const ModalCard = styled.div<{ $typeColor: string }>`
  width: 420px;
  padding: 26px;
  border-radius: 18px;
  position: relative;

  background: ${({ $typeColor }) => `
    linear-gradient(135deg, ${$typeColor}55, ${$typeColor} 90%)
  `};

  border: 4px solid ${({ $typeColor }) => $typeColor};
  box-shadow:
    0 10px 35px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.3);

  animation: fadeIn 0.2s ease-out;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const ErrorBox = styled.div`
  background: #ffdddd;
  padding: 12px;
  border-radius: 8px;
  color: #a33;
  width: 100%;
  text-align: center;
`

const Title = styled.h2`
  text-transform: capitalize;
  text-align: center;
  font-size: 28px;
  color: white;
  margin-bottom: 16px;
`

const ImageRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 24px;
`

const SpriteWrapper = styled.div`
  width: 110px;
  height: 110px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  box-shadow:
    inset 0 0 10px rgba(255, 255, 255, 0.25),
    0 4px 8px rgba(0, 0, 0, 0.2);
`

const Sprite = styled.img`
  width: 96px;
  height: 96px;
  object-fit: contain;
  image-rendering: pixelated;
`

const StatsBox = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.25);
  padding: 18px;
  border-radius: 14px;
  backdrop-filter: blur(6px);
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 18px;
`

const Label = styled.span`
  font-weight: 700;
`

const Value = styled.span`
  opacity: 0.9;
`

const MoreButton = styled.button`
  margin: 16px auto 0;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  background: ${({ theme }) => theme.buttonBackground};
  color: white;

  display: block;
  transition: 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonHoverBackground};

    transform: translateY(-1px);
  }

  &:active {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(0px);
  }
`
