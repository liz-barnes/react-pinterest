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
import Pins from './pins';

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
  //   deletePinOfBoard(firebaseKey);
  // };

  removePin = (e) => {
    deletePin(e.target.id)
      .then(() => {
        this.getPins();
      });
  }

  render() {
    const { pins, board } = this.state;
    console.warn('pins length', pins);
    const { user } = this.props;
    const renderPins = () => (
      pins.length
        ? pins.map((pin) => (
          <PinCard key={pin.firebaseKey} pin={pin} removePin={this.removePin}/>
        )) : (
        <h2>Add Pin</h2>
        )
    );

    return (
      <div>
        <AppModal title={'Edit Modal'} icon={'fa-pen-nib'}>
         <BoardForm board={board} onUpdate={this.getBoardInfo} />
        </AppModal>
        <PageHeader user={user} />
        <h1>{board.name} Pins</h1>
        <h4>{board.description}</h4>
        <Pins />
        <div className="d-flex flex-wrap container">{renderPins()}</div>
      </div>
    );
  }
}
