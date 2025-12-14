import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import PokemonCard from './components/PokemonCard'
import Pagination from '../../components/pagination/Pagination'
import SearchBar from '../../components/SearchBar'
import PokemonDetailsModal from '../../components/modals/PokemonDetailsModal'
import { usePokemonList } from '../../hooks/api/usePokemonList'
import { getBackSprite, getFrontSprite } from '../../utils/pokemonSprites'
import MoonSpinner from '../../components/spinners/MoonSpinner'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 0 0 0;
  color: ${({ theme }) => theme.text};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 16px;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0px 24px 0;
  overflow-y: auto;
  gap: 24px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const PokemonListPage = () => {
  const { t } = useTranslation('pokemon')

  const {
    pokemons,
    page,
    totalPages,
    search,
    loading,
    selectedPokemon,
    getId,
    onSelectPokemon,
    onCloseDetails,
    onSearchChange,
    onPageChange,
  } = usePokemonList()

  return (
    <Wrapper>
      <Header>
        <h2>{t('pokemonList')}</h2>

        <SearchBar
          value={search}
          onChange={(v) => onSearchChange(v)}
          placeholder={t('searchPlaceholder')}
        />
      </Header>
      {loading && <MoonSpinner size={60} position="center" />}
      <Content>
        <Grid>
          {!loading &&
            pokemons.map((p) => {
              const id = getId(p.url)
              const sprite = getFrontSprite(id)
              const backSprite = getBackSprite(id)

              return (
                <PokemonCard
                  key={p.name}
                  name={p.name}
                  backSprite={backSprite}
                  sprite={sprite}
                  onClick={() => onSelectPokemon(p.name, sprite)}
                />
              )
            })}
        </Grid>

        {selectedPokemon && (
          <PokemonDetailsModal name={selectedPokemon.name} onClose={onCloseDetails} />
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </Content>
    </Wrapper>
  )
}

export default PokemonListPage
