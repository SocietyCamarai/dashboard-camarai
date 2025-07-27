import React from 'react';
import { Header, FiltersAndExport, Table } from '../components';

const Comandas: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <Header title="Comandas" />
      </div>
      <div className="flex flex-col gap-4">
        <FiltersAndExport />
        <Table />
      </div>
    </div>
  );
};

export default Comandas; 