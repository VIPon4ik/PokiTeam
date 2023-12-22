import axios from "axios";

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/pokemon'

export const fetchPokemons = async () => {
  try {
    const response = await axios.get('/?limit=100');
    return response.data.results;
  } catch(e) {
    console.log(e);
  }
}

export const fetchPokemonsTeam = async (pokemons: any) => {

}