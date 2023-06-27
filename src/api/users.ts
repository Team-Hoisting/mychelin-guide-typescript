import axios from 'axios';

const url = `/api/users`;

const fetchUserProfileInfoByNickname = (nickname: string) => async () => {
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
