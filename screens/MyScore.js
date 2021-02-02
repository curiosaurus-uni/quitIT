import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const Wishlist = () => {
  const [token, setToken] = useState();
  const [scor, setScor] = useState(0);
  const [bani, setBani] = useState(0);
  RNSecureStorage.get('token')
    .then((value) => {
      setToken(value);
    })
    .catch((err) => {
      console.log(err);
    });
  const getScor = () => {
    fetch('http://www.quit-it.somee.com/api/vices/score', {
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
        console.log('is ok');
        return response.json();
      })
      .then((responseJson) => {
        setScor(responseJson.score);
        setBani(responseJson.moneySaved);
      })
      .catch((eroare) => {
        console.log('aici eroare');
        console.log(eroare);
      });
  };
  useEffect(() => {
    getScor();
  }, [token]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scorul meu</Text>
      <Text>{scor}</Text>
      <Text style={styles.text}>Bani economisiti</Text>
      <Text>{bani}</Text>
      <Button onPress={() => getScor()} title="Verifica Scorul" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#324554',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
export default Wishlist;
