import React,{useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import axios from 'axios';

import TrackPlayer, { Capability } from 'react-native-track-player';
import Routes  from './src/Routes';

import { Provider } from 'react-redux';
import { store } from './src/redux/configureStores';

import { setConfigIdApp, setConfigRadio} from './src/redux/actions/configApp'
import ModalBanner from './src/components/ModalBanner';

TrackPlayer.updateOptions({
  // Media controls capabilities
  capabilities: [
      Capability.Play,
      Capability.Stop,
  ],

  // Capabilities that will show up when the notification is in the compact form on Android
  compactCapabilities: [Capability.Play, Capability.Stop],

  // Icons for the notification on Android (if you don't like the default ones)
  playIcon: require('./icones/play-icon.png'),  
  stopIcon: require('./icones/stop-icon.png'),    
  icon: require('./icones/musica.png')
});

store.dispatch(setConfigIdApp( {
  radioId : 2020,
  api : 'https://radios.jobserver.com.br/appradio',
  assets:'https://radios.jobserver.com.br/uploads/'
}
));

const App = ()  => {
  
  const [tracks,setTracks] = useState(
     [{
      id:1,                       
      url:null,
      title:null
      }]
      );
 
  const getConfigRadio =  async () =>
  {				        
        try{
          const dados =  await axios.post(store.getState().configApp.api+'/getRadio',{'radioId':store.getState().configApp.radioId});
                    
          store.dispatch(setConfigRadio({configRadio:dados.data}));

           setTracks(
            [{
              id:1,                       
              url:store.getState().configApp.configRadio.dados.stream1,
              title:store.getState().configApp.configRadio.dados.nome_radio
              }]
           );

            }
            catch(e){

            }
        							
			};

      const setUpTrackPlayer = async () =>{
        try{
          // console.log('iniciando set play');
          await TrackPlayer.setupPlayer();
          await TrackPlayer.add(tracks);          
          await TrackPlayer.play();          
        }catch(e){
          console.log(e);
        }
      }

      //inicialização 
      useEffect(()=>{
      
        getConfigRadio();            
      
      },[]);


      //mudança em tracks
      useEffect(()=>{    
        if(tracks[0].url !=null){
          // console.log('oioi');
          setUpTrackPlayer();          
          return ()=>TrackPlayer.destroy();
        } 
      },[tracks]);

  
  return (

    <SafeAreaView style={{flex: 1,}}>
    <Provider store={store}>
    <ModalBanner />
    <Routes />    
    
    </Provider>
    </SafeAreaView>
  );

};

export default App;