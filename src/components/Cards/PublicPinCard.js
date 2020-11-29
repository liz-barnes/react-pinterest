import React from 'react';

export default function PublicPinCard({ pin }) {
  return (
      <div className='card m-2 public-pin-card'>
        <div className="public-pin-image card-body" style={{ backgroundImage: `url(${pin.imageUrl})` }}></div>
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
