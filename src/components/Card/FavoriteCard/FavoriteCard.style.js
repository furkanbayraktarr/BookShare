import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export default StyleSheet.create({
    book_container:{
        margin:5,
        marginRight:0,
        flexDirection:"row"
    },
    book_title:{
        width:Dimensions.get("window").width-150,
        marginLeft:10,
        fontSize:15,
        color:"white"
    },
    book_author:{
        width:Dimensions.get("window").width-150,
        marginLeft:10,
        fontSize:12,
        color:colors.darkgray
    },
    image:{
        height:60,
        width:80,
    },
    delete_container:{
        backgroundColor:"red",
        width:30,
        height:130,
        alignItems:"center",
        justifyContent:"center",
        marginTop:15
    },
    container:{
        flexDirection:"row"
    }
})