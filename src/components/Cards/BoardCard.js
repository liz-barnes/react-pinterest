import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardCard({ board, removeBoard }) {
  return (
    <div className="card m-2 board-card">
      <div className="pin-image card-body" style={{ backgroundImage: `url(${board.imageUrl})` }}></div>
      {/* <img className="card-img-top" src={board.imageUrl} alt="Card image cap" /> */}
      <div className="card-body">
        <h5 className="card-title">{board.name}</h5>
        <p className="card-text">
          {board.description}
        </p>
        <Link className='edit-btn' to={`/boards/${board.firebaseKey}`}>
          View Pins
        </Link>
        <button className="mx-2 delete-btn" onClick={() => removeBoard(board.firebaseKey)}>Delete Board</button>
      </div>
    </div>
  );
}
