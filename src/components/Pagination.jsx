import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </button>
      <span>{currentPage}</span>
      <span>/</span>
      <span>{totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
