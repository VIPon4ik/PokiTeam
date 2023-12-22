import React, { FC } from "react";
import styles from './Option.module.scss';

interface Pokemon {
  name: string;
}

interface OptionProps {
  option: Pokemon;
  handleSelect: (pokemon: Pokemon) => void;
}

const Option: FC<OptionProps> = ({ option, handleSelect }) => {
    return (
        <li className={styles.optionItem} onClick={() => handleSelect(option)}>
            <p className={styles.optionText}>{option.name}</p>
        </li>
    );
};

export default Option;
