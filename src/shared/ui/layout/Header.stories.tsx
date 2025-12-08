import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { IconButton } from '../buttons';
import { Menu, Bell, Settings, ArrowLeft } from 'lucide-react';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'Page Title',
  },
};

export const WithMenuButton: Story = {
  args: {
    title: 'Home',
    leftContent: <IconButton icon={<Menu size={24} />} aria-label="Open menu" />,
  },
};

export const WithBackButton: Story = {
  args: {
    title: 'Settings',
    leftContent: <IconButton icon={<ArrowLeft size={24} />} aria-label="Go back" />,
  },
};

export const WithRightContent: Story = {
  args: {
    title: 'Dashboard',
    rightContent: <IconButton icon={<Bell size={24} />} aria-label="Notifications" />,
  },
};

export const WithBothSides: Story = {
  args: {
    title: 'Profile',
    leftContent: <IconButton icon={<ArrowLeft size={24} />} aria-label="Go back" />,
    rightContent: <IconButton icon={<Settings size={24} />} aria-label="Settings" />,
  },
};

export const WithMultipleRightIcons: Story = {
  args: {
    title: 'Messages',
    leftContent: <IconButton icon={<Menu size={24} />} aria-label="Open menu" />,
    rightContent: (
      <>
        <IconButton icon={<Bell size={24} />} aria-label="Notifications" />
        <IconButton icon={<Settings size={24} />} aria-label="Settings" />
      </>
    ),
  },
};
