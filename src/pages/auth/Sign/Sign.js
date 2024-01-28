import React, {useState,useEffect} from "react";
import { SafeAreaView, View,Text } from "react-native";
import styles from './Sign.style'
import Input from "../../../components/Input";
import {Formik} from 'formik'
import Button from "../../../components/Button";
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";
import auth from '@react-native-firebase/auth'
import database from "@react-native-firebase/database"
import colors from "../../../styles/colors";


function Sign ({navigation}) {

  const [userNamesList, setUserNamesList] = useState(null)

  function fetchUserNames(){
    
      try {
            
        database().ref(`userNames`)
        .once('value', snapshot=> {
        const NAME = snapshot.val() || {}
        setUserNamesList(NAME)
        console.log(NAME)})
        


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
  }

  useEffect(()=>{fetchUserNames()},[])

const initialFormValues = {
    usermail:"",
    password:"",
    repassword:"",
}


function onSelect(){
  navigation.navigate("LoginPage")
}

async function handleFormSubmit (formValues) {
  const userName = formValues.usermail.split('@')[0]

  if(!formValues.usermail || !formValues.password 
    || !formValues.repassword){
    showMessage(
      {
        message: "Fill in the blank fields",
        type:"danger"
    }
    )
    
    return
  }
  if(formValues.password !== formValues.repassword){
    showMessage({
      message:"The passwords you entered do not match",
      type:"danger"
    })
    
    return
  }
  if(userNamesList[userName] ){
    showMessage({
      message:"The username is defined for another user.",
      type:"danger"
    })
    
    return
  }
    try {
       auth().createUserWithEmailAndPassword(
            formValues.usermail,
            formValues.password,
        )
      
       database().ref(`userNames/${userName}`).push(userName)
        
       showMessage({
          message:"Your registration has been created successfully." ,
          type:"success"
        })
        

    } catch (error) {
      
      showMessage({
        message:authErrorMessageParser(error.code) ,
        type:"danger"
      })
        console.log(error.Error)
    }
}

    return(
        <SafeAreaView style={styles.container} >
          <View style={styles.logo_container} >
          <Text style={styles.header}>BookShare</Text>
          </View>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
  {({ values, handleChange, handleSubmit }) => (
    <>
    <View style={styles.inner_container} >
      <Input 
        placeholder="Enter your e-mail address"
        placeholderTextColor={colors.darkgray}
        value={values.usermail}
        onType={handleChange("usermail")}
      />
      <Input 
        placeholder="Choose Password"
        placeholderTextColor={colors.darkgray}
        value={values.password}
        onType={handleChange("password")}
        isSecure
      />
      <Input 
        placeholder="Re-enter your password"
        placeholderTextColor={colors.darkgray}
        value={values.repassword}
        onType={handleChange("repassword")}
        isSecure
      />
      <Button text="Submit" onPress={handleSubmit} />
      <Button text="Log In" theme="secondary" onPress={onSelect} />
      </View>
    </>
  )}
</Formik>
            
        </SafeAreaView>
)
}

export default Sign