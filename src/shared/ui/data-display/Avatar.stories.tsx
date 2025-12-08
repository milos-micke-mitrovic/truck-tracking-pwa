import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { User } from 'lucide-react';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    alt: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    alt: 'User avatar',
  },
};

export const WithInitials: Story = {
  args: {
    alt: 'John Doe',
    size: 'lg',
  },
};

export const WithFallbackIcon: Story = {
  args: {
    fallback: <User size={24} />,
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar size="xs" alt="XS" />
      <Avatar size="sm" alt="SM" />
      <Avatar size="md" alt="MD" />
      <Avatar size="lg" alt="LG" />
      <Avatar size="xl" alt="XL" />
    </div>
  ),
};

export const SizesWithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar size="xs" src="https://i.pravatar.cc/150?u=1" alt="User" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=2" alt="User" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=3" alt="User" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=4" alt="User" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?u=5" alt="User" />
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <div style={{ marginLeft: '0' }}>
        <Avatar src="https://i.pravatar.cc/150?u=1" alt="User 1" />
      </div>
      <div style={{ marginLeft: '-12px' }}>
        <Avatar src="https://i.pravatar.cc/150?u=2" alt="User 2" />
      </div>
      <div style={{ marginLeft: '-12px' }}>
        <Avatar src="https://i.pravatar.cc/150?u=3" alt="User 3" />
      </div>
      <div style={{ marginLeft: '-12px' }}>
        <Avatar alt="+5" />
      </div>
    </div>
  ),
};
