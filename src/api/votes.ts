import axios from 'axios';

const url = `/api/votes`;

const fetchVotes = async () => {
  const response = await axios.get(`${url}`);

  return response.data;
};

const fetchVotesByNickname = nickname => async () => {
  const response = await axios.get(`${url}/${nickname}`);

  return response.data;
};

// 구 모달 api
const fetchPrevStore = (nickname, categoryCode) => async () => {
  const response = await axios.get(`${url}/${nickname}/${categoryCode}`);

  return response.data;
};

const vote = async voteInfo => {
  const response = await axios.post(url, voteInfo);

  return response.data;
};

const reVote = async voteInfo => {
  const { storeId, nickname, categoryCode, votedAt, storeInfo } = voteInfo;

  const response = await axios.patch(`${url}/${nickname}/${categoryCode}`, { storeId, votedAt, storeInfo });

  return response.data;
};

const removeVote = async (nickname, categoryCode) => {
  const response = await axios.delete(`${url}/${nickname}/${categoryCode}`);

  return response.data;
};

const fetchCategorySelectorData =
  ({ storeId, nickname, categoryCode }) =>
  async () => {
    const response = await axios.get(`${url}/${storeId}/${nickname}/${categoryCode}`);

    return response.data;
  };

export { fetchVotes, fetchVotesByNickname, fetchPrevStore, vote, reVote, removeVote, fetchCategorySelectorData };
