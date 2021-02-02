import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
  TextInput,
} from 'react-native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const Wishlist = () => {
  const [token, setToken] = useState();
  const [listaWishes, setListaWishes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nume, setNume] = useState('');
  const [pret, setPret] = useState();
  RNSecureStorage.get('token')
    .then((value) => {
      setToken(value);
    })
    .catch((err) => {
      console.log(err);
    });
  const getWishes = () => {
    fetch('http://www.quit-it.somee.com/api/wishlist/my-wishlist', {
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
        setListaWishes(responseJson);
      })
      .catch((eroare) => {
        // alert('A intervenit o eroare');
        console.log('aici eroare wisah;list');
        console.log(eroare);
      })
      .finally(() => setRefreshing(false));
  };
  const sendWish = () => {
    fetch('http://www.quit-it.somee.com/api/wishlist/add-wish', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        name: nume,
        price: pret,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        getWishes();
      })
      .catch((error) => {
        alert('A intervenit o eroare');
        console.log('eroare');
        console.log(error);
      })
      .finally(() => setRefreshing(false));
  };
  useEffect(() => getWishes(), [token]);
  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.price}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Button title="Adauga dorinta" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Introdu datele</Text>
            <TextInput
              placeholder="Nume dorinta"
              onChangeText={(text) => setNume(text)}
            />
            <TextInput
              placeholder="Cost"
              onChangeText={(text) => setPret(text)}
            />
            <TouchableOpacity
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                sendWish();
              }}>
              <Text style={styles.textStyle}>Adauga</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={listaWishes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getWishes();
            }}
          />
        }
      />
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: Dimensions.get('screen').width * 0.8,
  },
  title: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Wishlist;
