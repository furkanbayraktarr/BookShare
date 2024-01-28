import React, {useEffect,useState} from "react";
import { View,Text,TouchableOpacity, ScrollView, FlatList, Alert } from "react-native"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import parseContentData from "../../../../utils/parseContentData";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../../styles/colors";
import styles from "./SharePost.style"
import ContentInputModal from "../../../../components/ContentInputModal";
import FloatingButton from "../../../../components/FloatingButton";
import PostCard from "../../../../components/Card/PostCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BookCard from "../../../../components/Card/BookDetailCard/BookCard";
import axios from "axios";
import SearchBar from "../../../../components/SearchBar";
 

function SharePost({navigation}){
  
const [sharedPosts , setSharedPosts ] = useState([])
const [visibleState, setVisibleState] = useState(false)
const userName = auth().currentUser.email.split('@')[0]


const [psychology,setPsychology] = useState([])
const [history, setHistory] = useState([])
const [novel,setNovel] = useState([])
const [science,setScience] = useState([])
const [comic,setComic] = useState([])
const [health,setHealth] = useState([])
const [searchedList, setSearchedList] = useState([])
const [pageView, setPageView] =useState("social")
const [bookId,setBookID] = useState(null)
  
const psychologyBooks = "https://www.googleapis.com/books/v1/volumes?q=subject:psychology&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
const historyBooks = "https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
const novelBooks = "https://www.googleapis.com/books/v1/volumes?q=subject:novel&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
const scienceBooks ="https://www.googleapis.com/books/v1/volumes?q=subject:science&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
const comicBooks = "https://www.googleapis.com/books/v1/volumes?q=subject:comic&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
const healthBooks= "https://www.googleapis.com/books/v1/volumes?q=subject:health&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
  
const renderSearchedBook =({item}) => <BookCard book={item} onSelect={handleBookSelect} />
  
 function handleBookSelect(bookId){
    setBookID(bookId)
    setPageView("social")     
 }

 function onSelectButton(){
  setPageView("choose")
 }


  async function fetchData(){  
    try {
      database().ref(`users/shared`).
      on(
      "value" , snapshot => {
        const contentData = snapshot.val()
        const parseData = parseContentData(contentData || {})
        setSharedPosts(parseData)
      })
    
    } catch (error) {
       console.log(error) 
    }  
    
      axios.get(psychologyBooks).then(
          response=>{setPsychology(response.data.items)})
          .catch(error=> console.log(error))
        
      axios.get(historyBooks).then(
          response=>{setHistory(response.data.items)})
          .catch(error=> console.log(error))  
    
      axios.get(novelBooks).then(
            response=>{setNovel(response.data.items)})
            .catch(error=> console.log(error))
    
      axios.get(scienceBooks).then(
            response=>{setScience(response.data.items)})
            .catch(error=> console.log(error))  
          
      axios.get(comicBooks).then(
            response=>{setComic(response.data.items)})
            .catch(error=> console.log(error)) 
    
      axios.get(healthBooks).then(
            response=>{setHealth(response.data.items)})
            .catch(error=> console.log(error))      
  }
  
  useEffect(()=>{fetchData()},[])  

  const AllBooks= [...psychology, ...history, ...novel, ...science, ...comic, ...health]

    const handleSearchBar = (text) =>{
      if(text){
        const filteredList= AllBooks.filter( book=> {
        const currentTitle = book.volumeInfo.title.toLowerCase()
        const categories = book.volumeInfo.categories || [];
        const currentType = categories.map((category) =>
          category?.toLowerCase()
        ).join(" ")
        const searchedText = text.toLowerCase()
        return( currentTitle.indexOf(searchedText) > -1
        || currentType.indexOf(searchedText) > -1 ) })
  
        setSearchedList(filteredList)
              }
      if(!text){
        return (setSearchedList([]))
      }        
    }
    
      const goBack = () =>{
        setPageView("social")
      }


const handleInputToggle = ()=>{
  return(
    setVisibleState(!visibleState)
  )
}



function goSelectedProfile(othersUserName){
  if(othersUserName === userName){
    return(navigation.navigate("ProfilePage"))
  }
  else{
  return(
    navigation.navigate("OthersProfilePage", {othersUserName})
  )
  }
}

function handleSelectLike(postId) {
    const post= sharedPosts.find((item) => item.item_id === postId )
    if (post?.userLikes && post.userLikes[userName]) {
        database().ref(`users/shared/${postId}/likes/`).transaction((currentLikes) => {return (currentLikes -1)})
        database().ref(`users/shared/${postId}/userLikes/${userName}`).remove()
        
        return;
      }
      else{
        database().ref(`users/shared/${postId}/likes/`).transaction((currentLikes) => {return (currentLikes +1)})   
        database().ref(`users/shared/${postId}/userLikes/${userName}`).
        push(userName)
        
      }
    }

    function handleSelectIcon(postId){
      const post= sharedPosts.find((item) => item.item_id === postId )
      if(post?.userLikes && post.userLikes[userName]){
      return (
        <Icon name="cards-heart" size={20} color="red" />
        )
    }
      else{
        return <Icon name="cards-heart-outline" size={20} color={colors.darkgray} />
      }
    }

    function handleSelectPost(postId){
      const post= sharedPosts?.find((item) => item.item_id === postId )
      return(
        navigation.navigate("PostContentPage",{post})
    )}

    function handleDeletePost(name,id){
      if(name === userName){
      return(
      <TouchableOpacity style={styles.delete_button} onPress={()=>deletePost(id)} >
        <Icon name="close" color={colors.darkgray} size={15} />
      </TouchableOpacity>
    )}}

const currentUsersPosts = sharedPosts.filter((item) => item.name === userName)

    function deletePost(id){
      const currentPost = currentUsersPosts?.find((item) => item.item_id === id)  
      return(
        Alert.alert(
          "Are you sure you want to delete this post?",
          "",
          [
            {
              text:"Cancel", style:"cancel"
            },
            {
              text:"Delete", onPress: ()=>{
                console.log(id)
                database().ref(`users/shared/${currentPost?.item_id}`).remove()
              }
            }
          ]
        )
      )
    }
  

  return(

  pageView ==="social" ? (<SafeAreaView style={styles.container} >
     <ScrollView style={styles.scroll}>
      <Text style={styles.header} >BookShare</Text>
      <View style={styles.header_seperator} ></View>
    {sharedPosts.map(
      item => <PostCard key={item.item_id}
      onSelectLike={handleSelectLike} handleSelectProfile={goSelectedProfile} 
      post={item} onSelectIcon={handleSelectIcon} onSelectPost={handleSelectPost}
      onSelectDeletePost={handleDeletePost}
       />
    )}
  </ScrollView>
    <ContentInputModal
      addBook={onSelectButton}
      visible={visibleState}
      onClose={handleInputToggle}
      bookId={bookId}
    />
    <FloatingButton
      onPress={handleInputToggle}
    />
    </SafeAreaView>) :
(
        <View style={styles.search_main_container}>
      <View style={styles.Search}> 
      <View style={styles.search_container} >
      <TouchableOpacity onPress={goBack}  >
      <Icon name="arrow-left" size={20} color={colors.darkgray} />
      </TouchableOpacity>
        <View style={styles.searchBar_container} >
        <SearchBar
      onSearch={handleSearchBar}
      />
      </View>
      </View>
      <View style={styles.container_searchedList} >
      <FlatList
      numColumns={3}
      keyExtractor={item=>item.id.toString()}
      data={searchedList}
      renderItem={renderSearchedBook}

      />
      </View>
      </View>
    </View>
      )
    
    
    )
}

export default SharePost

