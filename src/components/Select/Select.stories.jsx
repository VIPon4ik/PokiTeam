import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const defaultValues = [{ name: 'Pikachu', url: '' },
  { name: 'Charmeleon', url: '' },
  { name: 'Wartortle', url: '' },
  { name: 'Venusaur', url: '' }
]

const selectedOptions = [];

const addFunc = (option:any) => {
  selectedOptions.push(option);
}

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose Pokemons',
    options: defaultValues,
    selectedOptions,
    setSelectedOptions: addFunc,
  }
}

export const Hover: Story = {
  args: {
    label: 'Choose Pokemons',
    options: defaultValues,
    selectedOptions: [],
  }
}