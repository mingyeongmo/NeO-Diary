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

  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }, (_, i) => (
        <PageNumberBtn
          key={i}
          onClick={() => handlePageChange(i + 1)}
          active={currentPage === i + 1}
        >
          {i + 1}
        </PageNumberBtn>
      ))}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
`;

const PageNumberBtn = styled.button<{ active: boolean }>`
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  color: ${({ active }) => (active ? "white" : "#000000")};
  background: ${({ active }) => (active ? "#9990ff" : "white")};

  border: ${({ active }) => (active ? "none" : "1px solid #f0f0f0")};
  border-radius: 5px;
`;

export default Pagination;
