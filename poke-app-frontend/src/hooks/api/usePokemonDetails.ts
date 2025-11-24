import { useEffect, useState } from 'react'
import { getPokemonDetails } from '../../api/pokemonApi'
import type { PokemonDetails } from '../../types/types'

export function usePokemonDetails(name: string | null) {
  const [details, setDetails] = useState<PokemonDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!name) return

    setLoading(true)
    setError(null)

    getPokemonDetails(name)
      .then((data) => setDetails(data))
      .catch((err) => setError(err.response.data.message || 'Failed to load Pokémon details'))
      .finally(() => setLoading(false))
  }, [name])

  return { details, loading, error }
}
