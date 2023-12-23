interface UserProps {
  name: string,
  surname: string,
}

export interface TeamContainer {
  team: Array<string>,
  user: UserProps,
}