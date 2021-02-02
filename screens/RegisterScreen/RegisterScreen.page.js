import React, {useEffect, useState} from 'react';
import Register from './RegisterScreen.js';

const RegisterPage = (props) => {
  const sendData = (account) => {
    fetch('http://www.quit-it.somee.com/api/account/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: account.nume,
        lastName: account.prenume,
        email: account.email,
        password: account.parola,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        props.navigation.pop();
      })
      .catch((error) => {
        alert('Parola trebuie sa contina caracter mare, caracter mic, cifra si caracter special');
        console.log('eroare');
        console.log(error);
      });
  };
  return <Register sendData={sendData} props={props} />;
};

export default RegisterPage;
