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

  render() {
    return (
      <div className='Auth'>
        <button className='btn btn-secondary' onClick={this.loginClickEvent}>
          <img src={googleImage} alt='Google Sign In Button' />
        </button>
      </div>
    );
  }
}
// import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import googleImage from './Sign-in-with-Google.png';

// class Auth extends React.Component {
//   loginClickEvent = (e) => {
//     e.preventDefault();
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
//   };

//   logoutEvent = (e) => {
//     e.preventDefault();
//     // window.sessionStorage.removeItem('ua');
//     firebase.auth().signOut();
//     // window.location.href = '/';
//     console.warn('clicked', firebase.auth());
//   };

//   render() {
//     return (
//       <div className='Auth'>
//         <button onClick={this.loginClickEvent} className='btn btn-secondary'>
//           <img src={googleImage} alt='google sign in' />
//         </button>
//         <button onClick={this.logoutEvent}>LOGOUT</button>
//       </div>
//     );
//   }
// }

// export default Auth;
