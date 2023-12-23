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
  error: any,
}

const Select: FC<SelectProps> = ({ label, options, selectedOptions, setSelectedOptions, error }) => {
  const [filter, setFilter] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptions = (e: any) => {
    e.preventDefault();
    if (isSelectedOptionsLengthFour) {
      return;
    }

    setShowOptions(state => !state);
  }

  console.log(showOptions);

  const handleChangeFilter = (e: any) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleRemove = (option: Object, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedOptions((state: any) => state.filter((opt: any) => opt !== option));
  }

  const handleSelect = async (option: Object) => {
    await setSelectedOptions((state: any) => [...state, option]);
  };

  const filteredOptions = options.filter((option: OptionProps) => option.name.includes(filter.toLowerCase())).filter((option) => !selectedOptions.includes(option))

  const isSelectedOptionsLengthFour = selectedOptions.length === 4;

  useEffect(() => {
    if (isSelectedOptionsLengthFour) {
      setShowOptions(false);
    }
  }, [selectedOptions])

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <p className={styles.labelText}>{label} <InformationCircleIcon className={styles.labelIcon} /></p>
        <div className={clsx(styles.inputContainer, error && styles.errorInput)}>
          {selectedOptions.map((option: any) => (
            <button key={option.name} onClick={(e) => handleRemove(option, e)} className={styles.badge}>
              {option.name}
              <XMarkIcon className={styles.badgeIcon} />
            </button>
          ))}
          {!isSelectedOptionsLengthFour && <input
            className={styles.input}
            onChange={handleChangeFilter}
            type="text"
            placeholder={selectedOptions.length === 0 ? label : undefined}
            value={filter}
          />}
          <ChevronDownIcon className={styles.inputIcon} onClick={handleShowOptions} />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </label>
      <ul className={clsx(styles.optionList, showOptions && !isSelectedOptionsLengthFour && styles.withBorder, selectedOptions.length >= 3 && styles.optionSecondPosition)}>
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
