import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Draggable from 'react-native-draggable';
import ConfettiCannon from 'react-native-confetti-cannon';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const Throw = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState();
  RNSecureStorage.get('token')
    .then((value) => {
      setToken(value);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('aici sunt props');
  console.log(props.route.params.tip);
  console.log(props.route.params);
  console.log(props.route.params.id);
  const countMore = () => {
    fetch(
      'http://www.quit-it.somee.com/api/vices/throw-in-the-thrash/' +
        props.route.params.id,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        console.log('up');
      })
      .catch((eroare) => {
        // alert('A intervenit o eroare');
        console.log('aici eroare');
        console.log(eroare);
      });
  };
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} autoStart={true} />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            props.navigation.pop();
          }}>
          <Text>Go back</Text>
        </TouchableOpacity>
      </Modal>
      <View style={styles.top}>
        <Draggable
          imageSource={props.route.params.tip}
          renderSize={150}
          x={Math.random()}
          y={0}
          onDrag={(event, gestureHandler) => {
            if (
              gestureHandler.moveY >
              (70 / 100) * Dimensions.get('window').height
            ) {
              countMore();
              setModalVisible(true);
            }
          }}
        />
      </View>
      <View style={styles.viewImagine}>
        <Image source={require('../assets/cos.png')} style={styles.image} />
      </View>
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
  top: {
    height: '70%',
  },
  viewImagine: {
    width: 200,
    height: 170,
  },
  image: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
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

export default Throw;
