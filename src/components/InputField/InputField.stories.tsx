import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: "We'll never share your email with anyone else.",
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    errorMessage: 'Please enter a valid email address',
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    disabled: true,
    value: 'user@example.com',
  },
};

export const FilledVariant: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    variant: 'filled',
  },
};

export const GhostVariant: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    variant: 'ghost',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small input...',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large input...',
    size: 'lg',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    showClearButton: true,
    value: 'Initial value',
  },
};

export const PasswordWithToggle: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    showPasswordToggle: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Default Input"
        placeholder="Normal state"
      />
      <InputField
        label="Disabled Input"
        placeholder="Disabled state"
        disabled
        value="Disabled value"
      />
      <InputField
        label="Error Input"
        placeholder="Error state"
        invalid
        errorMessage="This field is required"
      />
      <InputField
        label="With Helper Text"
        placeholder="With helper text"
        helperText="This is helpful information"
      />
    </div>
  ),
};
