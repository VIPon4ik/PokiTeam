import React, { FC } from "react";
import styles from './Option.module.scss';

interface Pokemon {
  name: string;
}

interface OptionProps {
  pokemon: Pokemon;
  handleSelect: (pokemon: Pokemon) => void;
}

const Option: FC<OptionProps> = ({ pokemon, handleSelect }) => {
    return (
        <li className={styles.optionItem} onClick={() => handleSelect(pokemon)}>
            <p className={styles.optionText}>{pokemon.name}</p>
        </li>
    );
};

export default Option;
