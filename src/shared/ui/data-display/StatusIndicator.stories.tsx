import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusIndicator } from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Data Display/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
    label: {
      control: 'text',
    },
    showLabel: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

export const Online: Story = {
  args: {
    status: 'online',
  },
};

export const Offline: Story = {
  args: {
    status: 'offline',
  },
};

export const Away: Story = {
  args: {
    status: 'away',
  },
};

export const Busy: Story = {
  args: {
    status: 'busy',
  },
};

export const CustomLabel: Story = {
  args: {
    status: 'online',
    label: 'Available for calls',
  },
};

export const WithoutLabel: Story = {
  args: {
    status: 'online',
    showLabel: false,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <StatusIndicator status="online" />
      <StatusIndicator status="away" />
      <StatusIndicator status="busy" />
      <StatusIndicator status="offline" />
    </div>
  ),
};

export const DotOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <StatusIndicator status="online" showLabel={false} />
      <StatusIndicator status="away" showLabel={false} />
      <StatusIndicator status="busy" showLabel={false} />
      <StatusIndicator status="offline" showLabel={false} />
    </div>
  ),
};

export const DriverStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <StatusIndicator status="online" label="Available" />
      <StatusIndicator status="busy" label="On Delivery" />
      <StatusIndicator status="away" label="On Break" />
      <StatusIndicator status="offline" label="Off Duty" />
    </div>
  ),
};
