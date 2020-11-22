import React, { Component } from 'react';
import PinForm from '../components/Forms/PinForm';

class EditPin extends Component {
  render() {
    console.warn(this.props);
    return (
      <div>
        <h3>Edit Pin</h3>
        <PinForm />
      </div>
    );
  }
}

export default EditPin;
