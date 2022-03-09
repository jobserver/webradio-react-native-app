import React, { useEffect, useState } from 'react';
import {Text, Modal, View, TouchableOpacity, StyleSheet} from 'react-native';



const ModalAlert = (props) => {

  const [modalVisible,setModalVisible] = useState(false);

  useEffect(()=>{
    setModalVisible(props.visible)
  },[props.visible])

  return (
  <View>
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <Text style={styles.textStyle}>
            {props.frase}
          </Text>
          <TouchableOpacity
            style={styles.btnModalSuccess}
            onPress={() => props.onChangeState(false)}
          >
            <Text style={{color:'white', textTransform: 'uppercase'}}>
              ok
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
  )
};

const styles = StyleSheet.create ({
  btnModalSuccess: {
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    textTransform: 'uppercase',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  textStyle: {
    fontSize: 20,
    // fontWeight: "bold",
    textAlign: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalAlert;
