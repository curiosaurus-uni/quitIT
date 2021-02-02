import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const Notificari = () => {
  const [token, setToken] = useState();
  const [listaNotificari, setListaNotificari] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  RNSecureStorage.get('token')
    .then((value) => {
      setToken(value);
    })
    .catch((err) => {
      console.log(err);
    });
  const getNotificari = () => {
    console.log('am intrat');
    console.log(token);
    fetch('http://www.quit-it.somee.com/api/notifications/mine', {
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
        setListaNotificari(responseJson);
      })
      .catch((eroare) => {
        alert('A intervenit o eroare');
        console.log('aici eroare');
        console.log(eroare);
      })
      .finally(() => setRefreshing(false));
  };
  useEffect(() => {
    getNotificari();
  }, [token]);
  const notificarePressed = (id) => {
    fetch('http://www.quit-it.somee.com/api/notifications/seen/' + id, {
      method: 'PUT',
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
        getNotificari();
      })
      .catch((eroare) => {
        // alert('A intervenit o eroare');
        console.log('aici eroare');
        console.log(eroare);
      });
  };
  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => notificarePressed(item.id)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={listaNotificari}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getNotificari();
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
});
export default Notificari;
