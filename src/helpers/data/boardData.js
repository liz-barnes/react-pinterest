import axios from 'axios';

const baseUrl = 'https://react-pinterest-13f74.firebaseio.com';

const getUserBoards = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createBoard = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/boards.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updateBoard = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/boards/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

export {
  getUserBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
