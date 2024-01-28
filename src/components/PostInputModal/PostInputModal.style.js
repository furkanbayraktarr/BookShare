import { Dimensions, StyleSheet } from "react-native";
import colors from "../../styles/colors";

const deviceSize = Dimensions.get("window")

export default StyleSheet.create({
    container:{
        backgroundColor:colors.slategray,
        padding:10,
        marginLeft:20,
        marginRight:20,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height: deviceSize.height/2.5,
        
    },
    modal_container:{
        justifyContent:"flex-end",
        margin:0,
    },
    input_container:{
        flex:1,
    },
    image:{
        width:100,
        height:120,
        alignSelf:"center",
    },
    select_galery:{
        width:30,
        marginBottom:10,
        marginTop:10
    },
    deleteButton:{
        position:"absolute",
        left:205,
        top:3
    },
    select_addABook:{
        width:80,
        height:25,
        marginBottom:10,
        marginTop:10,
        backgroundColor:colors.darkgray,
        alignItems:"center",
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:5,
        marginLeft:10,
        padding:2
    },
    select_item_container:{
        flexDirection:"row"
    }
})