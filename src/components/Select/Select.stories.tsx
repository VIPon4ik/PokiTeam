import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import Select from './Select';

const defaultValues = [{ name: 'Pikachu', url: '' },
  { name: 'Charmeleon', url: '' },
  { name: 'Wartortle', url: '' },
  { name: 'Venusaur', url: '' },
  { name: 'Bulbasaur', url: ''},
]

const selectedOptions = [{ name: 'Raichu', url: '' }, { name: 'Mew', url: '' }]

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const SelectWithState: React.FC<any> = ({ selectedOptions, ...props }) => {
  const [selectedOptionsTest, setSelectedOptionsTest] = useState<any[]>([]);
  
  useEffect(() => {
    if (selectedOptions) {
      setSelectedOptionsTest(selectedOptions);
    }
  } ,[])

  return (
    <Select
      {...props}
      selectedOptions={selectedOptionsTest}
      setSelectedOptions={setSelectedOptionsTest}
    />
  );
};

export const Default: Story = {
  args: {
    label: 'Choose Pokemons',
    options: defaultValues,
  },
  render: (args) => <SelectWithState {...args}/>
}

export const Focus: Story = {
  args: {
    label: 'Choose Pokemons',
    options: defaultValues,
  },
  render: (args) => <SelectWithState {...args}/>,
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
    selectedOptions,
    error: 'You need to choose 4 pokemons',
  },
  render: (args) => <SelectWithState {...args}/>,
}