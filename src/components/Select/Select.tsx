import React, { useState, useEffect, FC } from "react";
import Option from "../Option/Option";
import styles from './Select.module.scss';
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface OptionProps {
  name: string;
}

interface SelectProps {
  label: string,
  options: Array<any>,
}

const Select: FC<SelectProps> = ({ label, options }) => {
  const [selectedOptions, setSelectedOptions] = useState<Object[]>([]);
  const [filter, setFilter] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptions = () => {
    setShowOptions(state => !state);
  }

  const handleChangeFilter = (e: any) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleRemove = (option: Object, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedOptions(state => state.filter(opt => opt !== option));
  }

  const handleSelect = (option: Object) => {
    setSelectedOptions((state) => [...state, option]);
  };

  const filteredOptions =  options.filter((option: OptionProps) => option.name.includes(filter.toLowerCase())).filter((option) => !selectedOptions.includes(option))

  const isSelectedOptionsLengthFour = selectedOptions.length !== 4;

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <p className={styles.labelText}>{label} <InformationCircleIcon className={styles.labelIcon} /></p>
        <div className={styles.inputContainer} onClick={handleShowOptions}>
          <div className={styles.badgeContainer}>
            {selectedOptions.map((option: any) => (
              <button key={option.name} onClick={(e) => handleRemove(option, e)} className={styles.badge}>
                {option.name}
                <XMarkIcon className={styles.badgeIcon} />
              </button>
            ))}
          </div>
          {isSelectedOptionsLengthFour && <input
            className={styles.input}
            onChange={handleChangeFilter}
            type="text"
            placeholder={label}
            value={filter}
          />}
        </div>
      </label>
      <ul className={clsx(styles.optionList, showOptions && isSelectedOptionsLengthFour && styles.withBorder)}>
        {showOptions && isSelectedOptionsLengthFour && filteredOptions.map((option, index) => (
          <Option
            key={index}
            option={option}
            handleSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default Select;
