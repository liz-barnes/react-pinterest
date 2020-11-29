import React from 'react';
import { Link } from 'react-router-dom';

export default function PinCard({ pin, removePin }) {
  return (
    <div className='card m-2 pin-card'>
      <div className="pin-image card-body" style={{ backgroundImage: `url(${pin.imageUrl})` }}></div>
      {/* <img className='card-img-top pin-image' src={pin.imageUrl} alt='Card cap' /> */}
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>
        <Link className='edit-btn' to={`/pin-edit/${pin.firebaseKey}`} pin={pin}>
          Edit Pin
        </Link>
        <button className="mx-2 delete-btn" onClick={() => removePin(pin.firebaseKey)}>Delete Pin</button>
      </div>
    </div>
  );
}
