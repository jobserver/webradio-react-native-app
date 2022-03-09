import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';
import styles from '../styles';
import TextField from '../components/TextField';

import {useNavigation} from '@react-navigation/native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setConfigIdApp} from '../redux/actions/configApp';

import ModalAlert from '../components/ModalAlert';

const PedirMusicaScreen = (props) => {
  //Navegação entre telas
  const navigation = useNavigation ();

  //Controle de visibilidade do alerte de confirmação
  const [modalVisible, setModalVisible] = useState (false);
  const [modalFrase, setModalFrase] = useState ('');

  //Formulário do pedido de oração
  const [formPedido, setFormPedido] = useState ({
    artista: '',
    musica: '',
    seu_nome: '',
    data_nascimento: '',
  });

  //enviar pedido de música
  const sendPedido =  async () =>
			{				
        try{
          const payload = {
            radioId:props.configApp.radioId,            
            programacao_id:	33,
            formulario:formPedido
          };
          
          // if(true ){
          if(formPedido?.seu_nome  && formPedido?.musica ){
            const dados =  await axios.post(props.configApp.api+'/setPedidoMusica',payload);
            
              if(dados.data.status.classe=='green'){
                setModalFrase("Pedido de Música enviado com sucesso!");
                setModalVisible(true);
                setFormPedido({});            
              }
                else{
                  ToastAndroid.show('Algo deu errado. Tente novamente mais tarde',ToastAndroid.SHORT);
                }                        
          }
          else{
            ToastAndroid.show('Preencha os campos Nome e Pedido',ToastAndroid.SHORT);
          }          
        }
        catch(e){

        }        							
			};

  return (
    <ScrollView>
      <View>
        <ModalAlert visible={modalVisible} onChangeState={setModalVisible} frase={modalFrase} />
        <Text style={styles.descriptionPage}>
          Quer ouvir uma música? então faça seu pedido!
        </Text>        
        <TextField
          label={'Artista'}
          onChangeText={text => setFormPedido ({...formPedido, artista: text})}
          value={formPedido.artista}
        />
        <TextField
          label={'Música'}
          onChangeText={text => setFormPedido ({...formPedido, musica: text})}
          value={formPedido.musica}
        />
        <TextField
          label={'Seu nome'}
          onChangeText={text => setFormPedido ({...formPedido, seu_nome: text})}
          value={formPedido.seu_nome}
        />
        <TextField
          label={'Data de Nascimento'}
          onChangeText={text =>
            setFormPedido ({...formPedido, data_nascimento: text})}
          value={formPedido.data_nascimento}
        />

        <TouchableOpacity
          style={styles.btnSuccess}
          onPress={() => sendPedido()}
        >
          <Text style={styles.white}>Enviar Pedido de música</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnDanger}
          onPress={() => setFormPedido ({})}
        >
          <Text style={styles.white}>Cancelar</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({configApp: state.configApp});
const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      setConfigIdApp,
    },
    dispatch
  );
export default connect (mapStateToProps, mapDispatchToProps) (
  PedirMusicaScreen
);
