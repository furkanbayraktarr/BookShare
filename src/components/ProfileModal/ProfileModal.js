import React, { useState } from "react"
import { TouchableOpacity,View,Text,Image  } from "react-native"
import Modal from "react-native-modal"
import styles from "./ProfileModal.style"
import Button from "../Button"
import {launchImageLibrary} from 'react-native-image-picker';
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import { showMessage } from "react-native-flash-message"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../styles/colors"


function PostInputModal({onClose,visible,deleteProfilePhoto}){
  
  const userName = auth().currentUser.email.split('@')[0]
  const [photo, setPhoto] = useState(null);

    const selectPhoto = () => {
        const options = {
          title: 'Select Photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
      
        launchImageLibrary(options, (response) => {
  
          if (response.didCancel) {
            console.log('User cancelled the selection.');
          } else if (response.error) {
            showMessage(
                {
                    message:"An error occurred while selecting a photo.",
                    type:"danger"
                }
            )
          } else {
            const imageUri =  response.assets?.[0]?.uri;
            setPhoto(imageUri);
          }
        });
      };

async function handleSend(){
    if(!photo){
        return
    }
    else{
     database().ref(`users/${userName}/photo`).set(
      {   
        photo
      }
     )
     setPhoto(null)
    }
}



function deletePhoto(){
    return(
        setPhoto(null)
    )
}

return(
    <Modal
    style={styles.modal_container}
    swipeDirection="down"
    isVisible={visible}
    onSwipeComplete={onClose}
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
    >
    <View style={styles.container}>
    <View style={styles.select_item_container} >
      <TouchableOpacity style={styles.select_photo} onPress={selectPhoto}>
        <Icon name="image" size={25} color="white" />
        <Text style={styles.select_photo_text} >Select from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.delete_profilePhoto} onPress={deleteProfilePhoto}>
        <Icon name="delete-outline" color={colors.firebrick} size={25} />
        <Text style={styles.select_delete_text} >Remove existing image</Text>
      </TouchableOpacity>
      </View>
    {photo ? (
      <View>
            <Image style={styles.image} source={{uri: photo}} />
            <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto} >
        <Icon name="close-circle" size={20} color="black" />
      </TouchableOpacity>
      </View>
          ) : null}
        <Button text="Apply" onPress={handleSend} />
    </View>
    </Modal>
)
}
export default PostInputModal