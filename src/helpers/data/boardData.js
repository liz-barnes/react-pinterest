import axios from 'axios';

const baseUrl = 'https://react-pinterest-13f74.firebaseio.com';

const getUserBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json`).then((response) => {
      resolve(Object.values(response.data));
    }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getUserBoards, getSingleBoard };
