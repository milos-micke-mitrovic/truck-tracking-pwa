import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fab } from './Fab';
import { Plus, Edit, Navigation, Phone } from 'lucide-react';
import { IonContent, IonPage, IonFab, IonFabButton } from '@ionic/react';

const meta: Meta<typeof Fab> = {
  title: 'Layout/Fab',
  component: Fab,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-left'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fab>;

const FabContainer = ({ children }: { children: React.ReactNode }) => (
  <IonPage>
    <IonContent>
      <div style={{ padding: '16px' }}>
        <h2>Page Content</h2>
        <p>Scroll down to see more content...</p>
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} style={{ marginTop: '16px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
      {children}
    </IonContent>
  </IonPage>
);

export const Default: Story = {
  render: () => (
    <FabContainer>
      <Fab icon={<Plus size={24} />} aria-label="Add" />
    </FabContainer>
  ),
};

export const BottomLeft: Story = {
  render: () => (
    <FabContainer>
      <Fab icon={<Plus size={24} />} aria-label="Add" position="bottom-left" />
    </FabContainer>
  ),
};

export const BottomCenter: Story = {
  render: () => (
    <FabContainer>
      <Fab icon={<Plus size={24} />} aria-label="Add" position="bottom-center" />
    </FabContainer>
  ),
};

export const TopRight: Story = {
  render: () => (
    <FabContainer>
      <Fab icon={<Edit size={24} />} aria-label="Edit" position="top-right" />
    </FabContainer>
  ),
};

export const Colors: Story = {
  render: () => (
    <IonPage>
      <IonContent>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            padding: '16px',
            justifyContent: 'center',
            marginTop: '100px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <IonFab style={{ position: 'relative' }}>
              <IonFabButton color="primary">
                <Plus size={24} />
              </IonFabButton>
            </IonFab>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Primary</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IonFab style={{ position: 'relative' }}>
              <IonFabButton color="secondary">
                <Edit size={24} />
              </IonFabButton>
            </IonFab>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Secondary</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IonFab style={{ position: 'relative' }}>
              <IonFabButton color="success">
                <Navigation size={24} />
              </IonFabButton>
            </IonFab>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Success</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IonFab style={{ position: 'relative' }}>
              <IonFabButton color="danger">
                <Phone size={24} />
              </IonFabButton>
            </IonFab>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Danger</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FabContainer>
      <Fab icon={<Plus size={24} />} aria-label="Add" disabled />
    </FabContainer>
  ),
};

export const NavigationFab: Story = {
  render: () => (
    <FabContainer>
      <Fab icon={<Navigation size={24} />} aria-label="Navigate" color="success" />
    </FabContainer>
  ),
};

export const CallFab: Story = {
  render: () => (
    <FabContainer>
      <Fab icon={<Phone size={24} />} aria-label="Call" color="success" position="bottom-right" />
    </FabContainer>
  ),
};
