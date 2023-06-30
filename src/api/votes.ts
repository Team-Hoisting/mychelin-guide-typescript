import axios from 'axios';
import { StoreType } from 'components/searchmap/types';
import { CategoryCode, StoreDataType } from 'types';

const url = `/api/votes`;

const fetchVotes = async () => {
  const response = await axios.get(`${url}`);

  return response.data;
};

const fetchVotesByNickname = (nickname: string) => async () => {
  const response = await axios.get(`${url}/${nickname}`);

  return response.data;
};

const fetchPrevStore = (nickname: string, categoryCode: CategoryCode) => async () => {
  const response = await axios.get(`${url}/${nickname}/${categoryCode}`);

  return response.data;
};

type VoteInfo = {
  storeId: string;
  email?: string;
  nickname?: string;
  categoryCode: CategoryCode;
  votedAt: number;
  storeInfo: StoreType;
};

const vote = async (voteInfo: VoteInfo) => {
  const response = await axios.post(url, voteInfo);

  return response.data;
};

const reVote = async (voteInfo: VoteInfo) => {
  const { storeId, nickname, categoryCode, votedAt, storeInfo } = voteInfo;

  const response = await axios.patch(`${url}/${nickname}/${categoryCode}`, { storeId, votedAt, storeInfo });

  return response.data;
};

const removeVote = async (nickname: string, categoryCode: CategoryCode) => {
  const response = await axios.delete(`${url}/${nickname}/${categoryCode}`);

  return response.data;
};

const fetchCategorySelectorData =
  ({ storeId, nickname, categoryCode }: { storeId: string; nickname: string; categoryCode: CategoryCode }) =>
  async () => {
    const response = await axios.get(`${url}/${storeId}/${nickname}/${categoryCode}`);

    return response.data;
  };

export { fetchVotes, fetchVotesByNickname, fetchPrevStore, vote, reVote, removeVote, fetchCategorySelectorData };
