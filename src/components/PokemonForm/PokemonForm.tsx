import React, { FC, useEffect, useState } from 'react'
import styles from './PokemonForm.module.scss'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Select from '../Select/Select'
import { fetchPokemons, fetchPokemonsTeam } from '../../api/pokemonApi'
import { useForm } from 'react-hook-form'
import TeamContainer from '../TeamContainer/TeamContainer'

interface ModalFormProps {
  title: string,
}

const ModalForm: FC<ModalFormProps> = ({ title }) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState<Object[]>([]);
  const [pokemonTeam, setPokemonTeam] = useState([]);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const isSelectedPokemonsLengthFour = selectedPokemons.length === 4;

  const onError = () => {
    if (!isSelectedPokemonsLengthFour) {
      setError('You need to choose 4 pokemons')
    }
  }

  const resetForm = () => {
    setSelectedPokemons([]);
    setError(null);
    reset();
  }

  const onSubmit = async (data: any) => {
    if (!isSelectedPokemonsLengthFour) {
      setError('You need to choose 4 pokemons')
      return;
    }

    const responses: any = await fetchPokemonsTeam(selectedPokemons);
    setPokemonTeam(responses);
    setUser({...data});
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

  const validationPattern = {
    minLength: { value: 2, message: 'Minimum length 2 letters'},
    maxLength: { value: 12, message: 'Max length 12 letters'},
    required: { value: true, message: 'This field is required' }, pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Only characters from a-z and A-Z are accepted.',
    },
  }

  console.log(user);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)} >
      <h1 className={styles.title}>{title}</h1>
      <Input register={register("name", validationPattern)} label='Name' error={errors.name}></Input>
      <Input register={register("surname", validationPattern)} label='Surname' error={errors.surname}></Input>
      <Select label='Choose Pokemons' options={pokemons} selectedOptions={selectedPokemons} setSelectedOptions={setSelectedPokemons} error={selectedPokemons.length !== 4 && error} />
      <TeamContainer team={pokemonTeam} user={user}/>
      <Button />
    </form >
  )
}

export default ModalForm
