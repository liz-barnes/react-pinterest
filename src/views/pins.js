// import React, { Component } from 'react';
// import AppModal from '../components/Modal';
// import PinForm from '../components/Forms/PinForm';
// import PinCard from '../components/Cards/PinCard';
// import Loader from '../components/Loader';
// import getUid from '../helpers/data/authData';
// import { getUserPins } from '../helpers/data/pinData';

// export default class Pins extends Component {
//   state = {
//     pins: [],
//     loading: true,
//   };

//   componentDidMount() {
//     this.getPins();
//   }

//   getPins = () => {
//     const currentUserId = getUid();
//     getUserPins(currentUserId).then((response) => {
//       console.warn('pin response', response);
//       this.setState({
//         pins: response,
//       }, this.setLoading);
//     });
//   }

//   setLoading = () => {
//     this.timer = setInterval(() => {
//       this.setState({ loading: false });
//     }, 1000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.timer);
//   }

//   render() {
//     const { pins, loading } = this.state;
//     // const { user } = this.props;
//     const showPins = () => (
//       pins.map((pin) => <PinCard key={pin.firebaseKey} board={pin} />)
//     );
//     return (
//       <>
//       { loading ? (
//         <Loader />
//       ) : (
//         <>
//         <div>
//         <h1>Pins</h1>
//         <AppModal title={'Add Pin'} icon={'fa-plus-circle'}>
//           <PinForm />
//         </AppModal>
//       </div>
//         <AppModal title={'Add Board'} icon={'fa-plus-circle'}>
//           <PinForm onUpdate={this.getPins}/>
//         </AppModal>
//         <div className='d-flex flex-wrap container'>{showPins()}</div>
//         </>
//       )}
//     </>
//     );
//   }
// }
import React from 'react';
import getUid from '../helpers/data/authData';
import { getUserPins } from '../helpers/data/pinData';
import PinCard from '../components/Cards/PinCard';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/Modal';

export default class Pins extends React.Component {
  state = {
    pins: [],
    publicPins: [],
  };

  componentDidMount() {
    this.getPins();
  }

  // deletePin = (firebaseKey) => {
  //   deletePin(firebaseKey);
  //   getPinsBoards(firebaseKey).then((response) => {
  //     response.forEach((item) => {
  //       const newArray = Object.values(item);
  //       if (newArray.includes(firebaseKey)) {
  //         deletePinsOfBoards(item.firebaseKey);
  //       }
  //     });
  //   });
  //   this.getPins();
  // }

  getPins = () => {
    const userId = getUid();
    getUserPins(userId).then((response) => {
      this.setState({
        pins: response,
      });
      response.forEach((pin) => {
        if (pin.private === false || pin.private === 'false') {
          this.setState({
            publicPins: this.state.publicPins.concat(pin),
          });
          console.warn('public pins', this.state.publicPins);
        }
      });
    });
  }

  render() {
    const { publicPins } = this.state;
    return (
      <div>
        <h1>Your Pins</h1>
        <AppModal buttonLabel={'Add A Pin'} title={'Add A Pin'}>
        <PinForm onUpdate={this.getPins}/>
        </AppModal>
        <div className="d-flex flex-wrap container">
        {publicPins.map((pin) => <PinCard key={pin.firebaseKey} pin={pin} onUpdate={this.getPins}/>)}
        </div>
      </div>
    );
  }
}

// export default function Pins() {
//   return (
//     <div>
//       <h1>Pins</h1>
//         <AppModal title={'Add Board'} icon={'fa-plus-circle'}>
//             <PinForm />
//         </AppModal>
//     </div>
//   );
// }
