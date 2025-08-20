
import { useTheme } from '../../hooks/useTheme';

interface InventarioPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function InventarioPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}: InventarioPaginationProps) {
  const { currentTheme } = useTheme();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages > 1 ? getVisiblePages() : [];

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return (
      <div 
        style={{
          backgroundColor: currentTheme.colors.background,
          borderColor: currentTheme.colors.border
        }}
        className="flex items-center justify-between px-4 py-3 border-t sm:px-6"
      >
        <div className="flex-1 flex justify-between sm:hidden">
          <span 
            style={{ color: currentTheme.colors.text }}
            className="text-sm"
          >
            Mostrando {totalItems} de {totalItems} productos
          </span>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p 
              style={{ color: currentTheme.colors.text }}
              className="text-sm"
            >
              Mostrando <span className="font-medium">{totalItems}</span> de{' '}
              <span className="font-medium">{totalItems}</span> productos
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 

      className="flex items-center justify-between py-3"
    >
      {/* Mobile view */}
      <div className="flex-1 flex justify-between items-center sm:hidden gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.border,
            color: currentTheme.colors.text
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          Anterior
        </button>
        <span 
          style={{ color: currentTheme.colors.text }}
          className="text-sm flex items-center font-medium"
        >
          {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.border,
            color: currentTheme.colors.text
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          Siguiente
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p 
            style={{ color: currentTheme.colors.text }}
            className="text-sm font-light"
          >
            Mostrando <span className="font-medium">{startItem}</span> a{' '}
            <span className="font-medium">{endItem}</span> de{' '}
            <span className="font-medium">{totalItems}</span> productos
          </p>
        </div>
        <div>
          <nav className="flex items-center gap-2" aria-label="Pagination">
            {/* Previous button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={{
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.textSecondary
              }}
              className="relative inline-flex items-center justify-center h-8 w-8 rounded-lg border text-sm font-medium hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <span className="sr-only">Anterior</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Page numbers */}
            {visiblePages.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`dots-${index}`}
                    style={{
                      color: currentTheme.colors.text
                    }}
                    className="inline-flex items-center h-10 w-10 text-sm font-medium"
                  >
                    ...
                  </span>
                );
              }

              const isCurrentPage = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  style={{
                    backgroundColor: isCurrentPage ? currentTheme.colors.primary : currentTheme.colors.background,
                    borderColor: isCurrentPage ? currentTheme.colors.primary : currentTheme.colors.border,
                    color: isCurrentPage ? ('#ffffff') : currentTheme.colors.textSecondary
                  }}
                  className={`inline-flex items-center justify-center h-8 w-8 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    isCurrentPage ? 'shadow-md' : 'hover:opacity-80 hover:scale-105'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.textSecondary
              }}
              className="relative inline-flex items-center justify-center h-8 w-8 rounded-lg border text-sm font-medium hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <span className="sr-only">Siguiente</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}