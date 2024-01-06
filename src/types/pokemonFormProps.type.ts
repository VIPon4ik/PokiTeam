export interface PokemonFormProps {
  title: string,
}

export interface IPokemonsFormValues {
  name: string,
  surname: string,
  selectedPokemons: string[],
}

export interface Pokemon {
  name: string;
  url:string;
} 