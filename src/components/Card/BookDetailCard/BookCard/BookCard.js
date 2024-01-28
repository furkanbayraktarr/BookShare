import React from "react";
import {TouchableOpacity ,Text,Image } from 'react-native'
import styles from './BookCard.style'

function BookCard ({book, onSelect}) {

    const handleSelect = () => {
        onSelect(book.id); 
      }
     
    return(

    <TouchableOpacity style={styles.book_container} onPress={handleSelect} >
    {book.volumeInfo.imageLinks != undefined ?<Image source={{uri:book.volumeInfo.imageLinks.thumbnail}} 
            style={styles.image} />:
            <Image 
source={{uri:'https://images.freeimages.com/cme/images/istock/previews/2489/24898489-open-text-book-color-clipart.jpg'}} style={styles.image} />
            }
        <Text numberOfLines={2} style={styles.book_text}>{book.volumeInfo.title}</Text>
    </TouchableOpacity>
    )
}

export default BookCard