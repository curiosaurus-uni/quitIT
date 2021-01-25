import React from 'react';
import {Platform, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import ListOfVices from '../screens/ListOfVices/ListOfVices.page';
import Throw from '../screens/Throw';

import HeaderButton from '../components/HeaderButtonComponent';

const Stack = createStackNavigator();

function StackNavigator(props) {
  console.log('stack navigator');
  return (
    <Stack.Navigator initialName={'Viciile mele'}>
      <Stack.Screen name="Viciile mele" component={ListOfVices} />
      <Stack.Screen name="Throw" component={Throw} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
