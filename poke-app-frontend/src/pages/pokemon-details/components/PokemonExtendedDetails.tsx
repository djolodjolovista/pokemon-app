import { useTranslation } from 'react-i18next'
import type { ExtendedDetailsPokemon } from '../../../types/types'
import {
  Artwork,
  Card,
  Container,
  EvolutionText,
  FlavorText,
  Header,
  Label,
  List,
  MoveItem,
  MovesList,
  Progress,
  ProgressBar,
  SectionTitle,
  Stat,
  StatLabel,
  StatsGrid,
  StatValue,
  Title,
} from './PokemonExtendedDetails.styles'

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
        <SectionTitle>{t('basicInfo')}</SectionTitle>
        <List>
          <li>
            <Label>{t('height')}:</Label> {pokemon.height}
          </li>
          <li>
            <Label>{t('weight')}:</Label> {pokemon.weight}
          </li>
          <li>
            <Label>{t('types')}:</Label> {pokemon.types.join(', ')}
          </li>
          <li>
            <Label>{t('abilities')}:</Label> {pokemon.abilities.join(', ')}
          </li>
          <li>
            <Label>{t('baseEXP')}:</Label> {pokemon.base_experience}
          </li>
        </List>
      </Card>

      <Card>
        <SectionTitle>{t('stats')}</SectionTitle>
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
        <SectionTitle>{t('evolutionChain')}</SectionTitle>
        <EvolutionText>{pokemon.evolution_chain.join(' → ')}</EvolutionText>
      </Card>

      <Card>
        <SectionTitle>{t('biology')}</SectionTitle>
        <List>
          <li>
            <Label>{t('color')}:</Label> {pokemon.color}
          </li>
          <li>
            <Label>{t('habitat')}:</Label> {pokemon.habitat}
          </li>
          <li>
            <Label>{t('shape')}:</Label> {pokemon.shape}
          </li>
        </List>
      </Card>

      <Card>
        <SectionTitle>{t('description')}</SectionTitle>
        <FlavorText>{pokemon.flavor_text}</FlavorText>
      </Card>

      <Card>
        <SectionTitle>{t('moves')}</SectionTitle>
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
