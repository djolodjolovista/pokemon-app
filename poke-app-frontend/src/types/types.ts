export interface LoginData {
  email: string
  password: string
}

export type User = {
  email: string
  firstName: string
  lastName: string
  avatar?: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  types: string[]
  abilities: string[]
  sprite_front: string
  sprite_back: string | null
  sprite_artwork: string | null
}

export interface ExtendedDetailsPokemon {
  id: number
  name: string
  height: number
  weight: number
  types: string[]
  abilities: string[]
  base_experience: number
  stats: { name: string; value: number }[]
  moves: string[]
  color?: string
  habitat?: string
  shape?: string
  flavor_text?: string
  evolution_chain: string[]
  sprite_artwork: string
}

export interface Location {
  id: number
  name: string
  region: string
  area: string
  description: string
}
