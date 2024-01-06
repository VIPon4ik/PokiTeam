import React, { FC } from 'react'
import styles from './Input.module.scss'
import { EnvelopeIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import { InputProps } from '../../../types/input.type'
import clsx from 'clsx'

const Input: FC<InputProps> = ({ label, register, error }) => {
  return (
    <label className={styles.label}>
      <p className={styles.labelText}>{label} <InformationCircleIcon className={styles.labelIcon} /></p>
      <input {...register} className={clsx(styles.input, error && styles.errorInput)} type='text' placeholder={label} />
      {error && <p className={styles.errorText}>{error.message}</p>}
      <EnvelopeIcon className={clsx(styles.inputIcon, error && styles.errorIcon)}/>
    </label>
  )
}

export default Input
