import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info', 'outline'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Success: Story = {
  args: {
    children: 'Active',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Error',
    variant: 'danger',
  },
};

export const Info: Story = {
  args: {
    children: 'New',
    variant: 'info',
  },
};

export const Outline: Story = {
  args: {
    children: 'Draft',
    variant: 'outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const StatusExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Order Status:</span>
        <Badge variant="success">Delivered</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Order Status:</span>
        <Badge variant="warning">In Transit</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Order Status:</span>
        <Badge variant="danger">Cancelled</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Order Status:</span>
        <Badge variant="info">Processing</Badge>
      </div>
    </div>
  ),
};

export const NotificationCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Badge variant="danger">3</Badge>
      <Badge variant="danger">12</Badge>
      <Badge variant="danger">99+</Badge>
    </div>
  ),
};
