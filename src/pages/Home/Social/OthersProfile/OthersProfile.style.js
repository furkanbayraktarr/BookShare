import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"black"
      },
      upper_tab_container:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginTop:10,
        marginBottom:10,
        borderBottomWidth:0.5,
        borderColor:colors.lightgray
      },
      selected_text:{
        color:"white",
        fontSize:18,
        margin:10
      },
      unselected_text:{
        color:colors.darkgray,
        fontSize:18,
        margin:10
      },
      selected_touch:{
        borderBottomWidth:2,
        borderBottomColor:"white",
        
      },
    button_container:{
        marginBottom:90,
    },
    name:{
        fontSize:20,
        color:"white",
        fontWeight:"bold",
        marginTop:5
    },
    swipeout:{
        backgroundColor:"black",
         borderRadius: 5, 
         marginTop:5,
         marginLeft:20,
         marginRight:20,
         marginBottom:10,
         borderWidth:0.5,
         borderColor:colors.darkgray
    },
    scroll_view:{
        marginBottom:110,
    },
    upper_container:{
      marginLeft:30,
      marginTop:10
    },
    back_container:{
      margin:10,
      flexDirection:"row",
    },
    back_text:{
      marginLeft:5,
      color:"white",
      fontSize:15
    },
    profile_photo:{
      width:45,
      height:45,
      borderRadius:50,
  },
})