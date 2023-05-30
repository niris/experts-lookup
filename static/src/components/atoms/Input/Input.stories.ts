import type { Meta, StoryObj } from '@storybook/react';
import {Input} from './Input';

const meta = {
    title: 'Example/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {inputType:{control:'type'}
    },
  } satisfies Meta<typeof Input>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;


  export const Search: Story = {
    args:{
        isEditable: true,
        inputType: 'search',
    },
  };

  export const Text: Story = {
    args:{
        inputType:'text',
    },
  };


  export const Date: Story = {
    args:{
        inputType:'date',
    },
  };


  export const Submit: Story = {
    args:{
        inputType:'submit',
    },
  };