import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-2 p-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'} rounded`}
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`mx-1 p-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-2 p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'} rounded`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
