const BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const getFrontSprite = (id: string | number) => `${BASE_URL}/${id}.png`
export const getBackSprite = (id: string | number) => `${BASE_URL}/back/${id}.png`
