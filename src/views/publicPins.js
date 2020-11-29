import React from 'react';
// import getUid from '../helpers/data/authData';
import { getUserPins, getAllPins } from '../helpers/data/pinData';
import PublicPinCard from '../components/Cards/PublicPinCard';
// import PinForm from '../components/Forms/PinForm';
// import AppModal from '../components/Modal';

export default class PublicPins extends React.Component {
    state = {
      publicPins: [],
    };

    componentDidMount() {
      this.getPins();
    }

    getPins = () => {
      // const userId = getUid();
      // getUserPins(userId).then((response) => {
      //   response.forEach((pin) => {
      //     if (pin.private === false || pin.private === 'false') {
      //       this.setState({
      //         publicPins: this.state.publicPins.concat(pin),
      //       });
      //     }
      //   });
      // });
      // this.setState({
      //   publicPins: [],
      // });
      getAllPins().then((response) => {
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
        {/* <AppModal title={'Add Pin'} icon={'fa-plus-circle'} buttonLabel={' Add Pin'}>
          <PinForm onUpdate={this.getPins}/>
        </AppModal> */}
        <div className="public-pin-container">
          {publicPins.map((pin) => <PublicPinCard key={pin.firebaseKey} pin={pin} onUpdate={this.getPins}/>)}
        </div>
      </div>
      );
    }
}
