import React, { useState, useEffect, FC } from "react";
import Option from "../Option/Option";
import { fetchPokemons } from "../../api/pokemonApi";
import styles from './Select.module.scss';
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface Pokemon {
  name: string;
}

interface SelectProps {
  children?: React.ReactNode,
}

const Select: FC<SelectProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState<Object[]>([]);
  const [filter, setFilter] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [showPokemons, setShowPokemons] = useState(true);

  const handleChangeFilter = (e: any) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleRemove = (pokemon: Object) => {
    console.log('handleRemove')
    setSelectedPokemons((state) => state.filter(pok => pok !== pokemon));
  }

  const handleSelect = (pokemon: Object) => {
    console.log('handleSelected')
    setSelectedPokemons((state) => [...state, pokemon]);
  };

  const fetchData = async () => {
    try {
      const data = await fetchPokemons();
      setPokemons(data);
      setFilteredPokemons(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons
        .filter((pokemon: Pokemon) =>
          pokemon.name.includes(filter.toLowerCase())
        )
        .filter((pokemon) => !selectedPokemons.includes(pokemon))
    );
  }, [filter, selectedPokemons]);

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <p className={styles.labelText}>{children} <InformationCircleIcon className={styles.labelIcon} /></p>
        <div className={styles.inputContainer}>
          <div className={styles.badgeContainer}>
            {selectedPokemons.map((pokemon: any) => (
              <button key={pokemon.name} onClick={() => handleRemove(pokemon)} className={styles.badge}>
                {pokemon.name}
                <XMarkIcon className={styles.badgeIcon} />
              </button>
            ))}
          </div>
          {selectedPokemons.length !== 4 && <input
            className={styles.input}
            onChange={handleChangeFilter}
            type="text"
            placeholder="Select"
            value={filter}
          />}
        </div>
      </label>
      <ul className={clsx(styles.optionList, selectedPokemons.length !== 4 && styles.withBorder)}>
        {selectedPokemons.length !== 4 && filteredPokemons.map((pokemon, index) => (
          <Option
            key={index}
            pokemon={pokemon}
            handleSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default Select;
