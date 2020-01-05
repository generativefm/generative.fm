import { Auth } from 'aws-amplify';
import { CognitoSync } from 'aws-sdk';
import identityPoolId from '@config/cognito-identity-pool-id';
import region from '@config/cognito-region';

const getCognitoSync = currentCredentials => {
  const credentials = Auth.essentialCredentials(currentCredentials);
  return new CognitoSync({
    credentials,
    region,
    params: {
      IdentityPoolId: identityPoolId,
      IdentityId: credentials.identityId,
    },
    apiVersion: '2014-06-30',
  });
};

export default getCognitoSync;
