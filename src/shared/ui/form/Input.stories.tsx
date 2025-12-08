import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search, User, Phone, DollarSign, Lock } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'user@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="Enter email" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="Enter number" />
      <Input label="Phone" type="tel" placeholder="Enter phone number" />
    </div>
  ),
};

export const WithStartIcon: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    startIcon: <Mail size={20} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    endIcon: <Search size={20} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
    startIcon: <DollarSign size={20} />,
  },
};

export const IconVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input label="Username" placeholder="Enter username" startIcon={<User size={20} />} />
      <Input label="Email" type="email" placeholder="Enter email" startIcon={<Mail size={20} />} />
      <Input label="Phone" type="tel" placeholder="Enter phone" startIcon={<Phone size={20} />} />
      <Input label="Search" placeholder="Search..." endIcon={<Search size={20} />} />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        startIcon={<Lock size={20} />}
      />
    </div>
  ),
};
