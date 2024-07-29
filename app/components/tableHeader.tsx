"use client";
import { FC } from 'react';

interface TableHeaderProps {
  fieldsConfig: { [key: string]: any };
  sortColumn: string;
  sortOrder: string;
  onSort: (column: string) => void;
}

const TableHeader: FC<TableHeaderProps> = ({ fieldsConfig, sortColumn, sortOrder, onSort }) => (
  <thead>
    <tr>
      {Object.keys(fieldsConfig).map((key) => {
        const column = fieldsConfig[key];
        return (
          <th
            key={column.field}
            className={`p-4 text-gray-900 ${column.className} cursor-pointer hover:text-blue-600`}
            onClick={() => onSort(column.field)}
          >
            {column.label}
            {sortColumn === column.field && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
          </th>
        );
      })}
    </tr>
  </thead>
);

export default TableHeader; 