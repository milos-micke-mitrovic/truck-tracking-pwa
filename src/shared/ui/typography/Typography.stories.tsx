import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text, Label, Caption, Overline, TextLink, InlineCode } from './Typography';

const meta: Meta = {
  title: 'Typography/Typography',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ),
};

export const HeadingColors: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Heading level={3} color="primary">
        Primary Heading
      </Heading>
      <Heading level={3} color="secondary">
        Secondary Heading
      </Heading>
      <Heading level={3} color="success">
        Success Heading
      </Heading>
      <Heading level={3} color="warning">
        Warning Heading
      </Heading>
      <Heading level={3} color="danger">
        Danger Heading
      </Heading>
    </div>
  ),
};

export const TextSizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <Text size="lg">Large text - Lorem ipsum dolor sit amet consectetur.</Text>
      <Text size="base">Base text - Lorem ipsum dolor sit amet consectetur.</Text>
      <Text size="sm">Small text - Lorem ipsum dolor sit amet consectetur.</Text>
      <Text size="xs">Extra small text - Lorem ipsum dolor sit amet consectetur.</Text>
    </div>
  ),
};

export const TextColors: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text color="primary">Primary text color</Text>
      <Text color="secondary">Secondary text color</Text>
      <Text color="tertiary">Tertiary text color</Text>
      <Text color="success">Success text color</Text>
      <Text color="warning">Warning text color</Text>
      <Text color="danger">Danger text color</Text>
      <Text color="info">Info text color</Text>
      <Text color="disabled">Disabled text color</Text>
    </div>
  ),
};

export const TextWeights: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text weight="light">Light weight text</Text>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const TextAlignment: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
    </div>
  ),
};

export const Truncation: StoryObj = {
  render: () => (
    <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Caption color="tertiary">Truncate (single line)</Caption>
        <Text truncate>
          This is a very long text that should be truncated with an ellipsis at the end.
        </Text>
      </div>
      <div>
        <Caption color="tertiary">Line clamp (2 lines)</Caption>
        <Text lineClamp={2}>
          This is a very long text that should be clamped to two lines. Any additional content will
          be hidden with an ellipsis.
        </Text>
      </div>
      <div>
        <Caption color="tertiary">Line clamp (3 lines)</Caption>
        <Text lineClamp={3}>
          This is a very long text that should be clamped to three lines. It can show more content
          than the two-line version but will still truncate after three lines.
        </Text>
      </div>
    </div>
  ),
};

export const Labels: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <input id="email" type="email" style={{ display: 'block', marginTop: '4px' }} />
      </div>
      <div>
        <Label htmlFor="password" required>
          Password
        </Label>
        <input id="password" type="password" style={{ display: 'block', marginTop: '4px' }} />
      </div>
    </div>
  ),
};

export const Captions: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Caption>Default caption text</Caption>
      <Caption color="tertiary">Tertiary caption text</Caption>
      <Caption color="success">Success caption</Caption>
      <Caption color="danger">Error caption</Caption>
    </div>
  ),
};

export const Overlines: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Overline>Category</Overline>
        <Heading level={3}>Article Title</Heading>
      </div>
      <div>
        <Overline>Section</Overline>
        <Heading level={4}>Section Title</Heading>
      </div>
    </div>
  ),
};

export const Links: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text>
        Read our <TextLink href="#">Terms of Service</TextLink> and{' '}
        <TextLink href="#">Privacy Policy</TextLink>.
      </Text>
      <Text>
        <TextLink href="https://example.com" external>
          Open external link
        </TextLink>
      </Text>
      <Text>
        <TextLink onClick={() => alert('Clicked!')}>Click action link</TextLink>
      </Text>
    </div>
  ),
};

export const Code: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text>
        Use <InlineCode>npm install</InlineCode> to install dependencies.
      </Text>
      <Text>
        The <InlineCode>useTranslation</InlineCode> hook returns a <InlineCode>t</InlineCode>{' '}
        function.
      </Text>
      <Text>
        Set <InlineCode>NODE_ENV=production</InlineCode> for production builds.
      </Text>
    </div>
  ),
};

export const CompleteExample: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Overline>Getting Started</Overline>
      <Heading level={1}>Welcome to Truck Drive</Heading>
      <Text color="secondary">
        Your reliable companion for efficient delivery management. Track routes, manage deliveries,
        and stay connected with your team.
      </Text>
      <Heading level={3}>Quick Setup</Heading>
      <Text>
        To get started, run <InlineCode>npm run dev</InlineCode> in your terminal. For more
        information, check out our <TextLink href="#">documentation</TextLink>.
      </Text>
      <Caption color="tertiary">Last updated: December 2024</Caption>
    </div>
  ),
};

export const FormExample: StoryObj = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Heading level={2}>Sign In</Heading>
      <Text color="secondary" size="sm">
        Enter your credentials to continue
      </Text>
      <div>
        <Label htmlFor="form-email" required>
          Email
        </Label>
        <input
          id="form-email"
          type="email"
          placeholder="you@example.com"
          style={{ display: 'block', marginTop: '4px', width: '100%', padding: '8px' }}
        />
      </div>
      <div>
        <Label htmlFor="form-password" required>
          Password
        </Label>
        <input
          id="form-password"
          type="password"
          placeholder="Enter password"
          style={{ display: 'block', marginTop: '4px', width: '100%', padding: '8px' }}
        />
        <Caption color="tertiary">Must be at least 8 characters</Caption>
      </div>
      <Text size="sm">
        Don't have an account? <TextLink href="#">Sign up</TextLink>
      </Text>
    </div>
  ),
};
