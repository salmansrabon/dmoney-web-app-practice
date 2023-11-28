import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const maxVisibleButtons = 5; // Number of visible buttons excluding ellipses
    const pageNumbers = [];

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`btn btn-outline-secondary me-2 ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }
    } else {
      const leftEllipsis = currentPage > 2;
      const rightEllipsis = currentPage < totalPages - 1;

      if (leftEllipsis) {
        pageNumbers.push(
          <button
            key="first"
            onClick={() => onPageChange(1)}
            className="btn btn-outline-secondary me-2"
          >
            1
          </button>
        );
        if (currentPage > 3) {
          pageNumbers.push(
            <button key="leftEllipsis" className="btn btn-outline-secondary me-2" disabled>
              ...
            </button>
          );
        }
      }

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(currentPage + 1, totalPages);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`btn btn-outline-secondary me-2 ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }

      if (rightEllipsis) {
        if (currentPage < totalPages - 2) {
          pageNumbers.push(
            <button key="rightEllipsis" className="btn btn-outline-secondary me-2" disabled>
              ...
            </button>
          );
        }
        pageNumbers.push(
          <button
            key="last"
            onClick={() => onPageChange(totalPages)}
            className="btn btn-outline-secondary me-2"
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
