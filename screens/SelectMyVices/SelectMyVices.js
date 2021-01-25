import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CheckboxList from 'rn-checkbox-list';
import styles from './SelectMyVices.style';

const MyVices = (props) => {
  console.log(props);
  const [selected, setSelected] = useState([]);
  let selectedVices = [];
  // useEffect(() => {
  //   console.log('am intrat in useefect');
  //   let theSelected = [];
  //   if (props.listaVicii) {
  //     selected.map((object) => {
  //       theSelected.push({
  //         viceId: props.listaVicii.find((element) => element.id === object).id,
  //         name: props.listaVicii.find((element) => element.id === object).name,
  //       });
  //     });
  //   }
  //   console.log(theSelected);
  //   setSelectedVices(theSelected);
  // }, [selected]);
  const postVicii = () => {
    console.log('apel');
    console.log(selectedVices);
    fetch('http://www.quit-it.somee.com/api/vices/updateVices', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token,
      },
      body: JSON.stringify(selectedVices),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
      })
      .catch((error) => {
        console.log('eroare');
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CheckboxList
        headerName="Vicii"
        theme="red"
        listItems={props.listaVicii}
        onChange={({ids, items}) => {
          selectedVices = [];
          console.log('My updated list :: ', ids);
          // let theSelected = [];
          if (props.listaVicii) {
            ids.map((object) => {
              selectedVices.push({
                viceId: props.listaVicii
                  .find((element) => element.id === object)
                  .id.toString(),
                name: props.listaVicii.find((element) => element.id === object)
                  .name,
              });
            });
          }
          console.log(selectedVices);
          // setSelectedVices(theSelected);
        }}
        listItemStyle={{borderBottomColor: '#eee', borderBottomWidth: 1}}
        checkboxProp={{boxType: 'square'}}
      />
      <TouchableOpacity onPress={() => postVicii()}>
        <Text>Alege</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyVices;
