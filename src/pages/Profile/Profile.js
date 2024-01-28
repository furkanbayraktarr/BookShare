import React,{useState,useEffect} from "react"
import { SafeAreaView, Alert,Text, View , ScrollView,TouchableWithoutFeedback,
TouchableOpacity, Image} from "react-native"
import database from "@react-native-firebase/database"
import parseContentData from "../../utils/parseContentData"
import styles from "./Profile.style"
import auth from "@react-native-firebase/auth"
import FavoriteCard from "../../components/Card/FavoriteCard"
import Swipeout from "react-native-swipeout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ProfileModal from "../../components/ProfileModal"
import PostCard from "../../components/Card/PostCard"
import colors from "../../styles/colors"



function Profile({navigation}){
    
  const userName = auth().currentUser.email.split('@')[0]
  
  const [visibleState, setVisibleState] = useState(false)
  const [favoriteList, setFavoriteList] = useState([])
  const [readedList, setReadedList] = useState([])
  const [photo, setPhoto] = useState([])
  const [sharedPosts, setSharedPosts] = useState([])
  const [pageView, setPageView] = useState("posts")
    
    const fetchData = async () => {

        try {
            
            database().ref(`users`)
            .on('value', snapshot=> {
            const contentData = snapshot.val()
            const contentUsersData = contentData[userName]
            const contentSharedData = contentData?.shared
            const favorites = contentUsersData?.favorites || {}
            const readed = contentUsersData?.readed || {}
            const photo = contentUsersData?.photo || {}
            const parseFavoritesData = parseContentData(favorites || {})
            const parseReadedData = parseContentData(readed || {})
            const parseSharedData = parseContentData(contentSharedData || {})
            
            setSharedPosts(parseSharedData)
            setFavoriteList(parseFavoritesData)
            setReadedList(parseReadedData)
            setPhoto(photo)
          })
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }

    useEffect(()=>{fetchData()},[])
          
          function selectFavorites(){
            setPageView("favorites")
          }
          function selectReaded(){
            setPageView("readed")
          }

          function selectPosts(){
            setPageView("posts")
          }

          
          const handleDeleteFavorites = (item) => {
            return(
              database().ref(`users/${userName}/favorites/${item.item_id}`).remove()
            )
        }

        const handleDeleteReaded = (item) => {
          return(
            database().ref(`users/${userName}/readed/${item.item_id}`).remove()
          )
      }

        function handleBookSelect(bookId){
          return(
            navigation.navigate("ProfileBookDetailPage",  { bookId })
            )
          
        }
    
        function handleInputToggle(){
          return(
            setVisibleState(!visibleState)
            )
        }

        const deleteProfilePhoto =()=>{

          Alert.alert(
            "Remove existing photo?",
            "",
            [
              {
                text:"Cancel", 
                style:"cancel"
              },
            {
              text:"Remove", 
              onPress: ()=> database().ref(`users/${userName}/photo`).remove()
            }
            ]
          )
        }

        const logout =()=>{

          Alert.alert(
            "Are you sure to sign out?",
            "",
            [
              {
                text:"Cancel", 
                style:"cancel"
              },
            {
              text:"Sign Out", 
              onPress: ()=> auth().signOut()
            }
            ]
          )
        }

        function handleDeletePost(name,id){
          if(name === userName){
          return(
          <TouchableOpacity style={styles.delete_button} onPress={()=>deletePost(id)} >
            <Icon name="close" color={colors.darkgray} size={15} />
          </TouchableOpacity>
        )}}

    const currentUsersPosts = sharedPosts.filter((item)=> item.name === userName)

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
                    database().ref(`users/shared/${currentPost.item_id}`).remove()
                  }
                }
              ]
            )
          )
        }

        function handleSelectPost(postId){
          const post= sharedPosts?.find((item) => item.item_id === postId )
          return(
            navigation.navigate("PostContentPage",{post})
        )}

      function posts(){
        return(
        currentUsersPosts.map(item => 
          <PostCard post={item} inProfile onSelectDeletePost={handleDeletePost} 
          onSelectLike={handleSelectLike} onSelectIcon={handleSelectIcon} 
          onSelectPost={handleSelectPost} key={item.item_id} />
          )
        )
        }

        function handleSelectLike(postId) {
          const post= sharedPosts.find((item) => item.item_id === postId )
          if (post?.userLikes && post.userLikes[userName]) {
              database().ref(`users/shared/${postId}/likes/`).transaction((currentLikes) => {return (currentLikes -1)})
              database().ref(`users/shared/${postId}/userLikes/${userName}`).remove()
              
      
              return;
            }else{
      
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
        
        return(
            
          <SafeAreaView style={styles.container}>
            
          <ScrollView >
            <View style={styles.scroll_view} >
            {pageView === "favorites" && (
              <View>
              <View style={styles.upper_container} >
                <View style={styles.profile_container} >
                <TouchableOpacity onPress={handleInputToggle} >
                {photo?.photo ? (
                <Image style={styles.profile_photo} source={{uri:photo?.photo}} />) :
                (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
                 }
                 </TouchableOpacity>
                <Text style={styles.name}>{userName}</Text>
                </View>
                <View style={styles.logout} >
                <Icon name="logout" size={30} color="white" onPress={logout} />
                </View>
              </View>
            <View>
              <View style={styles.upper_tab_container} >
              <TouchableWithoutFeedback onPress={selectPosts}   >
              <Text style={styles.unselected_text} >Posts</Text>
              </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={selectFavorites}  >
                  <View style={styles.selected_touch}>
              <Text style={styles.selected_text} >Favorites</Text>
              </View>
              </TouchableWithoutFeedback>
              
              <TouchableWithoutFeedback onPress={selectReaded} >
              <Text style={styles.unselected_text} >Readed</Text>
              </TouchableWithoutFeedback>
              </View>
            </View>
            {favoriteList.map(item => <Swipeout
            key={item.id.toString()} 
      right={[
        {
          text: "Sil",
          backgroundColor: "red",
          onPress: () => handleDeleteFavorites(item)
        },
      ]}
      autoClose={true} style={styles.swipeout} >
      <FavoriteCard key={item.id.toString()} book={item} onSelect={handleBookSelect}/>
      </Swipeout>)}
            </View>)}
        
           {pageView === "readed" && (
            <View>
            <View style={styles.upper_container} >
            <View style={styles.profile_container} >
            <TouchableOpacity onPress={handleInputToggle} >
                {photo?.photo ? (
                <Image style={styles.profile_photo} source={{uri:photo?.photo}} />) :
                (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
                 }
                 </TouchableOpacity>
                <Text style={styles.name}>{userName}</Text>
                </View>
                <View style={styles.logout} >
                <Icon name="logout" size={30} color="white" onPress={logout} />
                </View>
              </View>
            <View>
              <View style={styles.upper_tab_container} >
              <TouchableWithoutFeedback onPress={selectPosts}   >
              <Text style={styles.unselected_text} >Posts</Text>
              </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={selectFavorites}   >
              <Text style={styles.unselected_text} >Favorites</Text>
              </TouchableWithoutFeedback>
              
              <TouchableWithoutFeedback onPress={selectReaded}  >
              <View style={styles.selected_touch}>
              <Text style={styles.selected_text} >Readed</Text>
              </View>
              </TouchableWithoutFeedback>
              </View>
            </View>
            {readedList.map(item => <Swipeout
            key={item.id.toString()} 
      right={[
        {
          text: "Sil",
          backgroundColor: "red",
          onPress: () => handleDeleteReaded(item)
        },
      ]}
      autoClose={true} style={styles.swipeout} >
      <FavoriteCard key={item.id.toString()} book={item} onSelect={handleBookSelect}/>
      </Swipeout>)}
            </View>) }

            {pageView === "posts" && (
            <View>
            <View style={styles.upper_container} >
            <View style={styles.profile_container} >
            <TouchableOpacity onPress={handleInputToggle} >
                {photo?.photo ? (
                <Image style={styles.profile_photo} source={{uri:photo?.photo}} />) :
                (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
                 }
                 </TouchableOpacity>
                <Text style={styles.name}>{userName}</Text>
                </View>
                <View style={styles.logout} >
                <Icon name="logout" size={30} color="white" onPress={logout} />
                </View>
              </View>
            <View>
              <View style={styles.upper_tab_container} >
              <TouchableWithoutFeedback onPress={selectPosts}  >
              <View style={styles.selected_touch}>
              <Text style={styles.selected_text} >Posts</Text>
              </View>
              </TouchableWithoutFeedback>
              

                <TouchableWithoutFeedback onPress={selectFavorites}   >
              <Text style={styles.unselected_text} >Favorites</Text>
              </TouchableWithoutFeedback>
              
              <TouchableWithoutFeedback onPress={selectReaded}   >
              <Text style={styles.unselected_text} >Readed</Text>
              </TouchableWithoutFeedback>
              </View>
            </View>
            {posts()}
            </View>) }
              </View>
           </ScrollView>
           <ProfileModal
           visible={visibleState}
           onClose={handleInputToggle}
           deleteProfilePhoto={deleteProfilePhoto}
           />
           
      </SafeAreaView>)

    }

export default Profile