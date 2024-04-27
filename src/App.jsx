import Observations from './Observations';
import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsmobile from './aws-exports';
Amplify.configure(awsmobile);

function App({ signOut, user }) {
  return (

    <div className='app-container'>
      <div>
        <Observations />
      </div>
    </div>
  );
}

export default withAuthenticator(App, {hideSignUp: true});



