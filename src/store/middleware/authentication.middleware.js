import Amplify, { Auth, Hub } from 'aws-amplify';
import identityPoolId from '@config/cognito-identity-pool-id';
import userPoolId from '@config/cognito-user-pool-id';
import userSignIn from '../actions/creators/user-sign-in.creator';
import userSignOut from '../actions/creators/user-sign-out.creator';

const REDIRECT_URL = `${window.location.origin}/user`;

Amplify.configure({
  Auth: {
    identityPoolId,
    userPoolId: userPoolId,
    region: 'us-west-2',
    userPoolWebClientId: '2p1fj36ht7ngnkhr3td22o8nbh',
    oauth: {
      domain: 'generativefm.auth.us-west-2.amazoncognito.com',
      scope: 'aws.cognito.signin.user.admin+openid',
      redirectSignIn: REDIRECT_URL,
      redirectSignOut: REDIRECT_URL,
      responseType: 'code',
    },
  },
});

window.Auth = Auth;

const authenticationMiddleware = store => next => {
  Auth.currentAuthenticatedUser()
    .then(() => {
      store.dispatch(userSignIn());
    })
    .catch(() => {
      store.dispatch(userSignOut());
    });

  Hub.listen('auth', data => {
    const {
      payload: { event },
    } = data;
    if (event === 'signIn') {
      store.dispatch(userSignIn());
    } else if (event === 'signOut') {
      store.dispatch(userSignOut());
    }
  });
  return action => next(action);
};

export default authenticationMiddleware;
