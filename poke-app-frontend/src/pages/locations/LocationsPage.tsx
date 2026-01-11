import { useTranslation } from 'react-i18next'
import { Container, Table, TableWrapper, Td, Th, Title, Tr } from './Locations.styles'
import { usePokemonLocations } from '../../hooks/api/usePokemonLocations'
import MoonSpinner from '../../components/spinners/MoonSpinner'
import { formatLocationsName } from '../../utils/formatLocationsName'

const LocationsPage = () => {
  const { t } = useTranslation('pokemon')
  const { error, loading, locations } = usePokemonLocations()

  if (loading) return <MoonSpinner size={50} />
  if (error) return <div>Error: {error}</div>
  if (!locations) return <div>No data found.</div>
  return (
    <Container>
      <Title>{t('pokemonLocations')}</Title>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>{t('name')}</Th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <Tr tabIndex={0} key={loc.id}>
                <Td>{formatLocationsName(loc.name)}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  )
}

export default LocationsPage
