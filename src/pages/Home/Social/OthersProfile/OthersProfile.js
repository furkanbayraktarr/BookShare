import React,{useState,useEffect} from "react"
import { SafeAreaView, Text, View,Image, ScrollView,TouchableWithoutFeedback,
TouchableOpacity} from "react-native"
import database from "@react-native-firebase/database"
import parseContentData from "../../../../utils/parseContentData" 
import styles from "./OthersProfile.style"
import auth from "@react-native-firebase/auth"
import FavoriteCard from "../../../../components/Card/FavoriteCard"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PostCard from "../../../../components/Card/PostCard"
import colors from "../../../../styles/colors"



function OthersProfile({navigation,route}){
    
  const {othersUserName} = route.params
  const userName = auth().currentUser.email.split('@')[0]

    const [favoriteList, setFavoriteList] = useState([])
    const [readedList, setReadedList] = useState([])
    const [profilePhoto, setProfilePhoto] = useState([])
    const [sharedPosts, setSharedPosts] = useState([])
    const [pageView, setPageView] = useState("posts")

    const fetchData = async () => {

        try {
            
            database().ref(`users`)
            .on('value', snapshot=> {
            const contentData = snapshot.val()
            const contentUsersData = contentData[othersUserName]
            const contentSharedData = contentData.shared
            const favorites = contentUsersData?.favorites || {}
            const readed = contentUsersData?.readed || {}
            const photo = contentUsersData?.photo || {}
            const parseFavoritesData = parseContentData(favorites || {})
            const parseReadedData = parseContentData(readed || {})
            const parseSharedData = parseContentData(contentSharedData || {})
            setFavoriteList(parseFavoritesData)
            setReadedList(parseReadedData)
            setProfilePhoto(photo)
            setSharedPosts(parseSharedData)
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

        function handleBookSelect(bookId){
          return(
            navigation.navigate("SocialBookDetailPage",{ bookId } )
            )
          
        }
        function goBack() {
            return(
                navigation.goBack()
            )
        }
       
        function posts(){
          const currentUsersPosts = sharedPosts.filter((item)=> item.name === othersUserName)
          return(
          currentUsersPosts.map(item => 
            <PostCard post={item} inProfile inOtherProfile
            onSelectLike={handleSelectLike} onSelectPost={handleSelectPost} 
            onSelectIcon ={handleSelectIcon} key={item.item_id} />
            )
          )
          }

          function handleSelectPost(postId){
            const post= sharedPosts?.find((item) => item.item_id === postId )
            return(
              navigation.navigate("PostContentPage",{post})
          )}

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
        <TouchableOpacity style={styles.back_container} onPress={goBack}>
            <Icon name="arrow-left" size={20} color={"white"} />
            <Text style={styles.back_text} >Back</Text>
        </TouchableOpacity>
            <View style={styles.upper_container} >
            {profilePhoto?.photo ? (
        <Image style={styles.profile_photo} source={{uri:profilePhoto?.photo}} />) :
        (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
        }
                <Text style={styles.name}>{othersUserName}</Text>
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
            {favoriteList.map(item =>
            <View key={item.id.toString()} style={styles.swipeout} >
      <FavoriteCard key={item.id.toString()} book={item} onSelect={handleBookSelect}/>
      </View>
      )}
            </View>)}
        
           {pageView === "readed" && (
            <View>
                <TouchableOpacity style={styles.back_container} onPress={goBack}>
            <Icon name="arrow-left" size={20} color={"white"} />
            <Text style={styles.back_text} >Back</Text>
        </TouchableOpacity>
            <View>
            <View style={styles.upper_container} >
            {profilePhoto?.photo ? (
        <Image style={styles.profile_photo} source={{uri:profilePhoto?.photo}} />) :
        (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
        }
            <Text style={styles.name}>{othersUserName}</Text>
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
            {readedList.map(item =>
            <View key={item.id.toString()} style={styles.swipeout} >
      <FavoriteCard key={item.id.toString()} book={item} onSelect={handleBookSelect}/>
      </View>
      )}
            </View>) }
            {pageView === "posts" && (
            <View>
            <TouchableOpacity style={styles.back_container} onPress={goBack}>
            <Icon name="arrow-left" size={20} color={"white"} />
            <Text style={styles.back_text} >Back</Text>
        </TouchableOpacity>
            <View>
            <View style={styles.upper_container} >
            {profilePhoto?.photo ? (
        <Image style={styles.profile_photo} source={{uri:profilePhoto?.photo}} />) :
        (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
        }
            <Text style={styles.name}>{othersUserName}</Text>
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
           
      </SafeAreaView>)

    }

export default OthersProfile