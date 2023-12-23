import React, { FC } from "react";
import styles from './Option.module.scss';
import { OptionProps } from "../../types/option.type";

const Option: FC<OptionProps> = ({ option, handleSelect }) => {
  return (
    <li className={styles.optionItem} onClick={() => handleSelect(option)}>
      <p className={styles.optionText}>{option.name}</p>
    </li>
  );
};

export default Option;
