import { Dimensions, StyleSheet } from "react-native";
import colors from '../../styles/colors'

const base_style = StyleSheet.create({
    outer_container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    container:{
        padding:5,
        borderWidth:1,
        borderColor: colors.lightgray,
        borderRadius:5,
        color:"white",
        flex:1
    },
    icon_container:{
        marginRight:10
    }
    
})

const deviceSize= Dimensions.get("window")

export default {
    primary: StyleSheet.create({
        outer_container:{
            ...base_style.outer_container
        },
        container:{
            ...base_style.container,
            marginLeft:20,
            marginRight:20,
            margin:10,

        },
        icon_container:{
            ...base_style.icon_container
        }}
    ),
    secondary: StyleSheet.create({
        outer_container:{
            ...base_style.outer_container
        },
        container:{
            ...base_style.container,
            margin:10,
            marginLeft:80,
            marginRight:80
        },
        icon_container:{
            ...base_style.icon_container
        }}
        ),
    thirdly: StyleSheet.create({
        outer_container:{
            ...base_style.outer_container
        },
        container:{
            ...base_style.container,
            marginLeft:5,
            margin:10,
            padding:10,
            width:deviceSize.width/3-20,
            height: 50,
            borderRadius:15,
        },
        icon_container:{
            ...base_style.icon_container
        }}
        ),
        fourth: StyleSheet.create({
            outer_container:{
                ...base_style.outer_container
            },
            container:{
                ...base_style.container,
                color:"black",
                borderWidth:0,
            },
            icon_container:{
                ...base_style.icon_container
            }}
        ),
    alternative: StyleSheet.create({
        outer_container:{
            ...base_style.outer_container
        },
        container:{
            ...base_style.container,
            color:colors.darkgray,
            borderWidth:0,
        },
        icon_container:{
            ...base_style.icon_container
        }}
    )
}