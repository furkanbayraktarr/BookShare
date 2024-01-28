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
        height: deviceSize.height/3,
        
    },
    modal_container:{
        justifyContent:"flex-end",
        margin:0,
    },
    image:{
        width:100,
        height:120,
        alignSelf:"center",
    },
    deleteButton:{
        position:"absolute",
        left:205,
        top:3
    },
    select_photo:{
        flexDirection:"row",
        width:157,
        marginBottom:5
    },
    select_photo_text:{
        color:"white",
        fontWeight:"bold",
        width:124,
        marginLeft:10,
        alignSelf:"center"
    },
    select_item_container:{
        flex:1
    },
    select_delete_text:{
        color:colors.firebrick,
        fontSize:15,
        fontWeight:"bold",
        marginLeft:10,
        width:160,
        alignSelf:"center"
    },
    delete_profilePhoto:{
        flexDirection:"row",
        width:197,
    }
})