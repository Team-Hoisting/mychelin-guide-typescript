import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CommentsTextArea, Comment, Pagination } from './index';
import { COMMENTS_FETCH_SIZE } from '../../constants/index';
import { useCommentsMutation, useComments } from '../../hooks/index.js';
import { CommentType } from 'hooks/useCommentsMutation';

const CommentsContainer = styled.div`
  font-size: 18px;
  width: 100%;
  min-width: 1000px;
  height: 800px;
`;

const Label = styled.label`
  font-weight: 800;
`;

interface CommentsDataType {
  data: CommentType[];
  totalPages: number;
}

const CommentsList = () => {
  const { storeId } = useParams();
  const [currentPage, setCurrentPage] = React.useState(1);
  const { addComment, deleteComment } = useCommentsMutation({ storeId, currentPage });

  const { data } = useComments({ storeId, currentPage });
  const { data: commentsData, totalPages }: CommentsDataType = data;

  return (
    <CommentsContainer>
      <Label>댓글</Label>
      <Divider my="sm" />
      <CommentsTextArea addComment={addComment} setCurrentPage={setCurrentPage} />
      {commentsData?.map((commentData, idx) => (
        <Comment
          key={commentData.commentId}
          commentData={commentData}
          deleteComment={deleteComment}
          hasBorder={idx !== COMMENTS_FETCH_SIZE - 1}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        commentsData={commentsData}
        totalPages={totalPages}
      />
    </CommentsContainer>
  );
};

export default CommentsList;
