import { OptionType } from "./option.type";

export interface SelectProps {
  label: string;
  options: OptionType[];
  selectedOptions: OptionType[];
  setSelectedOptions: Function;
  error?: string | null | boolean;
  maxSelectedOptions: number;
}