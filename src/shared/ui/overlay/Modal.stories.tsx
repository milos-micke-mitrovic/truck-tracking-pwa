import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../buttons';
import { Input } from '../form';

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
    },
    showCloseButton: {
      control: 'boolean',
    },
    fullscreen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = ({
  title,
  showCloseButton,
  fullscreen,
  initialBreakpoint,
  breakpoints,
  children,
}: {
  title?: string;
  showCloseButton?: boolean;
  fullscreen?: boolean;
  initialBreakpoint?: number;
  breakpoints?: number[];
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        showCloseButton={showCloseButton}
        fullscreen={fullscreen}
        initialBreakpoint={initialBreakpoint}
        breakpoints={breakpoints}
      >
        {children || (
          <div style={{ padding: '16px' }}>
            <p>This is the modal content.</p>
            <p>You can put any content here.</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalDemo title="Modal Title" />,
};

export const WithoutTitle: Story = {
  render: () => (
    <ModalDemo>
      <div style={{ padding: '16px' }}>
        <p>This modal has no title bar.</p>
      </div>
    </ModalDemo>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => <ModalDemo title="No Close Button" showCloseButton={false} />,
};

export const WithForm: Story = {
  render: () => (
    <ModalDemo title="Edit Profile">
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </ModalDemo>
  ),
};

export const BottomSheet: Story = {
  render: () => (
    <ModalDemo title="Options" initialBreakpoint={0.5} breakpoints={[0, 0.5, 0.75, 1]}>
      <div style={{ padding: '16px' }}>
        <p>This is a bottom sheet modal.</p>
        <p>Drag to resize or dismiss.</p>
      </div>
    </ModalDemo>
  ),
};

export const Fullscreen: Story = {
  render: () => (
    <ModalDemo title="Fullscreen Modal" fullscreen>
      <div style={{ padding: '16px' }}>
        <p>This modal takes up the full screen.</p>
        <p>Good for complex forms or detailed content.</p>
      </div>
    </ModalDemo>
  ),
};
