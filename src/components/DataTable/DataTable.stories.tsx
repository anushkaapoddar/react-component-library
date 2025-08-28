import type { Meta, StoryObj } from '@storybook/react';
import DataTable, { Column } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const userData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active' },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status', 
    sortable: true,
    render: (value: string) => (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
];

// Add this default export - Storybook needs this
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta; // This is the missing default export!

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: userData,
    columns: columns,
  },
};

export const Selectable: Story = {
  args: {
    data: userData,
    columns: columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
    loading: false,
  },
};

export const WithCustomRender: Story = {
  args: {
    data: userData,
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
      { 
        key: 'actions', 
        title: 'Actions', 
        render: (_value: any, record: User) => (
          <div className="space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
              Edit
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
              Delete
            </button>
          </div>
        ),
      },
    ],
  },
};

export const AllFeatures: Story = {
  args: {
    data: userData,
    columns: columns,
    selectable: true,
  },
};