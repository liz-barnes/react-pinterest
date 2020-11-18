// import React, { Component } from 'react';
// import { getUserBoards } from '../helpers/data/boardData';
// import BoardCard from '../components/Cards/BoardCard';

// export default class Boards extends Component {
//   state = {
//     boards: [],
//   };

//   componentDidMount() {
//     getUserBoards().then((resp) => {
//       this.setState({
//         boards: resp,
//       });
//     });
//   }

//   render() {
//     const { boards } = this.state;
//     const displayBoards = () => boards.map((board) => (
//         <BoardCard key={board.firebaseKey} board={board} />
//     ));
//     return (
//       <>
//         <h1>All Boards</h1>
//         <div className="d-flex flex-wrap container">{displayBoards()}</div>
//       </>
//     );
//   }
// }
import React from 'react';
import { getUserBoards } from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    const currentUserId = getUid();
    getUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} />)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <h2>Here are all of your boards</h2>
          <div className='d-flex flex-wrap container'>{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
