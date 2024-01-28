import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
    container:{
        position:"absolute",
        bottom:80,
        right:20,
        borderRadius:50,
        width:55,
        height:55,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: colors.slategray,
    }
})