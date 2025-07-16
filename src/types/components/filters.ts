export interface FiltersAndExportProps {
  onDateRangeChange?: (range: string) => void;
  onExportCSV?: () => void;
  onExportXLS?: () => void;
  onExportPDF?: () => void;
} 