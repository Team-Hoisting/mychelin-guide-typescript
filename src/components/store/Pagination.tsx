import React from 'react';
import styled from 'styled-components';
import { Button, rem } from '@mantine/core';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { COMMENTS_FETCH_SIZE } from '../../constants/index';
import { CommentType } from '../../hooks/useCommentsMutation';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  commentsData: CommentType[];
  totalPages: number;
}

const Pagination = ({ currentPage, setCurrentPage, commentsData, totalPages }: PaginationProps) => {
  const page = Math.ceil(currentPage / COMMENTS_FETCH_SIZE);
  const startIndex = (page - 1) * COMMENTS_FETCH_SIZE;
  const endIndex = startIndex + +COMMENTS_FETCH_SIZE;

  const currentPages = Array.from(
    { length: totalPages < 5 ? totalPages : endIndex - startIndex },
    (_, i) => startIndex + 1 + i
  );

  const handlePageBtnClick = (page: number) => () => {
    setCurrentPage(page);
  };

  const handlePrevBtnClick = () => {
    setCurrentPage(startIndex);
  };

  const handleNextBtnClick = () => {
    setCurrentPage(endIndex + 1);
  };

  return (
    <ButtonContainer>
      <ButtonGroup>
        <Button
          variant="subtle"
          onClick={handlePrevBtnClick}
          color="gray"
          styles={theme => ({
            root: {
              visibility: commentsData?.length > 0 && page !== 1 ? 'visible' : 'hidden',
              '&:hover': { backgroundColor: 'var(--button-hover-color);' },
              border: 0,
              height: rem(42),
            },
          })}>
          <SlArrowLeft style={{ width: '14px', strokeWidth: '50' }} />
        </Button>
        {currentPages.map(pageNum => (
          <Button
            variant="subtle"
            color="gray"
            key={pageNum}
            onClick={handlePageBtnClick(pageNum)}
            styles={theme => ({
              root: {
                backgroundColor: pageNum === currentPage ? 'var(--button-click-color);' : 'var(--bg-color);',
                '&:hover': {
                  backgroundColor:
                    pageNum === currentPage ? 'var(--button-click-color);' : 'var(--button-hover-color);',
                },
                color: 'var(--font-color)',
                visibility: pageNum <= totalPages ? 'visible' : 'hidden',
                border: 0,
                height: rem(42),
              },
            })}>
            {pageNum}
          </Button>
        ))}
        <Button
          onClick={handleNextBtnClick}
          variant="subtle"
          color="gray"
          styles={theme => ({
            root: {
              visibility:
                commentsData?.length > 0 && page !== Math.ceil(totalPages / COMMENTS_FETCH_SIZE) ? 'visible' : 'hidden',
              '&:hover': { backgroundColor: 'var(--button-hover-color);' },
              border: 0,
              height: rem(42),
            },
          })}>
          <SlArrowRight style={{ width: '14px', strokeWidth: '50' }} />
        </Button>
      </ButtonGroup>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  width: 100%;
  margin: 24px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 30%;
  margin: 0 auto;
  justify-content: center;
`;

export default Pagination;
