import { useEffect, useState } from 'react'
import type { Location } from '../../types/types'
import { getPokemonLocations } from '../../api/pokemonApi'

export const usePokemonLocations = () => {
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPokemonLocations()
      .then((data) => setLocations(data))
      .catch((err) => setError(err.message || 'Failed to load Pokémon locations'))
      .finally(() => setLoading(false))
  }, [])

  return { locations, loading, error }
}
