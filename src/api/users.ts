import axios from 'axios';
import { UserProfileInfoByNicknameReturnType } from '../components/profile/types';

const url = `/api/users`;

const fetchUserProfileInfoByNickname = (nickname: string) => async (): Promise<UserProfileInfoByNicknameReturnType> => {
  const response = await axios.get(`${url}/${nickname}`);

  return response.data;
};

const changeVotedCategoryOrder = (nickname: string, newOrder) => {
  axios.patch(`${url}/${nickname}/votedcategoryorder`, { votedCategoryOrder: newOrder });
};
const editUserInfo = async (nickname: string, content) => {
  const response = await axios.patch(`${url}/${nickname}`, content);

  return response.data;
};

export { fetchUserProfileInfoByNickname, editUserInfo, changeVotedCategoryOrder };
