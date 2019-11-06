import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burder-builder-82f40.firebaseio.com/'
})

export default instance;
