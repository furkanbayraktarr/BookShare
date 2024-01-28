import React,{useState,useEffect} from "react"
import { SafeAreaView,Image,TouchableOpacity,Text,View,
  ScrollView, TouchableWithoutFeedback, Alert} from "react-native";
import styles from './PostContent.style'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {format,parseISO} from 'date-fns'
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import PostInputModal from "../../../../components/PostInputModal";
import colors from "../../../../styles/colors";
import parseContentData from "../../../../utils/parseContentData";
import CommentCard from "../../../../components/Card/CommentCard";
import SearchBar from "../../../../components/SearchBar";
import { FlatList } from "react-native";
import axios from "axios";
import BookCard from "../../../../components/Card/BookDetailCard/BookCard";

function PostContent({navigation,route}){

const [visibleState, setVisibleState] = useState(false)
const [comments , setComments ] = useState([])
const [contentData , setContentData ] = useState([])
const userName = auth().currentUser.email.split('@')[0]
const {post} = route.params
const id= post.item_id


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

const fetchData = ()=> {
  try {
    
    database().ref(`users/shared`).
    on(
    "value" , snapshot => {
      const contentData = snapshot.val()
      const comments= contentData[id]?.comments
      setContentData(contentData)
      const parseCommentData = parseContentData(comments || {})
      setComments(parseCommentData)
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

const handleInputToggle = ()=>{
  return(
    setVisibleState(!visibleState)
  )
}

const dateObject= parseISO(post.date)
const formattedDate= 
    format((dateObject), 'HH:mm   dd.MM.yyyy')

    const onSelectProfile = (othersUserName)=>{
      if(othersUserName===userName){
        return(navigation.navigate("ProfilePage"))
      }
      else{
        return(
          navigation.navigate("OthersProfilePage", {othersUserName})
        )
      }
    }
    const goBackComment = () =>{
      setPageView("social")
    }

function goBack (){
  navigation.goBack()
}
function handleSelectLike() {
  if (contentData[id]?.userLikes && contentData[id].userLikes[userName]) {
      database().ref(`users/shared/${id}/likes/`).transaction((currentLikes) => {return (currentLikes -1)})
      database().ref(`users/shared/${id}/userLikes/${userName}`).remove()
    
      return;
    }
    else{
      database().ref(`users/shared/${id}/likes/`).transaction((currentLikes) => {return (currentLikes +1)})   
      database().ref(`users/shared/${id}/userLikes/${userName}`).
      push(userName)
    }
  }

  function handleSelectCommentLike(commentId) {
    const comment= comments.find((item) => item.item_id === commentId )
    if (comment?.userLikes && comment.userLikes[userName]) {
        database().ref(`users/shared/${id}/comments/${commentId}/likes`).transaction((currentLikes) => {return (currentLikes -1)})
        database().ref(`users/shared/${id}/comments/${commentId}/userLikes/${userName}`).remove()
        

        return;
      }
      else{
        database().ref(`users/shared/${id}/comments/${commentId}/likes`).transaction((currentLikes) => {return (currentLikes +1)})   
        database().ref(`users/shared/${id}/comments/${commentId}/userLikes/${userName}`).
        push(userName)
        
      }
    }

function handleSelectIcon(){
  if(contentData[id]?.userLikes && contentData[id].userLikes[userName]){
  return (
  <View style={styles.like_Icon} > 
    <Icon name="cards-heart" size={20} color="red" />
    </View>
    )
}
  else{
    return (
      <View style={styles.like_Icon} >
    <Icon name="cards-heart-outline" size={20} color={colors.darkgray} />
    </View>
    )
  }
}

function handleSelectCommentIcon(commentId){
  const comment= comments.find((item) => item.item_id === commentId )
  if(comment?.userLikes && comment.userLikes[userName]){
  return (
    <Icon name="cards-heart" size={20} color="red" />
    )
}
  else{
    return <Icon name="cards-heart-outline" size={20} color={colors.darkgray} />
  }
}

function handleDeleteComment(name){
  if(name === userName){
  return(
  <TouchableOpacity style={styles.delete_button} onPress={deleteComment} >
    <Icon name="close" color={colors.darkgray} size={15} />
  </TouchableOpacity>
)}}

function deleteComment(){
  const currentUsersComment = comments?.find((item) => item.name === userName)
  return(
    Alert.alert(
      "Are you sure you want to delete this comment?",
      "",
      [
        {
          text:"Cancel", style:"cancel"
        },
        {
          text:"Delete", onPress: ()=>{
            database().ref(`users/shared/${id}/comments/${currentUsersComment?.item_id}`).remove()
            database().ref(`users/shared/${id}/commentNumber`)
            .transaction((currentNumber) => {return (currentNumber -1)})
          }
        }
      ]
    )
  )
}

function handleDeletePost(name){
  if(name === userName){
  return(
  <TouchableOpacity style={styles.delete_button} onPress={deletePost} >
    <Icon name="close" color={colors.darkgray} size={15} />
  </TouchableOpacity>
)}}

function deletePost(){
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
            database().ref(`users/shared/${id}`).remove()
            navigation.navigate("SharePost")
          }
        }
      ]
    )
  )
}

    return(
      pageView ==="social" ? (    
    <SafeAreaView style={styles.main_container} > 
    <ScrollView style={styles.scroll} >
        <View style={styles.head_container} >
    <TouchableOpacity style={styles.back_container} onPress={goBack}>
        <Icon name="arrow-left" size={20} color={"white"} />
        <Text style={styles.back_text} >Back</Text>
        </TouchableOpacity>
        <Text style={styles.pageHeader} >Post</Text>
        </View>
        <View >
    <View style={styles.container}>
<View style={styles.upper_container} >
    <TouchableOpacity style={styles.profile_container} onPress={()=>onSelectProfile(post.name)} >
    {post?.profilePhoto ? (
      <Image style={styles.profile_photo} source={{uri:post?.profilePhoto}} />) :
      (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
    }
  <Text style={styles.user}>{post.name}</Text>
  </TouchableOpacity>
  {handleDeletePost(post?.name)}
</View>
  {post.text && <Text numberOfLines={3} style={styles.text}>{post.text}</Text>}
  {post.photo && <Image source={{uri:post.photo}} style={styles.image} />}
  {post.bookImage && <Image source={{uri:post.bookImage}} style={styles.image} />}
  <View style={styles.date_container} >
<Text numberOfLines={3} style={styles.date}>{formattedDate}</Text>
<View style={styles.like_comment_container} >

  <View style={styles.like_container} >
  <Text style={styles.like} >{contentData[id]?.commentNumber} </Text>
  <Text style={styles.comment_text} >Comment</Text>
  </View>

  <View style={styles.like_container} >
  <Text style={styles.like} >{contentData[id]?.likes} </Text>
  <Text style={styles.likes_text} >Like</Text>
  </View>
  
  </View>
  </View>
    </View>
    <View style={styles.icons_container} >
      <TouchableOpacity style={styles.comment_icon} onPress={handleInputToggle} >
    <Icon name="comment-outline" size={20} color={colors.darkgray} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleSelectLike} >
    {handleSelectIcon()}
    </TouchableOpacity>
    </View>
    <View style={styles.comments_header_container} >
      <Text style={styles.comments_header} >Comments</Text>
    </View>
    </View>

    {comments?.map((item)=> <CommentCard 
    onSelectIcon={handleSelectCommentIcon} onSelectLike={handleSelectCommentLike}
    handleSelect={onSelectProfile}  key={item.item_id} comment={item} 
    onSelectDeleteComment={handleDeleteComment} />)}
    
    <PostInputModal
      visible={visibleState}
      onClose={handleInputToggle}
      postId={post.item_id}
      addBook={onSelectButton}
      bookId={bookId}
    />
    </ScrollView>
    <View style={styles.answer_touch} >
    <TouchableWithoutFeedback onPress={handleInputToggle} >
      <Text style={styles.answer_text}>Send your comment...</Text>
    </TouchableWithoutFeedback>
    </View>
      </SafeAreaView>)
:
(
  <View style={styles.search_main_container}>
<View style={styles.Search}> 
<View style={styles.search_container} >
<TouchableOpacity onPress={goBackComment}  >
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

export default PostContent