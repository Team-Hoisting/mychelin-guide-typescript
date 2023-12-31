import axios from 'axios';
import COMMENTS_FETCH_SIZE from '../constants/commentsFetchSize';

const url = `/api/comments`;

const fetchComments =
  (storeId: string, pageParam = 1) =>
  async () => {
    const url = `/api/comments/${storeId}?page=${pageParam}&page_size=${COMMENTS_FETCH_SIZE}`;

    const { data } = await axios.get(url);

    return data;
  };

const postComment =
  ({ storeId, content, email }: { storeId: string; content: string; email: string }) =>
  async () => {
    await axios.post(url, { storeId, email, content });
  };

export { fetchComments, postComment };
