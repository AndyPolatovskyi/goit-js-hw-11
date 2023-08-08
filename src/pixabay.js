import axios from 'axios';
const BASE_KEY = '38684699-073e3ca44cfac762c4f7025b5';
const BASE_URL = 'https://pixabay.com/api/';


export async function requestServer(request, page) {
  const options = {
    params: {
      key: BASE_KEY,
      q: request,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  };
  return axios.get(`${BASE_URL}`, options).then(response => response.data);
}
