import React, { FC } from 'react'
import styles from './TeamContainer.module.scss'
import { TeamContainerProps } from '../../types/teamContainer.type'

const TeamContainer: FC<TeamContainerProps> = ({ team, user }) => {
  console.log(user);
  return (
    <div>
      {user && <p className={styles.text}>{`${user.name} ${user.surname} team:`}</p>}
      <div className={styles.teamContainer}>{team.map((img: string) => <img key={img} src={img} width={60} height={60} alt='Pokemon' />)}</div>
    </div>
  )
}

export default TeamContainer
