import axios from 'axios';

const baseUrl = 'https://react-pinterest-13f74.firebaseio.com';

const getUserPins = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    }).catch((error) => reject(error));
});

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createPin = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins.json`, object)
    .then((response) => {
      console.warn(response);
      axios.patch(`${baseUrl}/pins/${response.data.name}.json`, { firebaseKey: response.data.name }).then((resp) => resolve(resp));
    }).catch((error) => reject(error));
});

const updatePin = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/pins/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const deletePinOfBoard = (pinId) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${pinId}"`)
    .then((response) => {
      const deletePins = Object.keys(response.data);
      deletePins.forEach((pin) => {
        axios.delete(`${baseUrl}/pins-boards/${pin}.json`);
      });
    });
};

export {
  getBoardPins,
  getUserPins,
  getPin,
  createPin,
  updatePin,
  deletePin,
  deletePinOfBoard,
};
