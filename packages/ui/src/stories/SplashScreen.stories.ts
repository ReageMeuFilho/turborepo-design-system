import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplashScreen } from '../splash-screen';

const meta = {
  title: 'Example/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      disable: true, // Disable Storybook's background so our black background shows
    },
  },
  tags: ['autodocs'],
  argTypes: {
    time: {
      control: 'text',
      description: 'The current time to display in the status bar',
    },
    showLoading: {
      control: 'boolean',
      description: 'Whether to show the loading indicator',
    },
  },
} satisfies Meta<typeof SplashScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    time: '9:41',
    showLoading: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const CustomTime: Story = {
  args: {
    time: '12:34',
    showLoading: true,
  },
};

export const WithoutLoading: Story = {
  args: {
    time: '9:41',
    showLoading: false,
  },
};

