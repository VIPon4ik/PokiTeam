import { IPokemonsFormValues } from "./pokemonFormProps.type";

export interface TeamContainerProps {
  team: string[],
  user: IPokemonsFormValues | null,
}