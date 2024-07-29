"use client";

import { FC } from 'react';
import { CryptoUIModel } from '../@types/uiModel';

interface TableBodyProps {
  data: CryptoUIModel[];
  fieldsConfig: { [key: string]: any };
  handleFavorite: (id: string) => void;
  favorites: string[];
}

const TableBody: FC<TableBodyProps> = ({ data, fieldsConfig, handleFavorite, favorites }) => (
  <tbody>
    {data.map((crypto) => (
      <tr key={crypto.id}>
        {Object.keys(fieldsConfig).map((key) => {
          const column = fieldsConfig[key];
          return (
            <td key={column.field} className={column.className}>
              {column.formatter(crypto, handleFavorite, favorites)}
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
);

export default TableBody;
