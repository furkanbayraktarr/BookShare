import React from "react";
import { TouchableOpacity, } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import styles from './FloatingButton.style'

function FloatingButton({onPress,}) {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress} >
            <Icon name="plus" color="white" size={30} />
        </TouchableOpacity>
    )
}

export default FloatingButton