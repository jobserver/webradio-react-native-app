import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlayCircle, faStopCircle} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setRadioPlayStatus, setProgramacao} from '../redux/actions/configApp';

class NoAr extends Component {
  timeProgramacao =null;
  timeAgora = null;
  
  constructor (props) {
    super (props);
    this.state = {
      playList: [],
      noAr:{}
    };
  }

  parseTime(t){
    if (t) {
      let data = new Date ();
      let mes = (data.getMonth () + 1).toString ().padStart (2, '0');
      let dia = (data.getDate () + 1).toString ().padStart (2, '0');
      return new Date (data.getFullYear () + '-' + mes + '-' + dia + 'T' + t);
    }
  };

  tick = () => {
    if(this.state.playList.length>0){
      const hoje = new Date ().getDay ();

      let prog = this.state.playList.find (item => {
        // console.log (item.dia_semana);
        var ho = new Date ();
        return ((ho.getTime()>=item.hora_inicio.getTime() && ho.getTime() <=item.hora_fim.getTime() ) && item.dia_semana == hoje);
        });
      
      if (prog ===undefined) {            
        prog = this.state.playList.find (item => {  return ( item.padrao ==1 );  });       
      }
      
      if(prog.id != this.state.noAr?.id ){
          this.setState({noAr:prog});
      }
    }

  };

   getProgramacao = async()=>{
     try {
       const payload = {
         radioId: this.props.configApp.radioId,
         hash: this.props.configApp.programacao.hash,
        };
        const dados = await axios.post (
          this.props.configApp.api + '/getProgramacao',
          payload
          );
          if (dados.data.hash !== undefined) {
            let lista = dados.data.dados;
            console.log ('carregando.......');
            
            lista.forEach(function (element, index) {
              lista[index].hora_inicio = this.parseTime (element.hora_inicio);
              lista[index].hora_fim = this.parseTime (element.hora_fim);              
            },this);
            //lista com datas de hoje para filtrar programação no AR
            this.setState ({ playList: lista});            
        //cria lista de programação na página de programação
        // this.props.setProgramacao ({programacao: dados.data});
      }
    } catch (e) {}
  };
  

  // useEffect(()=>{

  //   tick();

  // },[props.configApp.programacao]);

  // console.log('passou aqui');
  //   useEffect(()=>{

    
    //   },[]);
    
    componentDidMount(){
      this.getProgramacao();
      this.timeProgramacao = setInterval(this.getProgramacao,15000);
      this.timeAgora = setInterval(this.tick,1000);
  }


  componentWillUnmount(){
    clearInterval(this.timeProgramacao);
    clearInterval(this.timeAgora);
  }


  render () {
    return (
      <View style={{flexDirection: 'column'}}>

        <View style={styles.centeredView}>
          <Image
            style={styles.imagem}
            source={{
              uri: this.props.configApp.assets+'/'+ this.state.noAr.foto_locutor,
            }}
          />

          <TouchableOpacity
            style={styles.btnPlay}
            onPress={() =>
              this.props.setRadioPlayStatus ({
                radioPlayStatus: !this.props.configApp.radioPlayStatus,
              })}
          >
            <FontAwesomeIcon
              icon={
                this.props.configApp.radioPlayStatus ? faStopCircle : faPlayCircle
              }
              size={60}
              color="red"
            />
          </TouchableOpacity>

        </View>

        <View
          style={{
            justifyContent: 'center',
            height: 50,
            paddingLeft: 15,
            marginTop: 30,
            marginLeft: 20,
            marginBottom: 20,
            borderLeftWidth: 6,
            borderLeftColor: 'red',
          }}
        >
          <Text style={{color: 'white', textTransform: 'uppercase'}}>
            {this.state.noAr.nome_programa}
          </Text>
          <Text style={{color: 'white', textTransform: 'uppercase'}}>            
            {this.state.noAr.locutor}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#24E9EB',
  },
  btnPlay: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    right: 100,
    top: 100,
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  textStyle: {
    fontSize: 20,
    // fontWeight: "bold",
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({configApp: state.configApp});
const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      setRadioPlayStatus,
      setProgramacao,
    },
    dispatch
  );
export default connect (mapStateToProps, mapDispatchToProps) (NoAr);
