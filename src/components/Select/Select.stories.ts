import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const defaultValues = [{ name: 'Pikachu', url: '' },
  { name: 'Charmeleon', url: '' },
  { name: 'Wartortle', url: '' },
  { name: 'Venusaur', url: '' }
]

const selectedOptions:any = [];

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose Pokemons',
    options: defaultValues,
    selectedOptions,
  },
}

export const Focus: Story = {
  args: {
    label: 'Choose Pokemons',
    options: defaultValues,
    selectedOptions: [],
  },
  parameters: {
    pseudo: {
      focusWithin: true,
    },
  },
};

export const Validation: Story = {
  args: {
    label: 'Choose Pokemons',
    options: defaultValues,
    selectedOptions: [],
    error: 'This field is required',
  },
}