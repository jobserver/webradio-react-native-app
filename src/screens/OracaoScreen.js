import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ToastAndroid
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import TextField from '../components/TextField';

import styles from '../styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setConfigIdApp } from '../redux/actions/configApp';

import ModalAlert from '../components/ModalAlert';

const OracaoScreen = (props) => {

  const navigation = useNavigation ();  

  const [modalVisible,setModalVisible] = useState(false);
  const [modalFrase, setModalFrase] = useState ('');

  const [formOracao, setFormOracao] = useState ({
    nome: '',
    celular: '',
    cidade: '',
    igreja: '',
    pedido: '',
  });
  console.log(props.configApp);

  const sendOracao =  async () =>
			{				
        try{
          const payload = {
            radioId:props.configApp.radioId,
            // programacao_id:	$scope.noAr[0].id,
            programacao_id:	33,
            formulario:formOracao
          };
          
          if(formOracao?.nome  && formOracao?.pedido ){

            const dados =  await axios.post(props.configApp.api+'/setPedidoOracao',payload);
            if(dados.data.status.classe=='green'){
              setModalFrase("Pedido de Oração enviado com sucesso!");
              setModalVisible(true);
              setFormOracao({});            
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
    <ScrollView keyboardShouldPersistTaps="handled">
      <View>
        <ModalAlert visible={modalVisible} onChangeState={setModalVisible} frase={modalFrase} />
        <Text>         
          {/* {JSON.stringify (props.configApp.configRadio)} */}        
          {/* {JSON.stringify (formOracao)}         */}
        </Text>
        <TextField
          label={'Nome'}
          onChangeText={text => setFormOracao ({...formOracao, nome: text})}
          value={formOracao.nome}
        />
        <TextField
          keyboardType="phone-pad"
          label={'Celular'}
          onChangeText={text => setFormOracao ({...formOracao, celular: text})}
          value={formOracao.celular}
        />
        <TextField
          label={'Cidade'}
          onChangeText={text => setFormOracao ({...formOracao, cidade: text})}
          value={formOracao.cidade}
        />
        <TextField
          label={'Igreja'}
          onChangeText={text => setFormOracao ({...formOracao, igreja: text})}
          value={formOracao.igreja}
        />

        <Text style={styles.label}>Pedido</Text>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          numberOfLines={10}
          multiline={true}
          onChangeText={text => setFormOracao ({...formOracao, pedido: text})}
          value={formOracao.pedido}
        />

        <TouchableOpacity
          style={styles.btnSuccess}
          onPress={() => sendOracao()}
          // onPress={() => props.setConfigIdApp(
          //   {radioId : 2020,
          //   api : 'https://radios.jobserver.com.br/appradio',})
          // }

          // onPress={() => navigation.navigate ('Home')}
        >
          <Text style={styles.white}>Enviar Pedido de oração</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnDanger}
          onPress={() => setFormOracao({})}
        >
          <Text style={styles.white}>Limpar Formulário</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({configApp: state.configApp });
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setConfigIdApp,
  }, dispatch)
);
export default connect(mapStateToProps,mapDispatchToProps)(OracaoScreen);