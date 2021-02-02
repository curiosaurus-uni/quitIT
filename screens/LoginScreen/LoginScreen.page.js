import React, {useEffect, useState} from 'react';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import Login from './LoginScreen.js';
import {CommonActions} from '@react-navigation/native';

const LoginPage = (props) => {
  const login = (credentials) => {
    console.log('am intrat in apel');
    fetch('http://www.quit-it.somee.com/api/account/login', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.username,
        password: credentials.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw response;
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        console.log(responseJson.accessToken);
        RNSecureStorage.set('token', responseJson.accessToken, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        }).then(
          (res) => {
            console.log('res RNSS');
            console.log(res);
            props.navigation.dispatch(
              CommonActions.reset({index: 0, routes: [{name: 'Side'}]}),
            );
          },
          (err) => {
            console.log('err RNSS');
            console.log(err);
          },
        );
      })
      .catch((error) => {
        alert('Username sau parola incorect');
        console.log('eroare apel');
        console.log(error);
      });
  };
  return <Login props={props} login={login} />;
};

export default LoginPage;
