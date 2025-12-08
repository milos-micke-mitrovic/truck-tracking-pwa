import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { Menu, Bell, Settings, Heart, Share, Trash2, Edit, Plus, X, Search } from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  title: 'Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'light', 'dark'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <Menu size={24} />,
    'aria-label': 'Menu',
  },
};

export const Small: Story = {
  args: {
    icon: <Bell size={16} />,
    'aria-label': 'Notifications',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    icon: <Settings size={32} />,
    'aria-label': 'Settings',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    icon: <Heart size={24} />,
    'aria-label': 'Like',
    disabled: true,
  },
};

export const WithColor: Story = {
  args: {
    icon: <Trash2 size={24} />,
    'aria-label': 'Delete',
    color: 'danger',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <IconButton icon={<Bell size={16} />} aria-label="Small" size="small" />
      <IconButton icon={<Bell size={24} />} aria-label="Default" size="default" />
      <IconButton icon={<Bell size={32} />} aria-label="Large" size="large" />
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <IconButton icon={<Menu size={24} />} aria-label="Menu" />
      <IconButton icon={<Bell size={24} />} aria-label="Notifications" />
      <IconButton icon={<Settings size={24} />} aria-label="Settings" />
      <IconButton icon={<Heart size={24} />} aria-label="Like" />
      <IconButton icon={<Share size={24} />} aria-label="Share" />
      <IconButton icon={<Edit size={24} />} aria-label="Edit" />
      <IconButton icon={<Trash2 size={24} />} aria-label="Delete" />
      <IconButton icon={<Plus size={24} />} aria-label="Add" />
      <IconButton icon={<X size={24} />} aria-label="Close" />
      <IconButton icon={<Search size={24} />} aria-label="Search" />
    </div>
  ),
};
