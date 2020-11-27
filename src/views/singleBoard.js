// import React from 'react';

// export default function SingleBoard(props) {
//   const boardFirebaseKey = props.match.params.id;
//   console.warn(boardFirebaseKey);

//   return (
//     <div>
//       <h1>Single Board</h1>
//     </div>
//   );
// }

import React, { Component } from 'react';
import {
  getBoardPins,
  getPin,
  deletePin,
  // deletePinOfBoard,
} from '../helpers/data/pinData';
import { getSingleBoard } from '../helpers/data/boardData';
import PinCard from '../components/Cards/PinCard';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import { getJoinedObject, deleteJoinedObject } from '../helpers/data/pinBoardData';
// import Pins from './pins';

export default class SingleBoard extends Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.getBoardInfo(boardId);
    this.getPins(boardId).then((resp) => this.setState({ pins: resp }));
  }

  getBoardInfo = (boardId) => {
    getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });
  };

  getPins = (boardId) => getBoardPins(boardId).then((response) => {
    const pinArray = [];
    response.forEach((item) => {
      pinArray.push(getPin(item.pinId));
    });
    return Promise.all([...pinArray]);
  });

  // removePin = (firebaseKey) => {
  //   const remainingPins = this.state.pins.filter(
  //     (pin) => pin.firebaseKey !== firebaseKey,
  //   );
  //   this.setState({
  //     pins: remainingPins,
  //   });
  //   deletePin(firebaseKey);
  //   // deletePinOfBoard(firebaseKey);
  // };

  removePin = (firebaseKey) => {
    console.warn(firebaseKey);
    deletePin(firebaseKey).then(() => {
      const remainingPins = this.getPins();
      this.setState({
        pins: remainingPins,
      });
    }).then(() => {
      getJoinedObject(firebaseKey).then((resp) => {
        deleteJoinedObject(resp[0].firebaseKey);
      });
    });
  };

  render() {
    const { pins, board } = this.state;
    console.warn('single board pins length', pins);
    const { user } = this.props;
    const renderPins = () => (
      pins.length
        ? pins.map((pin) => (
          <PinCard key={pin.firebaseKey} pin={pin} removePin={this.removePin}/>
        )) : (
        <h2>There are no pins on the board</h2>
        )
    );

    return (
      <div>
        <PageHeader user={user} />
        <AppModal title={'Edit Board'} icon={'fa-pen-nib'} buttonLabel={' Edit Board'}>
         <BoardForm board={board} onUpdate={this.getBoardInfo} />
        </AppModal>
        <h1>{board.name} Pins</h1>
        <h4>{board.description}</h4>
        {/* <Pins /> */}
        <div className="pin-container">{renderPins()}</div>
      </div>
    );
  }
}
