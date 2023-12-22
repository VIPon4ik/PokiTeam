import React, { FC } from 'react'
import styles from './Input.module.scss'
import { EnvelopeIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

interface InputProps {
  children?: string,
}

const Input: FC<InputProps> = ({ children }) => {
  return (
    <label className={styles.label}>
      <p className={styles.labelText}>{children} <InformationCircleIcon className={styles.labelIcon} /></p>
      <input className={styles.input} type='text' placeholder={children} />
      <p className={styles.error}>This information is required</p>
      <EnvelopeIcon className={styles.inputIcon}/>
    </label>
  )
}

export default Input
