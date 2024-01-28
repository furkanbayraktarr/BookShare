import React, { useState } from "react"
import { SafeAreaView, Text, View } from "react-native"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import styles from './Login.style'
import { Formik} from 'formik'
import auth from '@react-native-firebase/auth'
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser"
import colors from "../../../styles/colors"


function Login ({navigation}) {

const [loading, setLoading] = useState(false)

function onSelect(){
    navigation.navigate("SignPage")
}

const initialFormValues={
    usermail:"",
    password:""
}

async function handleFormSubmit (formValues) {
  
  try {
    setLoading(true)
    if(!formValues.usermail || !formValues.password ){
    showMessage(
      {
        message: "Fill in the blank fields",
        type:"danger"
    }
    )
    setLoading(false)
    return
  }
  await auth().signInWithEmailAndPassword(
    formValues.usermail,
     formValues.password
  )
    setLoading(false)

    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code) ,
        type:"danger"
      })
      setLoading(false)
        
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
        placeholder="E-mail"
        placeholderTextColor={colors.darkgray}
        value={values.usermail}
        onType={handleChange("usermail")}
        iconName="email"
      />
      <Input 
        placeholder="Password"
        placeholderTextColor={colors.darkgray}
        value={values.password}
        onType={handleChange("password")}
        isSecure
      />
      <Button text="Log In" onPress={handleSubmit} loading={loading}/>
      <Button text="Create Account" theme="secondary" onPress={onSelect} />
      </View>
    </>
  )}
</Formik>
            
        </SafeAreaView>
    )
}
export default Login
