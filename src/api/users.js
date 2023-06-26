import axios from 'axios';

const url = `/api/users`;

const fetchUserProfileInfoByNickname = nickname => async () => {
  const response = await axios.get(`${url}/${nickname}`);

  return response.data;
};

const changeVotedCategoryOrder = (nickname, newOrder) => {
  axios.patch(`${url}/${nickname}/votedcategoryorder`, { votedCategoryOrder: newOrder });
};
const editUserInfo = async (nickname, content) => {
  const response = await axios.patch(`${url}/${nickname}`, content);

  return response.data;
};

export { fetchUserProfileInfoByNickname, editUserInfo, changeVotedCategoryOrder };
