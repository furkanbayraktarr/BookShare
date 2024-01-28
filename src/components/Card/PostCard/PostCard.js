import React from "react";
import styles from "./PostCard.style"
import { Image,Text, TouchableOpacity, View } from "react-native";
import {formatDistance,parseISO} from 'date-fns'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";

function PostCard({post,handleSelectProfile,onSelectLike,
    onSelectIcon, onSelectPost, onSelectDeletePost, inProfile, inOtherProfile}){

    const formattedDate= 
    formatDistance(parseISO(post.date), new Date(),{ addSuffix: false, includeSeconds: true })
   
    const customFormattedDate = formattedDate
    .replace(/about/, '')
    .replace(/(\d+) days?/, '$1d')
    .replace(/(\d+) hours?/, '$1h')
    .replace(/(\d+) minutes?/, '$1m')
    .replace(/(\d+) seconds?/, '$1s')

const onSelectProfile = ()=>{
    return(
        handleSelectProfile(post.name)
    )
}

function ICON (){
    return(
        onSelectIcon(post.item_id)
    )
}

function deletePost (){
    return(
        onSelectDeletePost(post.name,post.item_id)
    )
}


    return(
    <TouchableOpacity onPress={()=>onSelectPost(post.item_id)} >
    <View style={styles.container}>
        
<View style={styles.inner_container} >
    <TouchableOpacity style={styles.profile_container} 
    onPress={!inProfile ? onSelectProfile : null } >
    {post?.profilePhoto ? (
        <Image style={styles.profile_photo} source={{uri:post?.profilePhoto}} />) :
        (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
        }
  <Text style={styles.user}>{post.name}</Text>
  </TouchableOpacity>
  <View style={styles.date_close_container} >
  {formattedDate && <Text numberOfLines={3} style={styles.date}>{customFormattedDate}</Text>}
  {!inOtherProfile && deletePost()}
  </View>
</View>
  {post.text && <Text numberOfLines={3} style={styles.text}>{post.text}</Text>}
  {post.photo && <Image source={{uri:post.photo}} style={styles.image} />}
  {post.bookImage && <Image source={{uri:post.bookImage}} style={styles.image} />}
  <View style={styles.like_comment_container} >
    <View style={styles.comment_container} >
  <Icon name="comment-outline" size={20} color={colors.darkgray} />
  {post.commentNumber !== 0 && ( <Text style={styles.like} >{post.commentNumber}</Text>)}
  </View>
  <TouchableOpacity  onPress={()=>onSelectLike(post.item_id)} >
  {ICON()}
  </TouchableOpacity>
  {post.likes !== 0 && ( <Text style={styles.like} >{post.likes}</Text>)}
  </View>
    </View>
        </TouchableOpacity>
    )
}

export default PostCard