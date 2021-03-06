import React from 'react';

export default function SinglePinCard({ pin }) {
  return (
      <div className='card my-4 single-pin-card'>
        <div className="single-pin-image card-body" style={{ backgroundImage: `url(${pin.imageUrl})` }}></div>
      {/* <img className='card-img-top' src={pin.imageUrl} alt='Card cap' /> */}
        <div className='card-body'>
          <h5 className='card-title'>{pin.name}</h5>
          <p className='card-text'>
            {pin.description}
          </p>
        </div>
      </div>
  );
}
