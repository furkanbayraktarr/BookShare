import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"black"
      },
      header:{
        marginTop:10,
        marginBottom:15,
        color:"white",
        fontSize:30,
        alignSelf:"center",
      },
      header_seperator:{
        borderBottomWidth:0.8,
        borderBottomColor:colors.darkgray,
      },
      scroll:{
        marginBottom:100
      },
      main_container:{
        backgroundColor:"black",
        flex:1
    },
    Search:{
        padding:5,
        marginBottom:10,
    },
    container_searchedList:{
      marginBottom:200,
  },
    book_type_title:{
        fontSize:18,
        color:"white",
        marginLeft:20,
    },
    search:{
        flexDirection:"row",
        padding:10,
        borderRadius:10,
        margin:20,
        backgroundColor:"black",
        borderWidth:1,
        borderColor:colors.darkgray
    },
    search_text:{
        marginLeft:10,
        color:colors.darkgray
    },
    search_main_container:{
        flex:1,
        backgroundColor:"black"
      },
      seperator:{
        
        borderWidth:1,
        borderColor:'#e0e0e0'
        
      },
      iptal_text:{
        fontSize:15,
        color:"white",
        margin:2,
        marginRight:5,
        justifyContent:"center"
      },
      search_container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        margin:5,
        borderBottomWidth:0.5,
        borderColor:colors.darkgray
      },
      searchBar_container:{
        flex:1,
        marginLeft:5
      },
      image:{
        flex:1,
        height:50,
        width:50,
    },
    delete_button:{
      marginTop:2
    }
      
})