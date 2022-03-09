import React, {useEffect, useState} from 'react';
import {
  Text,
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setBanners} from '../redux/actions/configApp';

const ModalBanner = props => {
  const [modalVisible, setModalVisible] = useState (false);
  const [imgBanner, setImgBanner] = useState ({});

  const tick = () => {
    if (
      props.configApp.banners != '' &&
      props.configApp.banners.dados.length > 0
    ) {
     
      const min = 0;
      const max = props.configApp.banners.dados.length;
      const random = Math.floor (Math.random () * (max - min)) + min;
      setImgBanner (props.configApp.banners.dados[random]);
      // $scope.imgBanner = 	$scope.assets + $scope.banners[random].arquivo;
    }
    if (modalVisible == false) setModalVisible (true);
  };

  async function getBanners () {
    try {
      const payload = {
        radioId: props.configApp.radioId,
        hash: props.configApp.banners.hash,
      };
      const dados = await axios.post (
        props.configApp.api + '/getBanner',
        payload
      );
      if (dados.data.hash !== undefined) {       
        props.setBanners ({banners: dados.data});
      }
    } catch (e) {}
  }

  useEffect (
    () => {
      //cria o id do intervalo, permitindo futuramente desativar os banners
      const timerID = setInterval (tick, 240000);
      return () => {
        clearInterval (timerID);
      };
    },
    [props.configApp.banners]
  );

  useEffect (() => {

    const timerBanner = setInterval (getBanners, 20000);     
  }, []);

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={{color:'black'}}>{props.configApp.assets+'/'+imgBanner.arquivo}</Text> */}

            <TouchableOpacity
              style={styles.btnModalClose}
              onPress={() => setModalVisible (false)}
            >
              <Text style={{color: 'white'}}>OK, FECHAR BANNER</Text>
            </TouchableOpacity>

            <Image
              style={{
                flex: 1,
                width: 400,
                height: null,
                resizeMode: 'contain',
              }}
              source={{uri: props.configApp.assets + '/' + imgBanner.arquivo}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create ({
  btnModalClose: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
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
    flex: 1,
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    // padding: 5,
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

const mapStateToProps = state => ({configApp: state.configApp});
const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      setBanners,
    },
    dispatch
  );
export default connect (mapStateToProps, mapDispatchToProps) (ModalBanner);
