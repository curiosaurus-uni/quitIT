import React, {useState, useEffect} from 'react';
import ListOfVices from './ListOfVices';
import RNSecureStorage from 'rn-secure-storage';

const ListOfVicesPage = (props) => {
  const [token, setToken] = useState();
  const [listaVicii, setListaVicii] = useState();
  RNSecureStorage.get('token')
    .then((value) => {
      setToken(value);
    })
    .catch((err) => {
      console.log(err);
    });
  const getVices = () => {
    fetch('http://www.quit-it.somee.com/api/vices/mine', {
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
        console.log('responseeeee');
        console.log(responseJson);
        setListaVicii(responseJson);
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
  const refresh = () => {
    getVices();
    console.log(token);
    setListaVicii(listaVicii);
  };
  return (
    <ListOfVices listaVicii={listaVicii} refresh={refresh} props={props} />
  );
};

export default ListOfVicesPage;
