import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../buttons';
import { Inbox, Search, FileX, WifiOff, MapPin, Bell } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '350px', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No data available',
    description: 'There is nothing to display at the moment.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Inbox size={48} />,
    title: 'No messages',
    description: 'Your inbox is empty. Messages will appear here.',
  },
};

export const WithAction: Story = {
  args: {
    icon: <FileX size={48} />,
    title: 'No files found',
    description: 'Upload your first file to get started.',
    action: <Button>Upload File</Button>,
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: <Search size={48} />,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you are looking for.',
    action: <Button variant="outline">Clear Search</Button>,
  },
};

export const OfflineState: Story = {
  args: {
    icon: <WifiOff size={48} />,
    title: 'You are offline',
    description: 'Please check your internet connection and try again.',
    action: <Button>Retry</Button>,
  },
};

export const NoLocation: Story = {
  args: {
    icon: <MapPin size={48} />,
    title: 'Location not available',
    description: 'Enable location services to see nearby deliveries.',
    action: <Button>Enable Location</Button>,
  },
};

export const NoNotifications: Story = {
  args: {
    icon: <Bell size={48} />,
    title: 'No notifications',
    description: 'You are all caught up! Check back later for updates.',
  },
};

export const WithMultipleActions: Story = {
  args: {
    icon: <Inbox size={48} />,
    title: 'Get started',
    description: 'Choose how you want to begin.',
    action: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="outline">Learn More</Button>
        <Button>Get Started</Button>
      </div>
    ),
  },
};
