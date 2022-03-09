import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../src/screens/HomeScreen';
import PedirMusicaScreen from '../src/screens/PedirMusicaScreen';
import OracaoScreen from '../src/screens/OracaoScreen';


const Stack = createNativeStackNavigator();

const Routes = () =>{
    return (

        <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown : true }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome',headerShown : false }}
          />
  
        <Stack.Screen
         name="PedirMusica" 
         component={PedirMusicaScreen}
         options={{title:'Pedir Música'}} />

        <Stack.Screen
         name="PedirOracao" 
         component={OracaoScreen}
         options={{title:'Pedido de Oração'}} />

      </Stack.Navigator>
    </NavigationContainer>
        );
     };

  export default Routes;