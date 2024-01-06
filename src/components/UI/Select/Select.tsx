import React, { useState, useEffect, FC } from "react";
import Option from "../Option/Option";
import styles from './Select.module.scss';
import { InformationCircleIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { SelectProps } from "../../../types/select.type";
import { OptFields } from "../../../types/option.type";

// Cделать еще более рюзабельним (maxSelectedOptions)
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

  const handleChangeFilter = (e: any) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleRemove = (option: Object, e: any) => {
    e.preventDefault();
    setSelectedOptions((state: any) => state.filter((opt: any) => opt !== option));
  }

  const handleSelect = async (option: OptFields) => {
    await setSelectedOptions((state: any) => [...state, option]);
  };

  const filteredOptions = options.filter((option: OptFields) => option.name.toLowerCase().includes(filter.toLowerCase())).filter((option) => !selectedOptions.includes(option))

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
