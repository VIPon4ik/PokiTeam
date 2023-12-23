interface ErrorObject {
  type: string;
  message: string;
  ref: Node;
}

export interface InputProps {
  label: string,
  register: Object,
  error: ErrorObject | any,
}