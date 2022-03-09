import React from 'react';
import { Share, View, TouchableOpacity,Text } from 'react-native';
import styles from '../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';

const ShareButton = ({configRadio}) => {
  
  const onShare = async () => {
  
    const site = (configRadio.site)? "\n \n Pelo site: \n"+ configRadio.site + "\n": "";
    const app = (configRadio.googlePlay)? "\n \n Baixe nosso aplicativo na Google Play: \n"+ configRadio.googlePlay+ "\n": "";
    const social = (configRadio.facebook||configRadio.instagram||configRadio.youtube)? "\n \n Acompanhe nas redes sociais: "+"\n": "";
    const facebook = (configRadio.facebook)? "\n Facebook: \n"+ configRadio.facebook+ "\n": "";
    const instagram = (configRadio.instagram)? "\nInstagram: \n"+ configRadio.instagram+ "\n": "";
    const youtube = (configRadio.youtube)? "\n Youtube: \n"+ configRadio.youtube+ "\n": "";
  
    const options = 
    {
      message: 'Ouça a ' + configRadio.nome_radio+" "+site+app+social+facebook+instagram+youtube, 
      subject: configRadio.nome_radio+ ' ouça agora!'
    };

    try {
      const result = await Share.share({
        message:options.message,
      },
      {subject:options.subject}
       );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  
     <TouchableOpacity
            style={styles.btnCentral}
            onPress={() =>{onShare()}}
          >
            <FontAwesomeIcon
              icon={faShareAlt}
              size={28}
              style={styles.iconCenral}
            />
            <Text style={{color: 'white'}}>Compartilhar</Text>
          </TouchableOpacity>
   
  );
};

export default ShareButton;