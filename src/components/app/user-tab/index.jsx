import React from 'react';
import { Auth } from 'aws-amplify';

const UserTab = () => {
  return (
    <div className="centered-tab">
      <button type="button" onClick={() => Auth.federatedSignIn()}>
        Sign in
      </button>
    </div>
  );
};

export default UserTab;
