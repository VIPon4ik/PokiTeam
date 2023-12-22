import React, { FC } from 'react'
import styles from './Input.module.scss'
import { EnvelopeIcon } from '@heroicons/react/24/solid'

interface InputProps {
  children?: string,
}

const Input: FC<InputProps> = ({ children }) => {
  return (
    <label className={styles.label}>
      {children}
      <input className={styles.input} type='text' placeholder={children} />
      <p className={styles.error}>This information is required</p>
      <EnvelopeIcon className={styles.icon}/>
    </label>
  )
}

export default Input
