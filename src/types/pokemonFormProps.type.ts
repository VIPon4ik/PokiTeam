export interface PokemonFormProps {
  title: string,
}

export interface IPokemonsFormValues {
  name: string,
  surname: string,
  selectedPokemons: Pokemon[],
}

export interface Pokemon {
  name: string;
  url:string;
} 