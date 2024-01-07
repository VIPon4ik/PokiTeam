import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './PokemonForm.module.scss'
import Input from '../../../../UI/Input/InputComponent/Input'
import Button from '../../../../UI/Button/Button'
import Select from '../../../../UI/Select/SelectComponent/Select'
import TeamContainer from '../TeamContainer/TeamContainer'
import { fetchPokemons, fetchPokemonsTeam } from '../../../Pokemon/api/pokemonApi'
import { useForm, useWatch, SubmitHandler } from 'react-hook-form'
import { PokemonFormProps, IPokemonsFormValues, Pokemon } from '../../types/pokemon.type'
import { validationSchema } from '../../../Pokemon/const/validationSchema'

const maxSelectedPokemons = 4;

export const PokemonForm: FC<PokemonFormProps> = ({ title }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTeam, setPokemonTeam] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IPokemonsFormValues | null>(null);
  // Свой патерн посмотреть написать
  const { register, handleSubmit, reset, formState: { errors }, setValue, control } = useForm<IPokemonsFormValues>({ defaultValues: { name: '', surname: '', selectedPokemons: [] } });

  const selectedPokemons = useWatch({ name: 'selectedPokemons', control })

  const isSelectedPokemonsLengthFour = selectedPokemons.length === maxSelectedPokemons;

  const onError = () => {
    if (!isSelectedPokemonsLengthFour) {
      setError(`You need to choose ${maxSelectedPokemons} pokemons`)
    }
  }

  const resetForm = () => {
    setError(null);
    reset();
  }

  const onSubmit: SubmitHandler<IPokemonsFormValues> = async (data) => {
    if (!isSelectedPokemonsLengthFour) {
      setError(`You need to choose ${maxSelectedPokemons} pokemons`)
      return;
    }

    const responses: string[] = await fetchPokemonsTeam(selectedPokemons);
    setPokemonTeam(responses);
    setUser({ ...data });
    resetForm();
  }

  const fetchData = async () => {
    try {
      const data = await fetchPokemons();
      setPokemons(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isSelectedPokemonsLengthFour) {
      setError(null);
    }
  }, [selectedPokemons])

  // Винести в UI
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)} >
      <h1 className={styles.title}>{title}</h1>
      <Input register={register("name", validationSchema)} label='Name' error={errors.name?.message}></Input>
      <Input register={register("surname", validationSchema)} label='Surname' error={errors.surname?.message}></Input>
      <Select label='Choose Pokemons' options={pokemons} selectedOptions={selectedPokemons} setSelectedOptions={(pokemon: Pokemon[]) => setValue('selectedPokemons', pokemon)} error={error} maxSelectedOptions={maxSelectedPokemons} />
      <TeamContainer team={pokemonTeam} user={user} />
      <Button />
    </form >
  )
}
