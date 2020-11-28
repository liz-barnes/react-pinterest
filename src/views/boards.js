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
import { getUserBoards, deleteBoard } from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardCard';
import Loader from '../components/Loader';
// import getUid from '../helpers/data/authData';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import { getJoinedBoardObject, deleteJoinedObject } from '../helpers/data/pinBoardData';
import { getBoardPins, deletePin } from '../helpers/data/pinData';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    // const currentUserId = getUid();
    const user = this.props.user.uid;
    getUserBoards(user).then((response) => {
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

  removeBoard = (firebaseKey) => {
    deleteBoard(firebaseKey).then(() => {
      this.getBoards();
    }).then(() => {
      getJoinedBoardObject(firebaseKey).then((resp) => {
        if (resp.length) {
          deleteJoinedObject(resp[0].firebaseKey);
        }
      });
    }).then(() => {
      getBoardPins(firebaseKey).then((response) => {
        response.forEach((item) => {
          deletePin(item.pinId);
        });
      });
    });
  };

  render() {
    const { boards, loading } = this.state;
    const { user } = this.props;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} removeBoard={this.removeBoard} onUpdate={this.getBoards} />)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <PageHeader user={user} />
          <h1>Boards</h1>
          <AppModal title={'Add Board'} buttonLabel={' Add Board'} icon={'fa-plus-circle'}>
            <BoardForm onUpdate={this.getBoards}/>
          </AppModal>
          <div className='board-container'>{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
