import React, { FC } from 'react'
import styles from './TeamContainer.module.scss'

interface TeamContainer {
  team: any,
  user: any,
}

const TeamContainer: FC<TeamContainer> = ({ team, user }) => {
  return (
    <div>
      {user && <p className={styles.text}>{`${user.name} ${user.surname} team:`}</p>}
      <div className={styles.teamContainer}>{team.map((img: string) => <img key={img} src={img} width={60} height={60} alt='Pokemon' />)}</div>
    </div>
  )
}

export default TeamContainer
