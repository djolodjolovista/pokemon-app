/* eslint-disable @typescript-eslint/no-use-before-define */
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

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
      <Title>{t('pokemonLocations', 'Pokémon Locations')}</Title>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>{t('id', 'ID')}</Th>
              <Th>{t('name', 'Name')}</Th>
              <Th>{t('region', 'Region')}</Th>
              <Th>{t('area', 'Area')}</Th>
              <Th>{t('description', 'Description')}</Th>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 0 0 0;
`

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
`

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    display: block;
    thead {
      display: none;
    }
    tbody {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    tr {
      display: block;
      background: ${({ theme }) => theme.card};
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 12px;
      padding: 12px;
    }
    td {
      display: flex;
      padding: 6px 0;
      border: none;
      font-size: 14px;
      text-transform: capitalize;

      &::before {
        content: attr(data-label);
        font-weight: 600;
        color: ${({ theme }) => theme.textSecondary};
      }
    }
  }
`

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: ${({ theme }) => theme.card};
  border-bottom: 2px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`

const Tr = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.background};
  }
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
    td {
      color: #fff;
    }
  }
`

const Td = styled.td<{ label?: string }>`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 6px 0;
    border-bottom: none;
    &::before {
      content: attr(data-label);
      font-weight: 600;
      margin-right: 8px;
    }
  }
`
