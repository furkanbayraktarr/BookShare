import React, { useEffect, useState } from "react"
import { TouchableOpacity,View,Text,Image } from "react-native"
import Modal from "react-native-modal"
import styles from "./ContentInputModal.style"
import Input from "../Input"
import Button from "../Button"
import {launchImageLibrary} from 'react-native-image-picker';
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import { showMessage } from "react-native-flash-message"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useFetch from "../../hooks/useFetch"


function ContentInputModal({onClose,visible, addBook,bookId}){

  const [text, setText] = useState(null) 
  const [photo, setPhoto] = useState(null)
  const [photoBook, setPhotoBook] = useState(null)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const userName = auth().currentUser.email.split('@')[0]

  const {data, error} = useFetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`) || null
    
  function fetchData(){
    try {
      database().ref(`users/${userName}/photo`).
      on(
      "value" , snapshot => {
        const contentData = snapshot.val()
        setProfilePhoto(contentData)
      })
      
    } catch (error) {
       console.log(error) 
    }

    data ? (setPhoto(null),setPhotoBook(data?.volumeInfo?.imageLinks?.smallThumbnail)) 
         : setPhotoBook(null)
    
  }

  useEffect(()=>{fetchData()},[data])

    const selectPhoto = () => {
        const options = {
          title: 'Select Photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
      
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
      
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
            setPhotoBook(null)
            setPhoto(imageUri);
          }
        });
      };

async function handleSend(){
    
    if(!text && !photo && !photoBook ){
        return
    }
    else{
     database().ref(`users/shared`).push(
        {
            name: userName,
            profilePhoto: profilePhoto?.photo,
            text: text,
            photo: photo,
            date: new Date().toISOString(),
            userLikes:{},
            likes:0,
            commentNumber:0,
            comments:{},
            bookImage: photoBook
          }
    )
    onClose()
    setText(null)
    setPhoto(null)
    setPhotoBook(null)
    
    }
}

function deletePhoto(){
    return(
        setPhoto(null)
    )
}
function deletePhotoBook(){
return(
  setPhotoBook(null)
)
}
function bookImage(){
  return(
    (<View> 
        <Image source={{uri:data?.volumeInfo?.imageLinks?.smallThumbnail}} 
               style={styles.image} />
               <TouchableOpacity style={styles.deleteButton} onPress={deletePhotoBook} >
        <Icon name="close-circle" size={20} color="black" />
      </TouchableOpacity>
     </View>)
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
    <View style={styles.input_container} >
        <Input theme="fourth"  placeholderTextColor="black" placeholder="Write about books..."
               value={text} autoFocus multiline onType={setText} />
    </View>
    {photo ? (
      <View>
            <Image style={styles.image} source={{uri: photo}} />
            <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto} >
        <Icon name="close-circle" size={20} color="black" />
      </TouchableOpacity>
      </View>
          ) : null}
          {photoBook ? bookImage() : error}
          <View style={styles.select_item_container} >
          <TouchableOpacity style={styles.select_galery} onPress={selectPhoto}>
        <Icon name="image" size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.select_addABook} onPress={() => addBook()}>
        <Text  >Add a Book</Text>
      </TouchableOpacity>
      </View>
        <Button text="Send" onPress={handleSend} />
    </View>
    </Modal>
)
}
export default ContentInputModal