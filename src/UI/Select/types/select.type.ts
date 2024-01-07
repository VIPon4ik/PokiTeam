import { OptionType } from "../../Option/types/option.type";

export interface SelectProps {
  label: string;
  options: OptionType[];
  selectedOptions: OptionType[];
  setSelectedOptions: Function;
  error: string | null;
  maxSelectedOptions: number;
}