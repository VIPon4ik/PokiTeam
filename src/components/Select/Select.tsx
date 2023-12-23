import React, { useState, useEffect, FC } from "react";
import Option from "../Option/Option";
import styles from './Select.module.scss';
import { InformationCircleIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface OptionProps {
  name: string;
}

interface SelectProps {
  label: string,
  options: Array<any>,
  selectedOptions: Array<any>,
  setSelectedOptions: Function,
}

const Select: FC<SelectProps> = ({ label, options, selectedOptions, setSelectedOptions }) => {
  const [filter, setFilter] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptions = (e:any) => {
    e.preventDefault(); 
    setShowOptions(state => !state);
  }

  const handleChangeFilter = (e: any) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleRemove = (option: Object, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedOptions((state:any) => state.filter((opt:any) => opt !== option));
  }

  const handleSelect = (option: Object) => {
    setSelectedOptions((state:any) => [...state, option]);
  };

  const filteredOptions =  options.filter((option: OptionProps) => option.name.includes(filter.toLowerCase())).filter((option) => !selectedOptions.includes(option))

  const isSelectedOptionsLengthFour = selectedOptions.length === 4;

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <p className={styles.labelText}>{label} <InformationCircleIcon className={styles.labelIcon} /></p>
        <div className={styles.inputContainer}>
          <div className={styles.badgeContainer}>
            {selectedOptions.map((option: any) => (
              <button key={option.name} onClick={(e) => handleRemove(option, e)} className={styles.badge}>
                {option.name}
                <XMarkIcon className={styles.badgeIcon} />
              </button>
            ))}
          </div>
          {!isSelectedOptionsLengthFour && <input
            className={clsx(styles.input, selectedOptions.length === 0 && styles.inputFull)}
            onChange={handleChangeFilter}
            type="text"
            placeholder={selectedOptions.length === 0 && label}
            value={filter}
          />}
          <ChevronDownIcon className={styles.inputIcon} onClick={handleShowOptions}/>
        </div>
      </label>
      <ul className={clsx(styles.optionList, showOptions && !isSelectedOptionsLengthFour && styles.withBorder)}>
        {showOptions && !isSelectedOptionsLengthFour && filteredOptions.map((option, index) => (
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
