import axios from "axios";
import { Pokemon } from "../types/pokemon.type";
import errorIcon from '../../../assets/error-img.webp';
import { API } from "../../../common/const/api.const";

axios.defaults.baseURL = API.POKEMON_API_URL

export const fetchPokemons = async () => {
  const response = await axios.get('/?limit=100');
  return response.data.results;
}

export const fetchPokemonsTeam = async (pokemons: Pokemon[]): Promise<string[]> => {
  const responses = pokemons.map(async (pokemon: Pokemon) => {
    const response = await axios.get(pokemon.url)
    return response.data.sprites.other['official-artwork'].front_default;
  })

  const data = await Promise.allSettled(responses);

  return data.map((item) => {
    if (item.status === 'fulfilled') {
      return item.value
    }
    return errorIcon;
  });
}