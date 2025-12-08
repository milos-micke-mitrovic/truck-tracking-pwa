import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem } from './List';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Settings, User, Bell, Lock, HelpCircle } from 'lucide-react';

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
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
    inset: {
      control: 'boolean',
    },
    lines: {
      control: 'select',
      options: ['full', 'inset', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: () => (
    <List>
      <ListItem title="Item 1" />
      <ListItem title="Item 2" />
      <ListItem title="Item 3" />
    </List>
  ),
};

export const WithSubtitles: Story = {
  render: () => (
    <List>
      <ListItem title="John Doe" subtitle="Software Engineer" />
      <ListItem title="Jane Smith" subtitle="Product Manager" />
      <ListItem title="Bob Johnson" subtitle="Designer" />
    </List>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <List>
      <ListItem title="Profile" startContent={<User size={20} />} showChevron href="#" />
      <ListItem title="Notifications" startContent={<Bell size={20} />} showChevron href="#" />
      <ListItem title="Privacy" startContent={<Lock size={20} />} showChevron href="#" />
      <ListItem title="Settings" startContent={<Settings size={20} />} showChevron href="#" />
      <ListItem title="Help" startContent={<HelpCircle size={20} />} showChevron href="#" />
    </List>
  ),
};

export const WithAvatars: Story = {
  render: () => (
    <List>
      <ListItem
        title="John Doe"
        subtitle="Online"
        startContent={<Avatar src="https://i.pravatar.cc/150?u=1" alt="John" size="sm" />}
        showChevron
        href="#"
      />
      <ListItem
        title="Jane Smith"
        subtitle="Away"
        startContent={<Avatar src="https://i.pravatar.cc/150?u=2" alt="Jane" size="sm" />}
        showChevron
        href="#"
      />
      <ListItem
        title="Bob Johnson"
        subtitle="Offline"
        startContent={<Avatar src="https://i.pravatar.cc/150?u=3" alt="Bob" size="sm" />}
        showChevron
        href="#"
      />
    </List>
  ),
};

export const WithEndContent: Story = {
  render: () => (
    <List>
      <ListItem
        title="Messages"
        subtitle="3 unread"
        endContent={<Badge variant="danger">3</Badge>}
      />
      <ListItem
        title="Notifications"
        subtitle="12 new"
        endContent={<Badge variant="info">12</Badge>}
      />
      <ListItem
        title="Updates"
        subtitle="Available"
        endContent={<Badge variant="success">New</Badge>}
      />
    </List>
  ),
};

export const WithNote: Story = {
  render: () => (
    <List>
      <ListItem title="Battery" note="85%" />
      <ListItem title="Storage" note="45 GB free" />
      <ListItem title="Data Usage" note="2.3 GB" />
    </List>
  ),
};

export const Inset: Story = {
  render: () => (
    <List inset>
      <ListItem title="Inset Item 1" showChevron href="#" />
      <ListItem title="Inset Item 2" showChevron href="#" />
      <ListItem title="Inset Item 3" showChevron href="#" />
    </List>
  ),
};

export const NoLines: Story = {
  render: () => (
    <List lines="none">
      <ListItem title="No Lines Item 1" />
      <ListItem title="No Lines Item 2" />
      <ListItem title="No Lines Item 3" />
    </List>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <List>
      <ListItem title="Enabled Item" showChevron href="#" />
      <ListItem title="Disabled Item" disabled showChevron href="#" />
      <ListItem title="Another Enabled Item" showChevron href="#" />
    </List>
  ),
};

export const SettingsExample: Story = {
  render: () => (
    <List>
      <ListItem
        title="Account"
        subtitle="Manage your account settings"
        startContent={<User size={20} />}
        showChevron
        href="#"
      />
      <ListItem
        title="Notifications"
        subtitle="Configure push notifications"
        startContent={<Bell size={20} />}
        showChevron
        href="#"
      />
      <ListItem
        title="Privacy"
        subtitle="Control your privacy settings"
        startContent={<Lock size={20} />}
        showChevron
        href="#"
      />
      <ListItem
        title="Help & Support"
        subtitle="Get help or contact support"
        startContent={<HelpCircle size={20} />}
        showChevron
        href="#"
      />
    </List>
  ),
};
