import React, { useState, useMemo } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
}

// Change the generic constraint to allow any object, not just those with id
function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className = '',
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig || !sortConfig.key) return data;
    
    const sortColumn = columns.find(col => col.key === sortConfig.key);
    if (!sortColumn?.dataIndex || !sortColumn.sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn.dataIndex as keyof T];
      const bValue = b[sortColumn.dataIndex as keyof T];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, columns]);

  const handleSort = (key: string) => {
    const column = columns.find(col => col.key === key);
    if (!column?.sortable || !column.dataIndex) return;
    
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(data);
      onRowSelect?.(data);
    } else {
      setSelectedRows([]);
      onRowSelect?.([]);
    }
  };

  const handleSelectRow = (row: T, event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedRows: T[];
    if (event.target.checked) {
      newSelectedRows = [...selectedRows, row];
    } else {
      newSelectedRows = selectedRows.filter(selectedRow => 
        // Use a more generic approach for row comparison
        JSON.stringify(selectedRow) !== JSON.stringify(row)
      );
    }
    
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const isRowSelected = (row: T) => {
    return selectedRows.some(selectedRow => 
      JSON.stringify(selectedRow) === JSON.stringify(row)
    );
  };

  const isAllSelected = data.length > 0 && selectedRows.length === data.length;

  if (loading) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              {selectable && (
                <th className="border border-gray-200 p-3 bg-gray-50 w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    disabled
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className="border border-gray-200 p-3 bg-gray-50 text-left"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(rowIndex => (
              <tr key={rowIndex}>
                {selectable && (
                  <td className="border border-gray-200 p-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      disabled
                    />
                  </td>
                )}
                {columns.map(column => (
                  <td key={column.key} className="border border-gray-200 p-3">
                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-gray-500 text-lg">No data available</div>
        <div className="text-gray-400 text-sm">There are no records to display</div>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {selectable && (
              <th className="border border-gray-200 p-3 bg-gray-50 w-12">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                className={`border border-gray-200 p-3 bg-gray-50 text-left ${
                  column.sortable && column.dataIndex ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => column.sortable && column.dataIndex && handleSort(column.key)}
              >
                <div className="flex items-center justify-between">
                  {column.title}
                  {column.sortable && column.dataIndex && (
                    <span className="ml-2">
                      {sortConfig?.key === column.key && (
                        sortConfig.direction === 'ascending' ? '↑' : '↓'
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-50 ${
                isRowSelected(row) ? 'bg-blue-50' : ''
              }`}
            >
              {selectable && (
                <td className="border border-gray-200 p-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={isRowSelected(row)}
                    onChange={(e) => handleSelectRow(row, e)}
                    aria-label={`Select row ${rowIndex + 1}`}
                  />
                </td>
              )}
              {columns.map(column => (
                <td key={`${column.key}-${rowIndex}`} className="border border-gray-200 p-3">
                  {column.render
                    ? column.render(
                        column.dataIndex ? (row as any)[column.dataIndex] : null,
                        row,
                        rowIndex
                      )
                    : column.dataIndex
                    ? String((row as any)[column.dataIndex] || '')
                    : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;