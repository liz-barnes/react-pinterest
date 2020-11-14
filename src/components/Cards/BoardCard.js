import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardCard({ board }) {
  return (
    <div className="card m-2">
      <img className="card-img-top" src={board.imageUrl} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{board.name}</h5>
        <p className="card-text">
          {board.description}
        </p>
        <Link className='btn btn-primary' to={`/boards/${board.firebaseKey}`}>
          View Pins
        </Link>
      </div>
    </div>
  );
}
