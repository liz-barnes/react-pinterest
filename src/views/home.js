// import React from 'react';
// import BoardContainer from '../components/BoardContainer';
// import Auth from '../components/Auth';

// export default function Home({ authed }) {
//   const loadComponent = () => {
//     let component = '';
//     if (authed) {
//       component = <BoardContainer />;
//     } else {
//       component = <Auth />;
//     }
//     return component;
//   };
//   return (
//     <div>
//       <h1>Home</h1>
//       {loadComponent()}
//     </div>
//   );
// }
import React from 'react';
import Auth from '../components/Auth';
import Loader from '../components/Loader';
import Pins from './pins';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = 'Load all non-private pins here';
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      <h1>Welcome to React-Pinterest</h1>
      {loadComponent()}
      <Pins />
    </div>
  );
}
