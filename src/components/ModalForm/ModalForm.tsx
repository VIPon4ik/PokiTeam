import React, { FC } from 'react'
import styles from './Modal.module.scss'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Select from '../Select/Select'

interface ModalFormProps {
  title: string,
  options: Array<any>,
}

const ModalForm: FC<ModalFormProps> = ({ title, options }) => {
  return (
    <form className={styles.form}>
      <h1 className={styles.title}>{title}</h1>
      <Input>First name</Input>
      <Input>Second name</Input>
      <Select label='Choose Pokemon' options={options} />
      <Button />
    </form>
  )
}

export default ModalForm
