import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
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
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Location tracking',
    helperText: 'Allow the app to track your location in the background',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Premium feature',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Always enabled',
    checked: true,
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Default switch" />
      <Switch label="Checked switch" checked />
      <Switch label="With helper text" helperText="Additional information here" />
      <Switch label="Disabled switch" disabled />
      <Switch label="Disabled checked" checked disabled />
    </div>
  ),
};
