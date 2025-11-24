import { useEffect, useState } from 'react'
import type { ExtendedDetailsPokemon } from '../../types/types'
import { getPokemonDetailsExtended } from '../../api/pokemonApi'

export const usePokemonExtendedDetails = (name: string | undefined) => {
  const [details, setDetails] = useState<ExtendedDetailsPokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!name) return

    setLoading(true)
    setError(null)
    getPokemonDetailsExtended(name)
      .then((data) => setDetails(data))
      .catch((err) => setError(err.response.data.message || 'Failed to load Pokémon details'))
      .finally(() => setLoading(false))
  }, [name])

  return { data: details, loading, error }
}
