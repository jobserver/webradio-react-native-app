import { CONFIG_INICIAL,CONFIG_RADIO,CONFIG_BANNER,CONFIG_NOAR,CONFIG_RADIO_PLAY_STATUS,CONFIG_PROGRAMACAO } from '../actions/types';

const INITIAL_STATE ={ 
radioId : '',
api : '',
assets:null,
configRadio : {dados:null,hash:null},
banners :'',
noAr :'',
programacao :'',
radioPlayStatus:true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CONFIG_INICIAL:    
        let {
          radioId,
          api, 
          assets         
        } = action.payload;
        
        assets +=radioId

        return {...state, radioId, api, assets};
   
    case CONFIG_RADIO:    
          const {
            configRadio         
              } = action.payload;              

        return {...state, configRadio};
    
    case CONFIG_BANNER:    
          const {
            banners         
              } = action.payload;              

        return {...state, banners};
    
    case CONFIG_NOAR:    
          const {
            noAr         
              } = action.payload;              

        return {...state, noAr};

        case CONFIG_RADIO_PLAY_STATUS:            
          const {
            radioPlayStatus         
              } = action.payload;              

        return {...state, radioPlayStatus};
   
        case CONFIG_PROGRAMACAO:            
          const {
            programacao         
              } = action.payload;              

        return {...state, programacao};

    default:
      return state
  }
};