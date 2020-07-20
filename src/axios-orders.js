import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burgerbuilder-by-react.firebaseio.com/',
});

export default instance;