import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import Login from "./pages/auth/Login";
import Sign from "./pages/auth/Sign";
import colors from "./styles/colors";
import auth from "@react-native-firebase/auth"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Profile from "./pages/Profile/Profile";
import Main from "./pages/Home/Main";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import BookDetail from "./pages/Home/BookDetail";
import OthersProfile from "./pages/Home/Social/OthersProfile";
import PostContent from "./pages/Home/Social/Post/PostContent";
import SharePost from "./pages/Home/Social/SharePost";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Router =()=>{

const [userSession, setUserSession] = useState()

useEffect(() => {auth().onAuthStateChanged((user) => 
    {setUserSession(!!user)} )} , [])


const AuthStack =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="SignPage" component={Sign} options={{headerShown:false}}/>
            
        </Stack.Navigator>
    )
}

const HomeStack=()=>{
    return(
    <Stack.Navigator>
        <Stack.Screen name="MainPage" component={Main} options={{headerShown:false}}/>
        <Stack.Screen name="MainBookDetailPage" component={BookDetail} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
}

const SocialStack=()=>{
    return(
    <Stack.Navigator>
        <Stack.Screen name="SharePost" component={SharePost} options={{headerShown:false}}/>
        <Stack.Screen name="OthersProfilePage" component={OthersProfile} options={{headerShown:false}}/>
        <Stack.Screen name="PostContentPage" component={PostContent} options={{headerShown:false}}/>
        <Stack.Screen name="SocialBookDetailPage" component={BookDetail} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
}

const ProfileStack=()=>{
    return(
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="ProfileBookDetailPage" component={BookDetail} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
}

const TabStack =()=>{
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor:"#696969", borderRadius:10, 
            position:"absolute",margin:15
        },
        tabBarShowLabel: false
          }}>
           <Tab.Screen name="SocialPage" component={SocialStack} options=
            {{headerShown:false,
                tabBarIcon: ({focused ,size }) => {
                    const iconColor = focused ? 'white' : colors.darkgray
                    return <Icon name={'home'}
                     size={size} color={iconColor} />}
                     
                      }} />
            <Tab.Screen name="HomePage" component={HomeStack} options=
            {{headerShown:false,
                tabBarIcon: ({focused ,size }) => {
                    const iconColor = focused ? 'white' : colors.darkgray
                    return <Icon name={'book-open-variant'}
                     size={size} color={iconColor} />}
                     }} /> 
            
            <Tab.Screen name="ProfilePage" component={ProfileStack} options=
            {{headerShown:false,
                tabBarIcon: ({focused ,size }) => {
                    const iconColor = focused ? 'white' : colors.darkgray
                    return <Icon name={'account'}
                     size={size} color={iconColor} />}
                     }} />
        </Tab.Navigator>
    )
}


    return(
        <NavigationContainer>
            <Stack.Navigator>
        {!userSession ? (<Stack.Screen name="AuthStack" component={AuthStack}
             options={{headerShown:false}}/>):
        (<Stack.Screen name="TabStack" component={TabStack} 
            options={{headerShown:false}}/> )}
        
            </Stack.Navigator>
            <FlashMessage position="top" />
        </NavigationContainer>
    )
}
export default Router