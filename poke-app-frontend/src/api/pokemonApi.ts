import type {
  ExtendedDetailsPokemon,
  Location,
  PokemonDetails,
  PokemonListResponse,
} from '../types/types'
import { apiWrapper } from './utils/apiWrapper'
import apiClient from './utils/apiClient'

export const getPokemonList = async (page: number, limit: number = 20, search: string = '') => {
  const params = new URLSearchParams()

  params.append('page', String(page))
  params.append('limit', String(limit))

  if (search.trim() !== '') {
    params.append('search', search.trim())
  }

  const res = await apiClient.get<PokemonListResponse>(`/pokemon?${params.toString()}`)

  return res.data
}

export const getPokemonDetails = (name: string): Promise<PokemonDetails> => {
  // NOTE: All Pokémon names work with either lowercase or capitalized first letter,
  // except "pidgeotto", which only works with capitalized first letter due to a PokeAPI bug.
  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  const capitalizedName = capitalizeFirst(name)

  return apiWrapper(async () => {
    const res = await apiClient.get(`/pokemon/${capitalizedName}`)
    return res.data
  })
}
export const getPokemonDetailsExtended = (name: string): Promise<ExtendedDetailsPokemon> => {
  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  const capitalizedName = capitalizeFirst(name)
  return apiWrapper(async () => {
    const res = await apiClient.get(`/pokemon/${capitalizedName}/extended`)
    return res.data
  })
}

export const getPokemonLocations = (): Promise<Location[]> =>
  apiWrapper(async () => {
    const res = await apiClient.get('/pokemon/locations')
    return res.data
  })
