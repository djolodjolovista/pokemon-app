import { useTranslation } from 'react-i18next'
import { Container, Table, TableWrapper, Td, Th, Title, Tr } from './Locations.styles'

interface Location {
  id: number
  name: string
  region: string
  area: string
  description: string
}

const mockLocations: Location[] = [
  { id: 1, name: 'Pallet Town', region: 'Kanto', area: 'Town', description: 'Hometown of Ash.' },
  {
    id: 2,
    name: 'Viridian City',
    region: 'Kanto',
    area: 'City',
    description: 'City with the Pokémon Gym.',
  },
  {
    id: 3,
    name: 'Pewter City',
    region: 'Kanto',
    area: 'City',
    description: 'Home of the Pewter Gym.',
  },
  {
    id: 4,
    name: 'Cerulean Cave',
    region: 'Kanto',
    area: 'Cave',
    description: 'Cave with rare Pokémon.',
  },
  {
    id: 5,
    name: 'Mt. Moon',
    region: 'Kanto',
    area: 'Mountain',
    description: 'Mountain with moonstones.',
  },
  {
    id: 6,
    name: 'Lavender Town',
    region: 'Kanto',
    area: 'Town',
    description: 'Famous for Pokémon Tower.',
  },
  {
    id: 7,
    name: 'Celadon City',
    region: 'Kanto',
    area: 'City',
    description: 'City with large department store.',
  },
  {
    id: 8,
    name: 'Fuchsia City',
    region: 'Kanto',
    area: 'City',
    description: 'Home to Safari Zone.',
  },
  {
    id: 9,
    name: 'Cinnabar Island',
    region: 'Kanto',
    area: 'Island',
    description: 'Volcano island with Gym.',
  },
  {
    id: 10,
    name: 'Saffron City',
    region: 'Kanto',
    area: 'City',
    description: 'Largest city with Silph Co.',
  },
]

const LocationsPage = () => {
  const { t } = useTranslation('pokemon')
  return (
    <Container>
      <Title>{t('pokemonLocations')}</Title>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>{t('id')}</Th>
              <Th>{t('name')}</Th>
              <Th>{t('region')}</Th>
              <Th>{t('area')}</Th>
              <Th>{t('description')}</Th>
            </tr>
          </thead>
          <tbody>
            {mockLocations.map((loc) => (
              <Tr tabIndex={0} key={loc.id}>
                <Td>{loc.id}</Td>
                <Td>{loc.name}</Td>
                <Td>{loc.region}</Td>
                <Td>{loc.area}</Td>
                <Td>{loc.description}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  )
}

export default LocationsPage
