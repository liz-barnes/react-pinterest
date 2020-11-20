import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { createPin, updatePin } from '../../helpers/data/pinData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.pin?.userId || '',
    description: this.props.pin?.description || '',
    private: this.props.pin?.private || '',
    // boardId: this.props.board?.firebaseKey || '',
  }

  componentDidMount() {
    const userId = getUser();
    this.setState({ userId });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imagesRef = storageRef.child(`pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);

      imagesRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.btn.setAttribute('disabled', 'disabled');
    if (this.state.firebaseKey === '') {
      createPin(this.state)
        .then(() => {
          this.props.onUpdate?.();
          this.setState({ success: true });
        });
    } else {
      updatePin(this.state)
        .then(() => {
          this.props.onUpdate?.(this.props.pin.firebaseKey);
          this.setState({ success: true });
        });
    }
  }

  render() {
    const { success } = this.state;
    return (
      <>
      { success && (<div className="alert alert-success" role="alert">Your Pin was Updated/Created</div>)
      }
      <form onSubmit={this.handleSubmit}>
        <div>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Pin Name'
          className="form-control form-control-lg m-1"
          required
        />
        </div>
        <div>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Pin Description'
          className="form-control form-control-lg m-1"
          required
        />
        </div>
        <div>
        <input
          type='url'
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className="form-control form-control-lg m-1"
          required
        />
        </div>
        <div>
         <input className="m-2" type="file" id="myFile" name="filename" accept="image/*" onChange={this.handleChange} />
         </div>
         <button ref={(btn) => { this.btn = btn; }} className="btn btn-primary m-2">Submit</button>
      </form>
      </>
    );
  }
}
