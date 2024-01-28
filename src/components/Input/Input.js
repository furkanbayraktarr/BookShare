import React, { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from './Input.style'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


function Input({placeholder,multiline,value,onType,isSecure,autoFocus,placeholderTextColor,clear=false,theme="primary"}){

    const [inputValue, setInputValue] = useState(value || "");

    const clearInput = () => {
      setInputValue("");
    };

    return(
        <SafeAreaView style={styles[theme].outer_container}>
            <TextInput
            style={styles[theme].container}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={isSecure}
            value={inputValue}
            onChangeText={(text) => {
                setInputValue(text)
                onType(text)
              }}
            autoFocus={autoFocus}
            multiline={multiline}
            />
            {clear === true && inputValue.length > 0 && (
        <TouchableOpacity onPress={clearInput} style={styles[theme].icon_container} >
          <Icon name="close-circle" size={15} color="gray" />
        </TouchableOpacity>
      )}
            </SafeAreaView>
    )
}

export default Input
