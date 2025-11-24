/* eslint-disable @typescript-eslint/no-use-before-define */
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { usePokemonExtendedDetails } from '../../hooks/api/usePokemoExtendedDetails'
import PokemonExtendedDetails from './components/PokemonExtendedDetails'
import MoonSpinner from '../../components/spinners/MoonSpinner'

const PokemonDetailsPage = () => {
  const { name } = useParams()
  const { data, loading, error } = usePokemonExtendedDetails(name)

  if (loading) return <MoonSpinner size={50} />
  if (error) return <Message>Error: {error}</Message>
  if (!data) return <Message>No data found.</Message>

  return (
    <Wrapper>
      <PokemonExtendedDetails pokemon={data} />
    </Wrapper>
  )
}

export default PokemonDetailsPage

const Wrapper = styled.div`
  width: 100%;
  padding: 24px;
`

const Message = styled.div`
  font-size: 22px;
  padding: 24px;
`
