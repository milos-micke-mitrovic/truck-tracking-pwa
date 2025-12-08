import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Form/TimePicker',
  component: TimePicker,
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
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    label: 'Time',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Pickup Time',
    placeholder: 'Select pickup time...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Start Time',
    value: '09:30',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Appointment Time',
    helperText: 'Business hours: 9 AM - 5 PM',
  },
};

export const WithError: Story = {
  args: {
    label: 'Time',
    error: 'Please select a valid time',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TimePicker label="Default" />
      <TimePicker label="With placeholder" placeholder="Pick a time..." />
      <TimePicker label="With value" value="14:30" />
      <TimePicker label="With helper" helperText="Optional field" />
      <TimePicker label="With error" error="Time is required" />
    </div>
  ),
};
