import axios from 'axios';

export const accessKey = '00rgklp52215daaphoto';

export default axios.create({
  baseURL: 'http://photoguest.com.br/api/',
});
