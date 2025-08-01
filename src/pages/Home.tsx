import React from 'react';
import { Header, FiltersAndExport, Table } from '../components';
import ChartStats from '../components/home/blocks/ChartStats';
const Home: React.FC = () => {
  const handleDateRangeChange = (_range: string) => {
    // Aquí se manejaría el cambio de rango de fechas
  };

  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <Header title="Buenos días, Fenix! <3" /> 
      </div>
      <FiltersAndExport 
        onDateRangeChange={handleDateRangeChange}
      />
      <ChartStats />
      <Table />
    </div>
  );
};

export default Home; 