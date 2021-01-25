import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#324554',
    padding: 15,
    paddingBottom: Dimensions.get('window').height / 2,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  viewImagine: {
    width: 350,
    height: 180,
    padding: 20,
  },
  image: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  checkboxView: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
