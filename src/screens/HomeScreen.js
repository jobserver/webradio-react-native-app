import React,{useEffect,useState} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';
import styles from '../styles';
import TrackPlayer from 'react-native-track-player';
import {useNavigation} from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { setConfigIdApp } from '../redux/actions/configApp';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMusic,
  faSignLanguage,
  faShareAlt,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import NoAr from '../components/NoAr';
import ShareButton from '../components/ShareButton';

const HomeScreen = (props) => {
  const navigation = useNavigation ();


  useEffect(()=>{
    console.log(props.configApp);
    // console.log('iniciar automaticmaente');
    // TrackPlayer.play();
  },[]);

  useEffect(()=>{
    // console.log(props.configApp.radioPlayStatus);
    if(props.configApp.radioPlayStatus){
      TrackPlayer.play();
    }else{
      TrackPlayer.stop()
    }


  },[props.configApp.radioPlayStatus])

  return (
    <View style={{backgroundColor:'black',height:'100%'}}>
      <ImageBackground
        style={styles.backgroundHome}
        resizeMode="cover"
        source={require ('../img/background.jpg')}
      >
        <View style={styles.cabecalho}>
          <Image
            style={styles.logotipo}
            source={require ('../img/logotipo.png')}
          />

          {/* icones sociais topo */}
          <View style={styles.groupSocial}>
            <TouchableOpacity style={styles.btnSocialTopo} onPress={() => {Linking.openURL(`${props.configApp.configRadio.dados.facebook}`);}}>

              <FontAwesomeIcon icon={faFacebook} size={28} color="#144e81" />

            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSocialTopo} onPress={() => {Linking.openURL(`${props.configApp.configRadio.dados.instagram}`);}}>
              <FontAwesomeIcon icon={faInstagram} size={28} color="#144e81" />

            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSocialTopo} onPress={() => {Linking.openURL(`https://api.whatsapp.com/send?1=pt_BR&phone=55${props.configApp.configRadio.dados.whatsapp}`);}}>
              <FontAwesomeIcon icon={faWhatsapp} size={28} color="#144e81" />
            </TouchableOpacity>
          </View>
        </View>

          <NoAr />

        <View style={styles.sessaoBotoesCentral}>
          <TouchableOpacity
            style={styles.btnCentral}
            onPress={() => navigation.navigate ('PedirMusica')}
          >
            <FontAwesomeIcon
              icon={faMusic}
              size={28}
              style={styles.iconCenral}
            />
            <Text style={{color: 'white'}}>Pedir Música</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCentral}
            onPress={() => navigation.navigate ('PedirOracao')}
          >
            <FontAwesomeIcon
              icon={faSignLanguage}
              size={28}
              style={styles.iconCenral}
            />
            <Text style={{color: 'white'}}>Pedir Oracao</Text>
          </TouchableOpacity>        

          <ShareButton configRadio={props.configApp.configRadio.dados} />
        </View>

        <View style={{...styles.row, justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.btnSuccess, width:250,margin:15, flexDirection:'row'}}
            onPress={() => {Linking.openURL(`tel:${props.configApp.configRadio.dados.telefone}`);}  }
          >
            <FontAwesomeIcon
              icon={faPhone}
              size={28}
              style={styles.iconCenral}
            />

            <Text style={{color:'white', marginLeft:10,  textTransform: 'uppercase'}}>Ligar para Rádio</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state) => ({configApp: state.configApp });
// const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//     setConfigIdApp,
//   }, dispatch)
// );
export default connect(mapStateToProps)(HomeScreen);