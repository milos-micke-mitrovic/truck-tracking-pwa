import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
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
    variant: {
      control: 'select',
      options: ['default', 'thick'],
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Thick: Story = {
  args: {
    variant: 'thick',
  },
};

export const InContent: Story = {
  render: () => (
    <div>
      <p style={{ margin: '16px 0' }}>Content above the divider</p>
      <Divider />
      <p style={{ margin: '16px 0' }}>Content below the divider</p>
    </div>
  ),
};

export const SectionDivider: Story = {
  render: () => (
    <div>
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: 0 }}>Section 1</h3>
        <p>Some content in section 1</p>
      </div>
      <Divider variant="thick" />
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: 0 }}>Section 2</h3>
        <p>Some content in section 2</p>
      </div>
      <Divider variant="thick" />
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: 0 }}>Section 3</h3>
        <p>Some content in section 3</p>
      </div>
    </div>
  ),
};

export const BothVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Default</p>
        <Divider variant="default" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Thick</p>
        <Divider variant="thick" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '60px' }}>
      <span>Left</span>
      <Divider direction="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const VerticalThick: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '60px' }}>
      <span>Left</span>
      <Divider direction="vertical" variant="thick" />
      <span>Right</span>
    </div>
  ),
};

export const VerticalInToolbar: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        height: '48px',
      }}
    >
      <button style={{ padding: '8px' }}>Action 1</button>
      <button style={{ padding: '8px' }}>Action 2</button>
      <Divider direction="vertical" />
      <button style={{ padding: '8px' }}>Action 3</button>
      <button style={{ padding: '8px' }}>Action 4</button>
    </div>
  ),
};
