import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const startIndex =
  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }, (_, i) => (
        <PageNumberBtn
          key={i}
          onClick={() => handlePageChange(i + 1)}
          // active={currentPage === i + 1}
        >
          {i + 1}
        </PageNumberBtn>
      ))}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div``;

const PageNumberBtn = styled.button``;

export default Pagination;
