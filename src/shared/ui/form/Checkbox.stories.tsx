import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
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
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Remember me',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'We will send you updates about new features',
  },
};

export const WithError: Story = {
  args: {
    label: 'I accept the privacy policy',
    error: 'You must accept the privacy policy to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Unavailable option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Required option',
    checked: true,
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Default checkbox" />
      <Checkbox label="Checked checkbox" checked />
      <Checkbox label="With helper text" helperText="Additional information" />
      <Checkbox label="With error" error="This field is required" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" checked disabled />
    </div>
  ),
};
