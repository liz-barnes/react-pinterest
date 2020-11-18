import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUid from '../../helpers/data/authData';

export default class BoardForm extends Component {
  state = {
    firebaseKey: this.props.board?.firebaseKey || '',
    name: this.props.board?.name || '',
    imageUrl: this.props.board?.imageUrl || '',
    userId: this.props.board?.userId || '',
    description: this.props.board?.description || '',
  };

  componentDidMount() {
    const userId = getUid();
    console.warn('USER ID', userId);
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      console.warn('userid', this.state.userId);
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);
      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      console.warn('userid', this.state.userId);
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Board Form</h1>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Board Name"
          className="form-control form-control-lg m-1"
          required
        />
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Board Description"
          className="form-control form-control-lg m-1"
          required
        />
        <input
          type="url"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder="Enter an Image URL or Upload a File"
          className="form-control form-control-lg m-1"
          required
        />
        <input
          className="m-2"
          type="file"
          id="myFile"
          name="filename"
          accept="image/*"
          onChange={this.handleChange }
        />
        <button>Submit</button>
      </form>
    );
  }
}
