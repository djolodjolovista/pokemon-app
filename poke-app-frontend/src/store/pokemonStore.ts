import { create } from 'zustand'
import { getPokemonList } from '../api/pokemonApi'
import type { PokemonListItem } from '../types/types'
import { POKEMON_PAGE_SIZE } from '../types/pokemon.constants'

interface PokemonCacheEntry {
  list: PokemonListItem[]
  total: number
}

interface PokemonState {
  pokemons: PokemonListItem[]
  total: number
  loading: boolean
  cache: Record<string, PokemonCacheEntry>

  fetchPokemons: (page: number, search: string) => Promise<void>
}

const LOCAL_CACHE_KEY = 'pokemon_cache_v2'

export const usePokemonStore = create<PokemonState>((set, get) => ({
  pokemons: [],
  total: 0,
  loading: false,

  cache: JSON.parse(localStorage.getItem(LOCAL_CACHE_KEY) || '{}'),

  fetchPokemons: async (page, search) => {
    const cacheKey = `${search}_${page}`
    const { cache } = get()

    if (cache[cacheKey]) {
      const entry = cache[cacheKey]
      set({
        pokemons: entry.list,
        total: entry.total,
      })
      return
    }

    set({ loading: true })

    try {
      const data = await getPokemonList(page, POKEMON_PAGE_SIZE, search)

      const list = data.results
      const totalItems = data.count

      const newCache = {
        ...cache,
        [cacheKey]: { list, total: totalItems },
      }

      localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(newCache))

      set({
        pokemons: list,
        total: totalItems,
        cache: newCache,
      })
    } finally {
      set({ loading: false })
    }
  },
}))
