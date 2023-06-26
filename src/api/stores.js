import axios from 'axios';

const url = `/api/stores`;

const fetchStores = async url => {
  const response = await axios.get(url);

  return response.data;
};

const fetchSearchedStores = async keyword => {
  const response = await axios.get(`${url}/search?keyword=${keyword}`);

  return response.data;
};

const fetchStore = storeid => async () => {
  const response = await axios.get(`${url}/${storeid}`);

  return response.data;
};

const fetchVotedStoresByNickname = nickname => async () => {
  const response = await axios.get(`${url}/voted/${nickname}`);

  return response.data;
};

const fetchArchivedStoreByNickname = (nickname, page, pageSize) => async () => {
  const response = await axios.get(`${url}/archived/${nickname}?page=${page}&page_size=${pageSize}`);

  return response.data;
};

const fetchIsRegisteredByStoreIds = storeIds => async () => {
  const urlString = `${url}/searchMap/isRegistered?${storeIds.map((id, idx) => `${idx}=${id}&`).join('')}`;

  const response = await axios.get(urlString.slice(0, -1));

  return response.data;
};

export {
  fetchStores,
  fetchSearchedStores,
  fetchStore,
  fetchVotedStoresByNickname,
  fetchArchivedStoreByNickname,
  fetchIsRegisteredByStoreIds,
};
