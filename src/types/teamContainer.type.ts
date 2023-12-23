interface UserProps {
  name: string,
  surname: string,
}

export interface TeamContainerProps {
  team: Array<string>,
  user: UserProps | null,
}