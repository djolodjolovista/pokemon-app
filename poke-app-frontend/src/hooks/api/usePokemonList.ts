import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePokemonStore } from '../../store/pokemonStore'
import { POKEMON_PAGE_SIZE } from '../../types/pokemon.constants'

type SelectedPokemon = { name: string; sprite: string } | null

export const usePokemonList = () => {
  const { pokemons, total, loading, fetchPokemons } = usePokemonStore()

  const [params, setParams] = useSearchParams({ page: '1', search: '' })
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon>(null)

  const pageParam = Number(params.get('page'))
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const search = params.get('search') ?? ''

  const totalPages = Math.ceil(total / POKEMON_PAGE_SIZE)

  useEffect(() => {
    fetchPokemons(page, search)
  }, [page, search, fetchPokemons])

  useEffect(() => {
    if (total === 0) return

    if (page > totalPages) setParams({ page: String(totalPages), search })
  }, [page, total, search, totalPages, setParams])

  const onSearchChange = useCallback(
    (v: string) => setParams({ page: '1', search: v }),
    [setParams],
  )

  const onPageChange = useCallback(
    (p: number) => setParams({ page: String(p), search }),
    [setParams, search],
  )

  const onSelectPokemon = useCallback((name: string, sprite: string) => {
    setSelectedPokemon({ name, sprite })
  }, [])

  const onCloseDetails = useCallback(() => setSelectedPokemon(null), [])

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
    totalPages,
    selectedPokemon,

    getId,
    onSelectPokemon,
    onCloseDetails,
    onSearchChange,
    onPageChange,
  } as const
}
