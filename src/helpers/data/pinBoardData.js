import axios from 'axios';

const baseUrl = 'https://react-pinterest-13f74.firebaseio.com';

const createPinOfBoard = (object) => {
  axios.post(`${baseUrl}/pins-boards.json`, object).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));
};

export default createPinOfBoard;
