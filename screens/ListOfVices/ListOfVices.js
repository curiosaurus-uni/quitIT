import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import styles from './ListOfVices.style';

const ListOfVices = (props) => {
  const [bautura, setBautura] = useState(false);
  const [mancare, setMancare] = useState(false);
  const [tigari, setTigari] = useState(false);
  const [vicii, setVicii] = useState([]);
  console.log('aici');
  console.log(props.listaVicii);
  useEffect(() => {
    setBautura(false);
    setMancare(false);
    setTigari(false);
    setVicii(props.listaVicii);
    if (vicii) {
      vicii.map((obiect) => {
        if (obiect.viceId == 1) {
          setBautura(true);
        }
        if (obiect.viceId == 2) {
          setMancare(true);
        }
        if (obiect.viceId == 3) {
          setTigari(true);
        }
      });
    }
  }, [vicii, bautura, mancare, tigari]);
  const goToThrow = () => {
    console.log(props);
  };
  return (
    <View style={styles.container}>
      {mancare ? (
        <TouchableOpacity onPress={() => goToThrow()}>
          <View style={styles.viewImagine}>
            <Image
              source={require('../../assets/mananci.jpg')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      ) : null}
      {bautura ? (
        <TouchableOpacity onPress={() => goToThrow()}>
          <View style={styles.viewImagine}>
            <Image
              source={require('../../assets/bei.jpg')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      ) : null}
      {tigari ? (
        <TouchableOpacity onPress={() => goToThrow()}>
          <View style={styles.viewImagine}>
            <Image
              source={require('../../assets/fumezi.jpg')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          props.refresh();
          setVicii(props.listaVicii);
        }}>
        <Text>Refresh Vices</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListOfVices;
