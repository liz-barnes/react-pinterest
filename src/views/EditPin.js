import React, { Component } from 'react';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/Modal';
import PinCard from '../components/Cards/PinCard';
import { getPin } from '../helpers/data/pinData';
// const EditPin = ({ pin }) => (
//     <div>
//       <h3>Edit Pin</h3>
//       <AppModal title={'Edit Modal'} icon={'fa-pen-nib'}>
//         <PinForm pin={pin} onUpdate={this.getPinInfo} />
//       </AppModal>
//     </div>
// );
class EditPin extends Component {
  state = {
    pin: {},
  };

  componentDidMount() {
    const pinId = this.props.match.params.id;
    this.getPinInfo(pinId);
  }

  getPinInfo = (pinId) => {
    getPin(pinId).then((response) => {
      this.setState({
        pin: response,
      });
    });
  };

  render() {
    const { pin } = this.state;
    return (
      <div>
        <h3>Edit Pin</h3>
        <AppModal title={'Edit Modal'} icon={'fa-pen-nib'}>
         <PinForm pin={pin} onUpdate={this.getPinInfo} />
        </AppModal>
        <PinCard pin={pin} />
      </div>
    );
  }
}

export default EditPin;
