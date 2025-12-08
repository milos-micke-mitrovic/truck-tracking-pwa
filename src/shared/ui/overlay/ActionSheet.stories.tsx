import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ActionSheet } from './ActionSheet';
import { Button } from '../buttons';

const meta: Meta<typeof ActionSheet> = {
  title: 'Overlay/ActionSheet',
  component: ActionSheet,
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
  },
};

export default meta;
type Story = StoryObj<typeof ActionSheet>;

const ActionSheetDemo = ({
  header,
  subHeader,
  buttons,
}: {
  header?: string;
  subHeader?: string;
  buttons: { text: string; role?: 'cancel' | 'destructive' | 'selected' }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Show Action Sheet</Button>
      <ActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={header}
        subHeader={subHeader}
        buttons={buttons.map((btn) => ({
          ...btn,
          handler: () => {
            console.log(`${btn.text} clicked`);
          },
        }))}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ActionSheetDemo
      buttons={[{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Cancel', role: 'cancel' }]}
    />
  ),
};

export const WithHeader: Story = {
  render: () => (
    <ActionSheetDemo
      header="Select an Option"
      buttons={[{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Cancel', role: 'cancel' }]}
    />
  ),
};

export const WithSubHeader: Story = {
  render: () => (
    <ActionSheetDemo
      header="Photo Options"
      subHeader="Choose what to do with this photo"
      buttons={[
        { text: 'Share' },
        { text: 'Edit' },
        { text: 'Delete', role: 'destructive' },
        { text: 'Cancel', role: 'cancel' },
      ]}
    />
  ),
};

export const DestructiveAction: Story = {
  render: () => (
    <ActionSheetDemo
      header="Delete Item"
      subHeader="This action cannot be undone"
      buttons={[
        { text: 'Delete', role: 'destructive' },
        { text: 'Cancel', role: 'cancel' },
      ]}
    />
  ),
};

export const ShareOptions: Story = {
  render: () => (
    <ActionSheetDemo
      header="Share"
      buttons={[
        { text: 'Copy Link' },
        { text: 'Share via Email' },
        { text: 'Share via SMS' },
        { text: 'More Options' },
        { text: 'Cancel', role: 'cancel' },
      ]}
    />
  ),
};
