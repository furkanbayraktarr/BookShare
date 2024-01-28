import React from "react";
import styles from "./CommentCard.style"
import { Image,Text, TouchableOpacity, View } from "react-native";
import {formatDistance,parseISO} from 'date-fns'

function CommentCard({comment,handleSelect,onSelectLike,onSelectIcon,onSelectDeleteComment}){
  
  const onSelect = ()=>{
    return(
        handleSelect(comment.name)
    )
}
  const formattedDate= 
  formatDistance(parseISO(comment.date), new Date(), { addSuffix: false, includeSeconds: true })

  const customFormattedDate = formattedDate
    .replace(/about/, '')
    .replace(/(\d+) days?/, '$1d')
    .replace(/(\d+) hours?/, '$1h')
    .replace(/(\d+) minutes?/, '$1m')
    .replace(/(\d+) seconds?/, '$1s')

  function ICON (){
    return(
        onSelectIcon(comment.item_id)
    )
}

function deleteComment (){
  return(
      onSelectDeleteComment(comment.name)
  )
}

    return(
        <View style={styles.container}>
    <View style={styles.inner_container} >
        <TouchableOpacity style={styles.profile_container} onPress={onSelect} >
        {comment?.profilePhoto ? (
        <Image style={styles.profile_photo} source={{uri:comment?.profilePhoto}} />) :
        (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
        }
      <Text style={styles.user}>{comment.name}</Text>
      </TouchableOpacity>
      <View style={styles.date_close_container} >
      <Text numberOfLines={3} style={styles.date}>{customFormattedDate}</Text>
      {deleteComment()}
      </View>
    </View>
      {comment.text && <Text numberOfLines={3} style={styles.text}>{comment.text}</Text>}
      {comment.photo && <Image source={{uri:comment.photo}} style={styles.image} />}
      {comment.bookImage && <Image source={{uri:comment.bookImage}} style={styles.image} />}
      <View style={styles.like_container} >
      <TouchableOpacity  onPress={()=>onSelectLike(comment.item_id)} >
  {ICON()}
  </TouchableOpacity>
  {comment.likes !== 0 && ( <Text style={styles.like} >{comment.likes}</Text>)}
      </View>
        </View>
    )
}

export default CommentCard