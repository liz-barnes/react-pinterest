import React, { Component } from 'react';
import AppModal from '../components/Modal';
import PinForm from '../components/Forms/PinForm';

export default class Pins extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Pins</h1>
        <AppModal title={'Add Pin'} icon={'fa-plus-circle'}>
          <PinForm />
        </AppModal>
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
