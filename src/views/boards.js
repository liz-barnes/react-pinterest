import React, { Component } from 'react';
import getUserBoards from '../helpers/data/boardData';
import BoardCard from '../components/Cards/BoardCard';

export default class Boards extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    getUserBoards().then((resp) => {
      this.setState({
        boards: resp,
      });
    });
  }

  render() {
    const { boards } = this.state;
    const displayBoards = () => boards.map((board) => (
        <BoardCard key={board.firebaseKey} board={board} />
    ));
    return (
      <>
        <h1>All Boards</h1>
        <div className="d-flex flex-wrap container">{displayBoards()}</div>
      </>
    );
  }
}
