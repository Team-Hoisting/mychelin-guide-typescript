import axios from 'axios';

const url = `/api/archives`;

const fetchArchives = (storeid: string) => async () => {
  const response = await axios.get(`${url}/${storeid}`);

  return response.data;
};

export default fetchArchives;
