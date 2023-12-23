import { OptFields } from "./option.type";

export interface SelectProps {
  label: string,
  options: Array<OptFields>,
  selectedOptions: Array<OptFields> | any,
  setSelectedOptions: Function,
  error?: any,
}