import React, {useState,useEffect} from "react"
import { SafeAreaView,Image,View, Text, ScrollView, TouchableOpacity} from "react-native"
import styles from "./BookDetail.style"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import useFetch from "../../../hooks/useFetch"
import Button from "../../../components/Button"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import parseContentData from "../../../utils/parseContentData"
import { showMessage } from "react-native-flash-message"


function BookDetail({navigation,route}){

const userName = auth().currentUser.email.split('@')[0]
const [favoriteList, setFavoriteList] = useState([])
const [readedList, setReadedList] = useState([])

const {bookId} = route.params 

const {data} = useFetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)

function goBack (){
  navigation.goBack()
}

const bookInfo ={
  title: (data?.volumeInfo?.title ? data.volumeInfo.title : {}),
  authors: (data?.volumeInfo?.authors ? data.volumeInfo.authors : {}),
  categories: (data?.volumeInfo?.categories ? data.volumeInfo.categories[0] : {} ),
  image: (data?.volumeInfo?.imageLinks?.smallThumbnail ? data.volumeInfo.imageLinks.smallThumbnail : {}),
  id: (data?.id ? data.id : {})
}

const favoritedBook = favoriteList.find(item=> item.id === bookId )
const readedBook = readedList.find(item=> item.id === bookId )

function addFavorites (){
  if(favoritedBook){
    showMessage(
      {
        message: "This book is already in your favorites",
        type:"danger"
    }
    )
    return
  }
  else{
  database().ref(`users/${userName}/favorites/`).push(bookInfo)
}
}

function addReaded (){
  if(readedBook){
    showMessage(
      {
        message: "This book is already in your readed list",
        type:"danger"
    }
    )
    return
  }
  else{
  database().ref(`users/${userName}/readed/`).push(bookInfo)
}
}

const fetchData = () => {

  try {
      database().ref(`users/${userName}`)
      .on('value', snapshot=> {
      const contentData = snapshot.val()
      const favorites = contentData?.favorites || {} 
      const readed = contentData?.readed || {}
      const parseFavoritesData = parseContentData(favorites || {})
      const parseReadedData = parseContentData(readed || {})
      setFavoriteList(parseFavoritesData)
      setReadedList(parseReadedData)
      })
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}

useEffect(()=>{fetchData()},[])

    return(
        <SafeAreaView style={styles.container}>
          <ScrollView >
          <TouchableOpacity style={styles.back_container} onPress={goBack}>
        <Icon name="arrow-left" size={20} color={"white"} />
        <Text style={styles.back_text} >Back</Text>
        </TouchableOpacity>
    <View style={styles.upper_container} >  
    {data?.volumeInfo?.imageLinks?.smallThumbnail &&
       <Image source={{uri:data.volumeInfo.imageLinks.smallThumbnail}} style={styles.image} /> } 
        <View>
        {data?.volumeInfo?.title && <Text  style={styles.title} >{data.volumeInfo.title}</Text>}
        {data?.volumeInfo?.authors && <Text  style={styles.author} >{data.volumeInfo.authors[0]} {data.volumeInfo.authors[1]}</Text>}
        {data?.volumeInfo?.categories && <Text  style={styles.category} >{data.volumeInfo.categories[0]}</Text>}
        </View>
        </View>
        <View style={styles.seperator}></View>
        <View style={styles.button_container} >
        <Button text="Add to Favorites" onPress={addFavorites}/>
        <Button text="Add to Readed" onPress={addReaded}/>
        </View>
        <View style={styles.seperator}></View>
        {data?.volumeInfo?.description && <Text style={styles.description_title}>Description:</Text>}
        <View>
        {data?.volumeInfo?.description && <Text style={styles.description}>{data?.volumeInfo?.description}</Text>}
        </View>
        </ScrollView>
      </SafeAreaView>
      
    )


}
export default BookDetail

