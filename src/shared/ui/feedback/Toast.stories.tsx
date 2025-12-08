import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toast } from './Toast';
import { Button } from '../buttons';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    position: {
      control: 'select',
      options: ['top', 'middle', 'bottom'],
    },
    duration: {
      control: 'number',
    },
    message: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastDemo = ({
  variant,
  message,
  position,
}: {
  variant: 'success' | 'error' | 'warning' | 'info';
  message: string;
  position?: 'top' | 'middle' | 'bottom';
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Show {variant} toast</Button>
      <Toast
        isOpen={isOpen}
        message={message}
        variant={variant}
        position={position}
        onDidDismiss={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Success: Story = {
  render: () => <ToastDemo variant="success" message="Operation completed successfully!" />,
};

export const Error: Story = {
  render: () => <ToastDemo variant="error" message="Something went wrong. Please try again." />,
};

export const Warning: Story = {
  render: () => (
    <ToastDemo variant="warning" message="Please review your input before continuing." />
  ),
};

export const Info: Story = {
  render: () => <ToastDemo variant="info" message="New updates are available." />,
};

export const TopPosition: Story = {
  render: () => <ToastDemo variant="info" message="This toast appears at the top" position="top" />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <ToastDemo variant="success" message="Success message" />
      <ToastDemo variant="error" message="Error message" />
      <ToastDemo variant="warning" message="Warning message" />
      <ToastDemo variant="info" message="Info message" />
    </div>
  ),
};
