import React from 'react';
import getUid from '../helpers/data/authData';
import { getUserPins } from '../helpers/data/pinData';
import PinCard from '../components/Cards/PinCard';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/Modal';

export default class PublicPins extends React.Component {
    state = {
      publicPins: [],
    };

    componentDidMount() {
      this.getPins();
    }

    getPins = () => {
      const userId = getUid();
      getUserPins(userId).then((response) => {
        response.forEach((pin) => {
          if (pin.private === false || pin.private === 'false') {
            this.setState({
              publicPins: this.state.publicPins.concat(pin),
            });
          }
        });
      });
    }

    render() {
      const { publicPins } = this.state;
      return (
      <div>
        <h1>Your Pins</h1>
        <AppModal title={'Add Board'} icon={'fa-plus-circle'}>
          <PinForm onUpdate={this.getPins}/>
        </AppModal>
        <div className="d-flex flex-wrap container">
        {publicPins.map((pin) => <PinCard key={pin.firebaseKey} pin={pin} onUpdate={this.getPins}/>)}
        </div>
      </div>
      );
    }
}