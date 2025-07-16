import React from 'react';
import { Header, FiltersAndExport } from '../components';
import ChartStats from '../components/home/blocks/ChartStats';
const Home: React.FC = () => {
  const handleDateRangeChange = (range: string) => {
    console.log('Date range changed:', range);
  };

  // const handleExportCSV = () => {
  //   console.log('Exporting CSV...');
  // };

  // const handleExportXLS = () => {
  //   console.log('Exporting XLS...');
  // };

  // const handleExportPDF = () => {
  //   console.log('Exporting PDF...');
  // };

  return (
    <div className="w-full h-full">
      <Header title="Buenos días, Fenixsadas!" />
      <FiltersAndExport 
        onDateRangeChange={handleDateRangeChange}
        // onExportCSV={handleExportCSV}
        // onExportXLS={handleExportXLS}
        // onExportPDF={handleExportPDF}
      />
      <ChartStats />
    </div>
  );
};

export default Home; 