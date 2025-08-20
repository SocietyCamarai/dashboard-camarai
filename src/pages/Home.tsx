import React, { useState } from 'react';
import { Header, FiltersAndExport, Table, StockAlert, SalesChart, TeamRanking, ReservationsChart, DonutChart, MonthlyIncomeChart, CostBreakdown, mockStockItems, mockOrderData, mockTeamMembers, mockDonutData, mockCostBreakdownData, ChartStats2 } from '../components';
import ChartStats from '../components/home/blocks/ChartStats';
import { useAuth } from '../hooks/useAuth';
import type { ChartPeriod } from '../types/components/charts';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('horas' as ChartPeriod);

  const handleDateRangeChange = (range: string) => {
    // Aquí se manejaría el cambio de rango de fechas
    console.log('Date range changed:', range);
  };

  const handlePeriodChange = (period: ChartPeriod) => {
    setChartPeriod(period);
  };

  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <Header title={`Buenos días, ${user?.nombre || 'Usuario'}!`} />
      </div>
      <FiltersAndExport
        onDateRangeChange={handleDateRangeChange}
      />
      <ChartStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Table />
        </div>
        <StockAlert items={mockStockItems} />
      </div>
      <div className="mb-6">
        <SalesChart
          data={mockOrderData}
          period={chartPeriod}
          onPeriodChange={handlePeriodChange}
        />
      </div>
      <div className="mb-6">
        <ChartStats2 />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ReservationsChart />
        <TeamRanking members={mockTeamMembers} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <DonutChart data={mockDonutData} title="Aforo Ambientes" />
        <MonthlyIncomeChart />
        <CostBreakdown data={mockCostBreakdownData} />
      </div>
    </div>
  );
};

export default Home; 
