import React, { FC, useEffect, useState } from 'react'
import styles from './PokemonForm.module.scss'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Select from '../Select/Select'
import { fetchPokemons, fetchPokemonsTeam } from '../../api/pokemonApi'

interface ModalFormProps {
  title: string,
}

const ModalForm: FC<ModalFormProps> = ({ title }) => {
  const [pokemons, setPokemons] = useState([]);

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
  

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>{title}</h1>
      <Input label='First name'></Input>
      <Input label='Second name'></Input>
      <Select label='Choose Pokemon' options={pokemons} />
      <Button />
    </form>
  )
}

export default ModalForm
