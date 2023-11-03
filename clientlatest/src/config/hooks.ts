import React, { useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from './store';
import { sagaActions } from '../sagas/actions';

let INITIALIZING = true;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFirebaseAuth = () => {
  const dispatch = useDispatch();

  const handleSignin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userState: FirebaseAuthTypes.UserCredential) => {
        console.log('User account created & signed in!', userState);

        const accessToken = await getToken(userState.user);

        if (!accessToken) {
          return;
        }

        dispatch(
          sagaActions.auth({
            user: userState.user,
            accessToken,
          }),
        );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error('other error', error);
      });
  };

  const handleSignup = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error('other error', error);
      });
  };

  const getToken = async (userData: FirebaseAuthTypes.User) => {
    try {
      const token = await userData.getIdToken(true);

      return token;
    } catch (error) {
      console.log('getToken', error);
    }
  };

  const onAuthStateChanged = React.useCallback(
    async (userState: FirebaseAuthTypes.User | null) => {
      if (userState) {
        const accessToken = await getToken(userState);

        if (!accessToken || !INITIALIZING) {
          return;
        }

        console.log('about to update userState', userState, accessToken);

        dispatch(
          sagaActions.auth({
            user: userState,
            accessToken,
          }),
        );
        INITIALIZING = false;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return subscribe;
  }, [onAuthStateChanged]);

  return { handleSignin, handleSignup };
};
