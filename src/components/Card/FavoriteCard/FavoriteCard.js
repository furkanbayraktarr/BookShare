import React from "react";
import styles from "./FavoriteCard.style"
import { TouchableOpacity,Image,Text, View } from "react-native";

function FavoriteCard({book, onSelect}){

    const handleSelect = () => {
        onSelect(book.id); 
      }

    return(
        
    <TouchableOpacity style={styles.book_container} onPress={handleSelect} >
<Image source={{uri:book.image}} style={styles.image} />
<View >
<Text numberOfLines={3} style={styles.book_title}>{book.title}</Text>
<Text numberOfLines={3} style={styles.book_author}>{book.authors[0]}
      {book.authors[1] && ","} {book.authors[1]}</Text>
</View>
        </TouchableOpacity>
        
    )
}

export default FavoriteCard