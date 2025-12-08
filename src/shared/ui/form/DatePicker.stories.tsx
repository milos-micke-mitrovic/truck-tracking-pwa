import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
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
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: 'Date',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Birth Date',
    placeholder: 'Select your birth date...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Start Date',
    value: '2024-03-15',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Delivery Date',
    helperText: 'Select when you want your order delivered',
  },
};

export const WithError: Story = {
  args: {
    label: 'Date',
    error: 'Please select a valid date',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Appointment Date',
    min: new Date().toISOString().split('T')[0],
    max: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    helperText: 'Select a date within the next 30 days',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DatePicker label="Default" />
      <DatePicker label="With placeholder" placeholder="Pick a date..." />
      <DatePicker label="With value" value="2024-06-20" />
      <DatePicker label="With helper" helperText="Optional field" />
      <DatePicker label="With error" error="Date is required" />
    </div>
  ),
};
