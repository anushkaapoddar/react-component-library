import { render, screen, fireEvent } from '@testing-library/react';
import DataTable, { Column } from './DataTable';

interface TestData {
  id: number;
  name: string;
  value: number;
}

const testData: TestData[] = [
  { id: 1, name: 'Item 1', value: 100 },
  { id: 2, name: 'Item 2', value: 200 },
  { id: 3, name: 'Item 3', value: 300 },
];

const columns: Column<TestData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'value', title: 'Value', dataIndex: 'value', sortable: true },
];

describe('DataTable', () => {
  test('renders table with data', () => {
    render(<DataTable data={testData} columns={columns} />);
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={columns} loading />);
    
    // Should show loading skeleton rows
    expect(screen.getAllByRole('row')).toHaveLength(5); // header + 3 loaders + empty row
  });

  test('shows empty state', () => {
    render(<DataTable data={[]} columns={columns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.getByText('There are no records to display')).toBeInTheDocument();
  });

  test('handles row selection', () => {
    const handleSelect = jest.fn();
    render(
      <DataTable
        data={testData}
        columns={columns}
        selectable
        onRowSelect={handleSelect}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4); // select all + 3 rows
    
    fireEvent.click(checkboxes[1]); // first row
    expect(handleSelect).toHaveBeenCalledWith([testData[0]]);
  });

  test('handles select all', () => {
    const handleSelect = jest.fn();
    render(
      <DataTable
        data={testData}
        columns={columns}
        selectable
        onRowSelect={handleSelect}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    
    fireEvent.click(selectAllCheckbox);
    expect(handleSelect).toHaveBeenCalledWith(testData);
    
    fireEvent.click(selectAllCheckbox);
    expect(handleSelect).toHaveBeenCalledWith([]);
  });

  test('sorts columns when clicked', () => {
    render(<DataTable data={testData} columns={columns} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    const dataCells = screen.getAllByRole('cell');
    expect(['Item 1', 'Item 2', 'Item 3']).toContain(dataCells[0].textContent);
  });

  test('does not sort non-sortable columns', () => {
    const nonSortableColumns: Column<TestData>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: false },
      { key: 'value', title: 'Value', dataIndex: 'value', sortable: false },
    ];
    
    render(<DataTable data={testData} columns={nonSortableColumns} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    const dataCells = screen.getAllByRole('cell');
    expect(dataCells[0]).toHaveTextContent('Item 1');
  });

  test('renders custom columns without dataIndex', () => {
    const customColumns: Column<TestData>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { 
        key: 'actions', 
        title: 'Actions', 
        render: (_value: any, record: TestData) => (
          <button>Edit {record.name}</button>
        ),
      },
    ];
    
    render(<DataTable data={testData} columns={customColumns} />);
    
    expect(screen.getByText('Edit Item 1')).toBeInTheDocument();
    expect(screen.getByText('Edit Item 2')).toBeInTheDocument();
    expect(screen.getByText('Edit Item 3')).toBeInTheDocument();
  });

  test('does not sort custom columns without dataIndex', () => {
    const customColumns: Column<TestData>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { 
        key: 'actions', 
        title: 'Actions', 
        sortable: true, // should be ignored since no dataIndex
        render: (_value: any, record: TestData) => (
          <button>Edit {record.name}</button>
        ),
      },
    ];
    
    render(<DataTable data={testData} columns={customColumns} />);
    
    const actionsHeader = screen.getByText('Actions');
    fireEvent.click(actionsHeader);
    
    const dataCells = screen.getAllByRole('cell');
    expect(dataCells[0]).toHaveTextContent('Item 1'); // no sorting applied
  });
});
