import React from 'react'
import styles from './Modal.module.scss'
import Input from '../Input/Input'

const ModalForm = () => {
  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Pokemon Team</h1>
      <Input>First name</Input>
      <Input>Second name</Input>
    </form>
  )
}

export default ModalForm
