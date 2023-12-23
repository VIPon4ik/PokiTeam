import axios from "axios";

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/pokemon'

export const fetchPokemons = async () => {
  try {
    const response = await axios.get('/?limit=100');
    return response.data.results;
  } catch (e: any) {
    console.log(e.message);
  }
}

export const fetchPokemonsTeam = async (pokemons: any) => {
  try {
    const responses = pokemons.map(async (pokemon: any) => {
      const response = await axios.get(pokemon.url)
      return response.data.sprites.other['official-artwork'].front_default;
    })

    const data = await Promise.allSettled(responses);
    return data.filter(({ status }) => status === 'fulfilled').map(({ value }:any) => value);
  } catch (e: any) {
    console.log(e.message)
  }
}