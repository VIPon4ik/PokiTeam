import React, { FC } from 'react'
import styles from './Input.module.scss'
import { EnvelopeIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import { InputProps } from '../../types/input.type'

const Input: FC<InputProps> = ({ label }) => {
  return (
    <label className={styles.label}>
      <p className={styles.labelText}>{label} <InformationCircleIcon className={styles.labelIcon} /></p>
      <input className={styles.input} type='text' placeholder={label} />
      <p className={styles.error}>This information is required</p>
      <EnvelopeIcon className={styles.inputIcon}/>
    </label>
  )
}

export default Input
