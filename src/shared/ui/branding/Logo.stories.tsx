import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Branding/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    alt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo size="xs" />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>xs (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="sm" />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>sm (32px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="md" />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>md (48px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="lg" />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>lg (64px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="xl" />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>xl (96px)</p>
      </div>
    </div>
  ),
};
