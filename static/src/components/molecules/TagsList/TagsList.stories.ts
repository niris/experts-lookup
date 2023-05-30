import type { Meta, StoryObj } from '@storybook/react';
import {TagsList} from './TagsList';

const meta = {
  title: 'Example/TagsList',
  component: TagsList,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof TagsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Language: Story = {
    args: {
      tagType: 'language',
      tags:["example1","example2"]
    },
};

export const Concept: Story = {
    args: {
      tagType: 'concept',
      tags:["example1","example2"]
    },
};

export const Search: Story = {
    args: {
      tagType: 'search',
      tags:["example1","example2"]
    },
};

