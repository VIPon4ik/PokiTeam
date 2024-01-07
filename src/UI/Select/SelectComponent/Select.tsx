import React, { useState, useEffect, FC } from "react";
import Option from "../../Option/OptionComponent/Option";
import styles from './Select.module.scss';
import { InformationCircleIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { SelectProps } from "../types/select.type";
import { OptionType } from "../../Option/types/option.type";

const Select: FC<SelectProps> = ({ label, options, selectedOptions, setSelectedOptions, error, maxSelectedOptions }) => {
  const [filter, setFilter] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptions = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (isSelectedOptionsLengthIsMax) {
      return;
    }

    setShowOptions(state => !state);
  }

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleRemove = (option: OptionType, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedOptions((state: OptionType[]) => state.filter((opt: OptionType) => opt !== option));
  }

  const handleSelect = async (option: OptionType) => {
    await setSelectedOptions((state: OptionType[]) => [...state, option]);
  };

  const filteredOptions = options.filter((option: OptionType) => option.name.toLowerCase().includes(filter.toLowerCase())).filter((option) => !selectedOptions.includes(option))

  const isSelectedOptionsLengthIsMax = selectedOptions.length === maxSelectedOptions;

  useEffect(() => {
    if (isSelectedOptionsLengthIsMax) {
      setShowOptions(false);
    }
  }, [selectedOptions])

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <p className={styles.labelText}>{label} <InformationCircleIcon className={styles.labelIcon} /></p>
        <div className={clsx(styles.inputContainer, error && styles.errorInput)}>
          {selectedOptions.map((option: OptionType) => (
            <button key={option.name} onClick={(e) => handleRemove(option, e)} className={styles.badge}>
              {option.name}
              <XMarkIcon className={styles.badgeIcon} />
            </button>
          ))}
          {!isSelectedOptionsLengthIsMax && <input
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
      <ul className={clsx(styles.optionList, showOptions && !isSelectedOptionsLengthIsMax && styles.withBorder)}>
        {showOptions && !isSelectedOptionsLengthIsMax && filteredOptions.map((option, index) => (
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
