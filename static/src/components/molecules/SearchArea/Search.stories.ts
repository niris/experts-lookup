import type { Meta, StoryObj } from '@storybook/react';
import SearchArea  from './SearchArea';


const meta = {
    title: 'Example/Search',
    component: SearchArea,
    tags: ['autodocs'],
    argTypes: {
    },
  } satisfies Meta<typeof SearchArea>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Defaut:Story = {

  }

