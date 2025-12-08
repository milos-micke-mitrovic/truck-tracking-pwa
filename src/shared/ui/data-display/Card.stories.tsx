import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../buttons';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is the card content. It can contain any elements.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title header.',
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle with additional info',
    children: 'This card has both a title and subtitle in the header.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Action Card',
    subtitle: 'This card has an action button',
    children: (
      <div>
        <p style={{ marginBottom: '16px' }}>Some content that describes what this card is about.</p>
        <Button>Take Action</Button>
      </div>
    ),
  },
};

export const InfoCard: Story = {
  args: {
    title: 'Getting Started',
    subtitle: 'Welcome to the app',
    children: (
      <div>
        <p style={{ marginBottom: '8px' }}>Here are some tips to help you get started:</p>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li>Explore the dashboard</li>
          <li>Set up your profile</li>
          <li>Configure notifications</li>
        </ul>
      </div>
    ),
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card title="First Card">Content of the first card.</Card>
      <Card title="Second Card">Content of the second card.</Card>
      <Card title="Third Card">Content of the third card.</Card>
    </div>
  ),
};
