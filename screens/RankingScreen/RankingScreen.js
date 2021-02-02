import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, Text, TextInput, Button} from 'react-native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import styles from './RankingScreen.style.js';

const Ranking = (props) => {
  const [token, setToken] = useState();
  const [listaTop, setListaTop] = useState([]);
  RNSecureStorage.get('token')
    .then((value) => {
      setToken(value);
    })
    .catch((err) => {
      console.log(err);
    });
  const getTop = () => {
    fetch('http://www.quit-it.somee.com/api/vices/top-users', {
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
        setListaTop(responseJson);
      })
      .catch((eroare) => {
        // alert('A intervenit o eroare');
        console.log('aici eroare');
        console.log(eroare);
      });
  };
  useEffect(() => getTop(), [token]);
  console.log(listaTop);
  return (
    <View style={styles.container}>
      <View style={styles.viewImagine}>
        <Image source={require('../../assets/aur.png')} style={styles.image} />
      </View>
      {listaTop.length > 0 ? (
        <Text style={styles.text}>
          {listaTop[0].firstName}:{listaTop[0].score}
        </Text>
      ) : (
        <Text>Loc 1</Text>
      )}
      <View style={styles.viewImagine}>
        <Image
          source={require('../../assets/argint.png')}
          style={styles.image}
        />
      </View>
      {listaTop.length > 1 ? (
        <Text style={styles.text}>
          {listaTop[1].firstName}:{listaTop[1].score}
        </Text>
      ) : (
        <Text>Loc 2</Text>
      )}
      <View style={styles.viewImagine}>
        <Image
          source={require('../../assets/cupru.png')}
          style={styles.image}
        />
      </View>
      {listaTop.length > 2 ? (
        <Text style={styles.text}>
          {listaTop[2].firstName}:{listaTop[2].score}
        </Text>
      ) : (
        <Text>Loc 3</Text>
      )}
      <Button title="Refresh Top" onPress={() => getTop()} />
    </View>
  );
};

export default Ranking;
