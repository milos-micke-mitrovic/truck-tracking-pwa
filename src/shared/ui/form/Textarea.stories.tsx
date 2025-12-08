import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
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
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Notes',
    value: 'This is a sample note that spans multiple lines.\n\nIt can contain paragraphs.',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    helperText: 'Maximum 500 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Comments',
    value: 'Too short',
    error: 'Comments must be at least 20 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read-only Notes',
    value: 'This content cannot be edited',
    disabled: true,
  },
};

export const CustomRows: Story = {
  args: {
    label: 'Large Text Area',
    placeholder: 'Enter your message...',
    rows: 8,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Textarea label="Default" placeholder="Enter text..." />
      <Textarea label="With value" value="Sample text content" />
      <Textarea label="With helper" placeholder="Enter text..." helperText="Optional field" />
      <Textarea label="With error" value="Invalid" error="This field has an error" />
      <Textarea label="Disabled" value="Cannot edit" disabled />
    </div>
  ),
};
