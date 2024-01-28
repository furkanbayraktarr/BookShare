import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export default StyleSheet.create({
    container:{
        borderBottomColor:colors.darkgray,
        borderBottomWidth:0.3,
        padding:5,
    },
    inner_container:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:3,
        marginBottom:0
    },
    user:{
        color:"white",
        fontSize:15,
        fontWeight:"bold",
        marginLeft:5,
        alignSelf:"center"
    },
    date:{
        color:colors.darkgray,
        fontSize:12,
        fontStyle:"italic"

    },
    text:{
        color:"white",
        fontSize:17,
        marginTop:5,
        margin:3,
        marginLeft:49,
        marginBottom:5

    },
    image:{
        height:130,
        width:80,
        alignSelf:"center",
        marginBottom:5,
        marginTop:5
    },
    like:{
        color:colors.darkgray,
        marginLeft:3,
    },
    like_container:{
        marginLeft:49,
        marginTop:5,
        marginBottom:2,
        flexDirection:"row"
    },
    profile_photo:{
        width:30,
        height:30,
        borderRadius:50,
    },
    profile_container:{
          flexDirection:"row",
          marginLeft:5
    },
    date_close_container:{
        flexDirection:"row"
    }

})