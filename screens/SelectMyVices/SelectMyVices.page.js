import React, {useState, useEffect} from 'react';
import SelectMyVices from './SelectMyVices';
import RNSecureStorage from 'rn-secure-storage';

const MyVicesPage = () => {
  const [token, setToken] = useState();
  const [listaVicii, setListaVicii] = useState();
  RNSecureStorage.get('token')
    .then((value) => {
      console.log(value); // Will return direct value
      setToken(value);
    })
    .catch((err) => {
      console.log(err);
    });
  const getVices = () => {
    fetch('http://www.quit-it.somee.com/api/vices', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        let newListaVicii = [];
        responseJson.map((object) => {
          let viciu = {
            id: parseInt(object.viceId),
            name: object.name.toString(),
          };
          newListaVicii.push(viciu);
        });
        setListaVicii(newListaVicii);
      })
      .catch((eroare) => {
        // alert('A intervenit o eroare');
        console.log('aici eroare');
        console.log(eroare);
      });
  };
  useEffect(() => {
    getVices();
  }, [token]);
  return <SelectMyVices listaVicii={listaVicii} token={token} />;
};

export default MyVicesPage;
