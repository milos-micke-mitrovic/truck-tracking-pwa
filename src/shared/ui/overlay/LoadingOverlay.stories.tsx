import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { LoadingOverlay } from './LoadingOverlay';
import { Button } from '../buttons';

const meta: Meta<typeof LoadingOverlay> = {
  title: 'Overlay/LoadingOverlay',
  component: LoadingOverlay,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: {
      control: 'text',
    },
    duration: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

const LoadingDemo = ({ message, duration }: { message?: string; duration?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    if (!duration) {
      setTimeout(() => setIsOpen(false), 2000);
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>Show Loading</Button>
      <LoadingOverlay
        isOpen={isOpen}
        message={message}
        duration={duration}
        onDidDismiss={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <LoadingDemo />,
};

export const WithMessage: Story = {
  render: () => <LoadingDemo message="Please wait..." />,
};

export const CustomMessage: Story = {
  render: () => <LoadingDemo message="Saving your changes..." />,
};

export const WithDuration: Story = {
  render: () => <LoadingDemo message="Auto-dismisses in 3 seconds" duration={3000} />,
};
