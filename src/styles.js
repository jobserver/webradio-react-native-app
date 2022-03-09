import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // home
  backgroundHome:{        
    height:'100%'
  },
  cabecalho:{
    flexDirection:'row',
    flexWrap:'nowrap',
    alignItems:"center",
    justifyContent:'space-between',
    
  },
  logotipo:{
    width:150,
    height:105,
    marginLeft:15
  },
  groupSocial:{
    flexDirection:'row',    
    
  },
  btnSocialTopo:{
    // backgroundColor:'blue',
    width:40,
    borderRadius:40,    
    marginRight:15
  },
  sessaoBotoesCentral:{
    backgroundColor:'black',
    flexDirection:'row',   
    justifyContent:'space-evenly',
    alignItems:'center',
    height:80
  },
  btnCentral:{
    padding:10,        
  }
  ,
  iconCenral:{
    alignSelf:'center',
    color:'white'

  }
  ,
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'black',
    },
    btn:{
      backgroundColor:'#ff0044',
      padding:15,
      borderRadius:10,
      margin:10,
      width:160,
    },
   
    btnSuccess:{
      backgroundColor:'#4CAF50',   
      padding:15,   
      margin:10,   
      justifyContent:'center',
      alignItems:'center',
      
    },
    btnDanger:{
      backgroundColor:'#F44336',
      padding:15,
      margin:10, 
      justifyContent:'center',
      alignItems:'center',  
    },
    text:{
      fontSize:30,
      color:'white',
      textAlign:'center'
    },
    row:{
      flexDirection:'row',
      marginBottom:30
    },
    descriptionPage:{
      margin:25,
      color:'black',
    },
    input: {
     height: 40,
     margin: 12,
     borderWidth: 0,
     padding: 10,
     borderBottomWidth:1,
     color:'black',
   },
   label:{
     marginLeft: 12,
     color:'black',
   },
   white:{
     color:'white'
   },
   
   textArea: {
     height: 120,
     justifyContent: "flex-start",
     borderColor: 'black',
     borderWidth: 1,
     margin: 12,
     color:'black'
   },

   



   });