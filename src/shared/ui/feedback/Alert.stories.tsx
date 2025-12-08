import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Alert } from './Alert';
import { Button } from '../buttons';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    header: {
      control: 'text',
    },
    subHeader: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const AlertDemo = ({
  header,
  subHeader,
  message,
  buttons,
}: {
  header?: string;
  subHeader?: string;
  message: string;
  buttons?: { text: string; role?: 'cancel' | 'destructive' }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Show Alert</Button>
      <Alert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={header}
        subHeader={subHeader}
        message={message}
        buttons={buttons}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <AlertDemo message="This is a simple alert message." />,
};

export const WithHeader: Story = {
  render: () => <AlertDemo header="Alert Title" message="This alert has a header." />,
};

export const WithSubHeader: Story = {
  render: () => (
    <AlertDemo
      header="Confirm Action"
      subHeader="Please review"
      message="Are you sure you want to proceed with this action?"
    />
  ),
};

export const ConfirmDialog: Story = {
  render: () => (
    <AlertDemo
      header="Confirm Delete"
      message="Are you sure you want to delete this item? This action cannot be undone."
      buttons={[
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'destructive' },
      ]}
    />
  ),
};

export const MultipleButtons: Story = {
  render: () => (
    <AlertDemo
      header="Save Changes?"
      message="You have unsaved changes. What would you like to do?"
      buttons={[
        { text: 'Discard', role: 'destructive' },
        { text: 'Cancel', role: 'cancel' },
        { text: 'Save' },
      ]}
    />
  ),
};
