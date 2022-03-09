import React from "react";
import {Text,TextInput,View} from "react-native"
import styles from "../styles";


const TextField = ({label,...inputProps}) =>(
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...inputProps}
      />
  </View>
  );


  export default TextField;