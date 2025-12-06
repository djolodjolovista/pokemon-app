/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import type { ExtendedDetailsPokemon } from '../../../types/types'

interface PokemonExtendedDetailsProps {
  pokemon: ExtendedDetailsPokemon
}

const PokemonExtendedDetails = ({ pokemon }: PokemonExtendedDetailsProps) => {
  const { t } = useTranslation('pokemon')
  return (
    <Container>
      <Header>
        <Artwork src={pokemon.sprite_artwork} alt={pokemon.name} />
        <Title>{pokemon.name.toUpperCase()}</Title>
      </Header>

      <Card>
        <SectionTitle>{t('basicInfo', 'Basic Info')}</SectionTitle>
        <List>
          <li>
            <Label>{t('height', 'Height')}:</Label> {pokemon.height}
          </li>
          <li>
            <Label>{t('weight', 'Weight')}:</Label> {pokemon.weight}
          </li>
          <li>
            <Label>{t('types', 'Types')}:</Label> {pokemon.types.join(', ')}
          </li>
          <li>
            <Label>{t('abilities', 'Abilities')}:</Label> {pokemon.abilities.join(', ')}
          </li>
          <li>
            <Label>{t('baseEXP', 'Base EXP')}:</Label> {pokemon.base_experience}
          </li>
        </List>
      </Card>

      <Card>
        <SectionTitle>{t('stats', 'Stats')}</SectionTitle>
        <StatsGrid>
          {pokemon.stats.map((s) => (
            <Stat key={s.name}>
              <StatLabel>{s.name}</StatLabel>
              <ProgressBar>
                <Progress width={Math.min(s.value, 100)} type={s.name} />
              </ProgressBar>
              <StatValue>{s.value}</StatValue>
            </Stat>
          ))}
        </StatsGrid>
      </Card>

      <Card>
        <SectionTitle>{t('evolutionChain', 'Evolution Chain')}</SectionTitle>
        <EvolutionText>{pokemon.evolution_chain.join(' → ')}</EvolutionText>
      </Card>

      <Card>
        <SectionTitle>{t('biology', 'Biology')}</SectionTitle>
        <List>
          <li>
            <Label>{t('color', 'Color')}:</Label> {pokemon.color}
          </li>
          <li>
            <Label>{t('habitat', 'Habitat')}:</Label> {pokemon.habitat}
          </li>
          <li>
            <Label>{t('shape', 'Shape')}:</Label> {pokemon.shape}
          </li>
        </List>
      </Card>

      <Card>
        <SectionTitle>{t('description', 'Description')}</SectionTitle>
        <FlavorText>{pokemon.flavor_text}</FlavorText>
      </Card>

      <Card>
        <SectionTitle>{t('moves', 'Moves')}</SectionTitle>
        <MovesList>
          {pokemon.moves.map((m) => (
            <MoveItem key={m}>{m}</MoveItem>
          ))}
        </MovesList>
      </Card>
    </Container>
  )
}

export default PokemonExtendedDetails

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 16px;

  @media (max-width: 600px) {
    padding: 12px;
    gap: 20px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.border};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
`

const Artwork = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 600px) {
    width: 140px;
    height: 140px;
  }
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    font-size: 24px;
    text-align: center;
  }
`

const Card = styled.section`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`

const SectionTitle = styled.h2`
  margin-bottom: 14px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    font-size: 18px;
  }
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const StatLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: capitalize;
`

const StatValue = styled.span`
  font-size: 14px;
  font-weight: 600;
`

const ProgressBar = styled.div`
  height: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.border};
  overflow: hidden;
`

const Progress = styled.div<{ width: number; type: string }>`
  width: ${({ width }) => width}%;
  height: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.primary};
  transition: width 0.4s ease;
`

const EvolutionText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

const FlavorText = styled.p`
  font-size: 17px;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

const MovesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const MoveItem = styled.li`
  padding: 8px 14px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  text-transform: capitalize;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 6px 10px;
  }
`
