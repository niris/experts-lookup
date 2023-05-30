import type { Meta, StoryObj } from '@storybook/react';
import {Tag} from './Tag';

const meta = {
  title: 'Example/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Language: Story = {
    args: {
      tagType: 'language',
      tagValue: 'example'
    },
};

export const Concept: Story = {
    args: {
      tagType: 'concept',
      tagValue: 'example'
    },
};

export const Search: Story = {
    args: {
      tagType: 'search',
      tagValue: 'example'
    },
};

