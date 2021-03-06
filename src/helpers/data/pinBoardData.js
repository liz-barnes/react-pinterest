import axios from 'axios';

const baseUrl = 'https://react-pinterest-13f74.firebaseio.com';

const createPinOfBoard = (object) => {
  axios.post(`${baseUrl}/pins-boards.json`, object).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));
};

const getJoinedObject = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${firebaseKey}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getJoinedBoardObject = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${firebaseKey}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const updateJoinedObject = (firebaseKey, object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/pins-boards/${firebaseKey}.json`, object).then(resolve).catch((error) => reject(error));
});

const deleteJoinedObject = (firebaseKey) => axios.delete(`${baseUrl}/pins-boards/${firebaseKey}.json`);

export {
  createPinOfBoard,
  getJoinedObject,
  updateJoinedObject,
  deleteJoinedObject,
  getJoinedBoardObject,
};
