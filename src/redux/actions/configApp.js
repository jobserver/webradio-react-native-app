import { CONFIG_INICIAL,CONFIG_RADIO,CONFIG_BANNER,CONFIG_NOAR,CONFIG_RADIO_PLAY_STATUS,CONFIG_PROGRAMACAO } from "./types";

export const setConfigIdApp = appRadio => (    
  {
      type: CONFIG_INICIAL,
      payload: appRadio,
    }
  );

  export const setConfigRadio = radioConfig => (    
  {
      type: CONFIG_RADIO,
      payload: radioConfig,
    }
  );

  export const setBanners = banners => (    
  {
      type: CONFIG_BANNER,
      payload: banners,
    }
  );

  export const setNoAr = noAr => (    
  {
      type: CONFIG_NOAR,
      payload: noAr,
    }
  );

  export const setRadioPlayStatus = status => (    
  {
      type: CONFIG_RADIO_PLAY_STATUS,
      payload: status,
    }
  );
  export const setProgramacao = dados => (    
  {
      type: CONFIG_PROGRAMACAO,
      payload: dados,
    }
  );