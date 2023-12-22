import React, { FC } from "react";

interface Pokemon {
  name: string;
}

interface OptionProps {
  pokemon: Pokemon;
  handleSelect: (pokemon: Pokemon) => void;
}

const Option: FC<OptionProps> = ({ pokemon, handleSelect }) => {
    return (
        <li onClick={() => handleSelect(pokemon)} className="cursor-pointer">
            <p>{pokemon.name}</p>
        </li>
    );
};

export default Option;
