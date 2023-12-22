import React from 'react'
import styles from './Button.module.scss'
import { StarIcon } from '@heroicons/react/24/solid'

const Button = () => {
  return (
    <button className={styles.submitButton}>
      <StarIcon className={styles.icon} /> Submit
    </button>
  )
}

export default Button
