import axios from 'axios';

const API_KEY = '30812981-3cf39b9b168dfd43354b6ea61';
const SOURSEC = 'https://pixabay.com/api/';

axios.defaults.baseURL = SOURSEC;
axios.defaults.params = {
  key: API_KEY,
  orientation: 'horizontal',
  per_page: 12,
  image_type: 'photo',
};

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};
