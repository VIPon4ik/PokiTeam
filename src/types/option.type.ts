export interface OptionType {
  name: string;
  url: string,
}

export interface OptionProps {
  option: OptionType;
  handleSelect: (option: OptionType) => void;
}