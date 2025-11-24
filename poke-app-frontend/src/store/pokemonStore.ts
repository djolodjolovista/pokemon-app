import { create } from 'zustand'
import { getPokemonList } from '../api/pokemonApi'
import type { PokemonListItem } from '../types/types'

interface PokemonCacheEntry {
  list: PokemonListItem[]
  total: number
}

interface PokemonState {
  pokemons: PokemonListItem[]
  page: number
  total: number
  search: string
  loading: boolean
  cache: Record<string, PokemonCacheEntry>
  initialized: boolean

  initializeFromUrl: (page: number, search: string) => void
  fetchPokemons: (page?: number, search?: string) => Promise<void>
  setPage: (page: number) => void
  setSearch: (search: string) => void
}

const LOCAL_CACHE_KEY = 'pokemon_cache_v2'

export const usePokemonStore = create<PokemonState>((set, get) => ({
  pokemons: [],
  page: 1,
  total: 0,
  search: '',
  loading: false,
  initialized: false,

  cache: JSON.parse(localStorage.getItem(LOCAL_CACHE_KEY) || '{}'),

  initializeFromUrl: (page, search) =>
    set({
      page,
      search,
      initialized: true,
    }),

  setPage: (page) => set({ page }),

  setSearch: (search) => set({ search, page: 1 }),

  fetchPokemons: async (page = get().page, search = get().search) => {
    if (!get().initialized) return

    const { cache } = get()
    const cacheKey = `${search}_${page}`

    if (cache[cacheKey]) {
      const entry = cache[cacheKey]
      set({
        pokemons: entry.list,
        total: entry.total,
        page,
        search,
      })
      return
    }

    set({ loading: true })

    try {
      const data = await getPokemonList(page, 20, search)

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
        page,
        search,
        cache: newCache,
      })
    } finally {
      set({ loading: false })
    }
  },
}))
