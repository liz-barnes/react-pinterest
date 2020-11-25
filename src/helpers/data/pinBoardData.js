import axios from 'axios';

const baseUrl = 'https://react-pinterest-13f74.firebaseio.com';

const createPinOfBoard = (object) => {
  axios.post(`${baseUrl}/pins-boards.json`, object).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));
};

const getJoinedObject = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${pinId}"`).then((response) => {
    console.warn(Object.values(response.data));
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const updateJoinedObject = (firebaseKey, object) => new Promise((resolve, reject) => {
  console.warn('joined object', object);
  axios.patch(`${baseUrl}/pins-boards/${firebaseKey}.json`, object).then(resolve).catch((error) => reject(error));
});

export { createPinOfBoard, getJoinedObject, updateJoinedObject };
