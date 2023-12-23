import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import styles from './Select.module.scss';

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
  }
}

export const Hover: Story = {
  args: {
    label: 'Choose Pokemons',
    options: defaultValues,
    selectedOptions: [],
  }
}

Hover.parameters = { pseudo: { focus: true }}