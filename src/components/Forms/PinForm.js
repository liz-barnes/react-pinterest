import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUid from '../../helpers/data/authData';
import { createPin, updatePin } from '../../helpers/data/pinData';
import { getUserBoards } from '../../helpers/data/boardData';
import { createPinOfBoard, getJoinedObject, updateJoinedObject } from '../../helpers/data/pinBoardData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.pin?.userId || '',
    description: this.props.pin?.description || '',
    private: this.props.pin?.private || 'true',
    boards: [],
    boardId: this.props.pin?.boardId || '',
  };

  componentDidMount() {
    this.getBoards();
    // const userId = getUid();
    // this.setState({ userId });
  }

  getBoards = () => {
    const currentUserId = getUid();
    getUserBoards(currentUserId).then((response) => {
      this.setState(
        {
          userId: currentUserId,
          boards: response,
        },
        this.setLoading,
      );
    });
  };

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imagesRef = storageRef.child(
        `pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`,
      );

      imagesRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.btn.setAttribute('disabled', 'disabled');
    if (this.state.firebaseKey === '') {
      createPin(this.state).then((resp) => {
        this.props.onUpdate?.();
        this.setState({ success: true, firebaseKey: resp.data.firebaseKey });
      }).then(() => {
        setTimeout(() => {
          const pinOfBoardsObject = {
            boardId: this.state.boardId,
            pinId: this.state.firebaseKey,
            userId: this.state.userId,
          };
          console.warn('pinboardobject', pinOfBoardsObject);
          createPinOfBoard(pinOfBoardsObject);
        }, 3000);
      });
    } else {
      updatePin(this.state).then(() => {
        const newObject = {
          boardId: this.state.boardId,
        };
        getJoinedObject(this.state.firebaseKey).then((resp) => {
          updateJoinedObject(resp[0].firebaseKey, newObject);
        });
        this.props.onUpdate?.(this.props.pin.firebaseKey);
        this.setState({ success: true });
      });
    }
  };

  // updateJoinedObject(newObject).then((response) => {
  //   console.warn('join', response);
  // });
  // const pinOfBoardsObject = {
  //   boardId: this.state.boardId,
  //   pinId: this.state.firebaseKey,
  //   userId: this.state.userId,
  // };
  // console.warn('pinboardobject22', pinOfBoardsObject);
  // createPinOfBoard(pinOfBoardsObject);
  // .then(() => {
  //   console.warn('update board', this.state);
  //   this.props.onUpdate?.(this.props.pin.firebaseKey);
  //   this.setState({ success: true });
  // });

  // .then(() => {
  //   const pinOfBoardsObject = {
  //     boardId: this.state.boardId,
  //     pinId: this.state.firebaseKey,
  //     userId: this.state.userId,
  //   };
  //   createPinOfBoard(pinOfBoardsObject);

  render() {
    const { success, boards } = this.state;
    const showBoardOptions = () => boards.map((board) => (<option key={board.firebaseKey} value={board.firebaseKey}>{board.name}</option>));
    return (
      <>
        {success && (
          <div className="alert alert-success" role="alert">
            Your Pin was Updated/Created
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Pin Name"
              className="form-control form-control-lg m-1"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Pin Description"
              className="form-control form-control-lg m-1"
              required
            />
          </div>
          <div>
            <input
              type="url"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
              placeholder="Enter an Image URL or Upload a File"
              className="form-control form-control-lg m-1"
              required
            />
          </div>
          <div>
            <input
              className="m-2"
              type="file"
              id="myFile"
              name="filename"
              accept="image/*"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <select
              name="boardId"
              value={this.state.boardId}
              onChange={this.handleChange}
              placeholder="Select A Board"
              required
            >
              <option value="">Select a Board</option>
              {showBoardOptions()}
            </select>
          </div>
          <div>
            <select
              name="private"
              value={this.state.private}
              onChange={this.handleChange}
              required
            >
              <option value="true">Private</option>
              <option value="false">Public</option>
            </select>
          </div>
          <button
            ref={(btn) => {
              this.btn = btn;
            }}
            className="btn btn-primary m-2"
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}
