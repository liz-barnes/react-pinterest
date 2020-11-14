import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import googleImage from './Sign-in-with-Google.png';

export default class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  state = {};

  render() {
    return (
      <div className='Auth'>
        <button className='btn btn-secondary'>
          <img src={googleImage} alt='Google Sign In Button' onCLick={this.loginClickEvent}></img>
        </button>
      </div>
    );
  }
}
