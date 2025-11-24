import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePokemonStore } from '../../store/pokemonStore'

type SelectedPokemon = { name: string; sprite: string } | null

export const usePokemonList = () => {
  const {
    pokemons,
    page,
    total,
    search,
    loading,
    initialized,
    fetchPokemons,
    setPage,
    setSearch,
    initializeFromUrl,
  } = usePokemonStore()

  const [params, setParams] = useSearchParams()
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon>(null)

  useEffect(() => {
    const urlPage = Number(params.get('page')) || 1
    const urlSearch = params.get('search') || ''
    initializeFromUrl(urlPage, urlSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!initialized) return
    fetchPokemons(page, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, page, search])

  useEffect(() => {
    if (!initialized) return
    setParams({ page: String(page), search })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, page, search])

  const onSelectPokemon = useCallback((name: string, sprite: string) => {
    setSelectedPokemon({ name, sprite })
  }, [])

  const onCloseDetails = useCallback(() => setSelectedPokemon(null), [])

  const onSearchChange = useCallback((v: string) => setSearch(v), [setSearch])

  const onPageChange = useCallback((p: number) => setPage(p), [setPage])

  const totalPages = Math.ceil(total / 20)

  const getId = useCallback((url: string) => {
    const parts = url.split('/').filter(Boolean)
    return parts[parts.length - 1]
  }, [])

  return {
    pokemons,
    page,
    total,
    search,
    loading,
    initialized,

    totalPages,
    getId,

    onSelectPokemon,
    onCloseDetails,
    onSearchChange,
    onPageChange,

    selectedPokemon,
  } as const
}
