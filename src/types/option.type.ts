export interface OptFields {
  name: string;
  url: string,
}

export interface OptionProps {
  option: OptFields;
  handleSelect: (option: OptFields) => void;
}