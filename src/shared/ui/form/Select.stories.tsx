import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
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
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const vehicleOptions = [
  { value: 'truck', label: 'Truck' },
  { value: 'van', label: 'Van' },
  { value: 'trailer', label: 'Trailer' },
  { value: 'semi', label: 'Semi-Truck' },
];

export const Default: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    label: 'Country',
    placeholder: 'Choose a country...',
    options: countryOptions,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Status',
    options: statusOptions,
    value: 'active',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Vehicle Type',
    options: vehicleOptions,
    placeholder: 'Choose your vehicle',
    helperText: 'Select the type of vehicle you are driving',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    error: 'Please select a country',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'archived', label: 'Archived', disabled: true },
    ],
    placeholder: 'Select status',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select label="Default" options={statusOptions} placeholder="Select..." />
      <Select label="With value" options={statusOptions} value="active" />
      <Select label="With helper" options={statusOptions} helperText="Choose one option" />
      <Select label="With error" options={statusOptions} error="This field is required" />
      <Select label="Disabled" options={statusOptions} value="pending" disabled />
    </div>
  ),
};
