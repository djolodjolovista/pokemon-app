import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FocusTrap } from 'focus-trap-react'
import { usePokemonDetails } from '../../hooks/api/usePokemonDetails'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import MoonSpinner from '../spinners/MoonSpinner'
import { ROUTES } from '../../routes/paths.enum'
import {
  ErrorBox,
  ImageRow,
  Label,
  ModalCard,
  MoreButton,
  Overlay,
  Sprite,
  SpriteWrapper,
  StatRow,
  StatsBox,
  Title,
  Value,
} from './PokemonDetailsModal.styles'

interface PokemonModalProps {
  name: string | null
  onClose: () => void
}

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

const PokemonDetailsModal = ({ name, onClose }: PokemonModalProps) => {
  const { details, loading, error } = usePokemonDetails(name || null)
  const { t } = useTranslation('pokemon')
  const navigate = useNavigate()
  const modalRef = useOutsideClick<HTMLDivElement>(onClose)
  const mainType = details?.types?.[0] || 'normal'
  const isFocusTrapActive = !!name && !loading && !error

  const goToExtended = () => {
    navigate(`${ROUTES.POKEMON_LIST}/${name}`)
  }

  if (!name) return null

  return (
    <Overlay>
      <FocusTrap
        active={isFocusTrapActive}
        focusTrapOptions={{
          clickOutsideDeactivates: true,
          escapeDeactivates: true,
          fallbackFocus: () => modalRef.current!,
        }}
      >
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
                  <Label>{t('height')}</Label>
                  <Value>{details.height}</Value>
                </StatRow>

                <StatRow>
                  <Label>{t('weight')}</Label>
                  <Value>{details.weight}</Value>
                </StatRow>

                <StatRow>
                  <Label>{t('types')}</Label>
                  <Value>{details.types.join(', ')}</Value>
                </StatRow>
              </StatsBox>

              <MoreButton tabIndex={0} onClick={goToExtended}>
                {t('moreDetails')}
              </MoreButton>
            </>
          )}
        </ModalCard>
      </FocusTrap>
    </Overlay>
  )
}

export default PokemonDetailsModal
