import React, { useState, useEffect, FC } from "react";
import Option from "../Option/Option";
import { fetchPokemons } from "../../api/pokemonApi";
import styles from './Select.module.scss';
import { InformationCircleIcon } from "@heroicons/react/24/solid";

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
  const [showPokemons, setShowPokemons] = useState(false);

  const handleChangeShow = () => {
    setShowPokemons(state => !state);
  }

  const handleChangeFilter = (e: any) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleRemove = (pokemon: Object) => {
    setSelectedPokemons(state => state.filter(pok => pok != pokemon))
  }

  const handleSelect = (pokemon: Object) => {
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

  console.log(selectedPokemons);
  return (
    <div onClick={handleChangeShow}>
      <label className={styles.label}>
        <p className={styles.labelText}>{children} <InformationCircleIcon className={styles.labelIcon} /></p>
        <div className={styles.inputContainer}>
          <div className="flex gap-1">
            {selectedPokemons.map((pokemon: any) => (
              <button key={pokemon.name} type="button" onClick={() => handleRemove(pokemon)}>{pokemon.name}</button>
            ))}
          </div>
          <input
            className="outline-none w-full"
            onChange={handleChangeFilter}
            type="text"
            placeholder="Select"
            value={filter}
            disabled={selectedPokemons.length === 4}
          />
        </div>
      </label>
      <ul className="absolute bg-slate-100 w-auto max-h-40 overflow-y-scroll">
        {showPokemons && selectedPokemons.length !== 4 && filteredPokemons.map((pokemon, index) => (
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
