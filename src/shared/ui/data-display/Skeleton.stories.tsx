import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, SkeletonGroup } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Data Display/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 100,
  },
};

export const TextLines: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <SkeletonGroup count={4} gap={8} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '16px',
        border: '1px solid #eee',
        borderRadius: '8px',
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={150} />
      <div style={{ marginTop: '16px' }}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  ),
};

export const ListItemSkeleton: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 0',
            borderBottom: '1px solid #eee',
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" width="150px" />
      <Skeleton variant="text" width="100px" />
      <div style={{ width: '100%', marginTop: '16px' }}>
        <SkeletonGroup count={3} gap={12} />
      </div>
    </div>
  ),
};

export const FormSkeleton: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Skeleton variant="text" width="60px" height="14px" />
        <div style={{ marginTop: '4px' }}>
          <Skeleton variant="rectangular" width="100%" height="44px" />
        </div>
      </div>
      <div>
        <Skeleton variant="text" width="80px" height="14px" />
        <div style={{ marginTop: '4px' }}>
          <Skeleton variant="rectangular" width="100%" height="44px" />
        </div>
      </div>
      <div>
        <Skeleton variant="text" width="70px" height="14px" />
        <div style={{ marginTop: '4px' }}>
          <Skeleton variant="rectangular" width="100%" height="44px" />
        </div>
      </div>
      <div style={{ marginTop: '8px' }}>
        <Skeleton variant="rectangular" width="100%" height="44px" />
      </div>
    </div>
  ),
};
