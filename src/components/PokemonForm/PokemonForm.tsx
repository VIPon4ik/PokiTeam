import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './PokemonForm.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import Select from '../UI/Select/Select'
import { fetchPokemons, fetchPokemonsTeam } from '../../api/pokemonApi'
import { useForm, useWatch, Control, SubmitHandler } from 'react-hook-form'
import TeamContainer from '../TeamContainer/TeamContainer'
import { PokemonFormProps, IPokemonsFormValues, Pokemon } from '../../types/pokemonFormProps.type'

// Переписать щоб було реюзабельно
const validationPattern = {
  minLength: { value: 2, message: 'Minimum length 2 letters' },
  maxLength: { value: 12, message: 'Max length 12 letters' },
  required: { value: true, message: 'This field is required' }, pattern: {
    value: /^[a-zA-Z]+$/,
    message: 'Only characters from a-z and A-Z are accepted.',
  },
}

const maxSelectedPokemons = 4;

const PokemonForm: FC<PokemonFormProps> = ({ title }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTeam, setPokemonTeam] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IPokemonsFormValues | null>(null);
  const { register, handleSubmit, reset, formState: { errors }, setValue, control } = useForm<IPokemonsFormValues>({ defaultValues: { name: '', surname: '', selectedPokemons: [] } });

  const selectedPokemons:any = useWatch({ name: 'selectedPokemons', control }) // Пропустим пока
  // console.log(selectedPokemons);

  const isSelectedPokemonsLengthFour = selectedPokemons.length === maxSelectedPokemons;

  const onError = () => {
    if (!isSelectedPokemonsLengthFour) {
      setError('You need to choose 4 pokemons')
    }
  }

  const resetForm = () => {
    setError(null);
    reset();
  }

  const onSubmit: SubmitHandler<IPokemonsFormValues> = async (data) => {
    if (!isSelectedPokemonsLengthFour) {
      setError('You need to choose 4 pokemons')
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

  // Винести в UI
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)} >
      <h1 className={styles.title}>{title}</h1>
      <Input register={register("name", validationPattern)} label='Name' error={errors.name}></Input>
      <Input register={register("surname", validationPattern)} label='Surname' error={errors.surname}></Input>
      <Select label='Choose Pokemons' options={pokemons} selectedOptions={selectedPokemons} setSelectedOptions={(pokemon: any) => setValue('selectedPokemons', pokemon)} error={selectedPokemons.length !== 4 && error} />
      <TeamContainer team={pokemonTeam} user={user} />
      <Button />
    </form >
  )
}

export default PokemonForm
