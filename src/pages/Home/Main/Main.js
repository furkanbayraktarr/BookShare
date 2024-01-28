import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, FlatList } from "react-native";
import styles from "./Main.style"
import axios from 'axios'
import SearchBar from "../../../components/SearchBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import BookCard from "../../../components/Card/BookDetailCard/BookCard";


function Main({navigation}){

  const [psychology,setPsychology] = useState([])
  const [history, setHistory] = useState([])
  const [novel,setNovel] = useState([])
  const [science,setScience] = useState([])
  const [comic,setComic] = useState([])
  const [health,setHealth] = useState([])
  const [pageView, setPageView] = useState("main")
  const [searchedList, setSearchedList] = useState([])

  const psychologyBooks = "https://www.googleapis.com/books/v1/volumes?q=subject:psychology&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
  const historyBooks = "https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
  const novelBooks = "https://www.googleapis.com/books/v1/volumes?q=subject:novel&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
  const scienceBooks ="https://www.googleapis.com/books/v1/volumes?q=subject:science&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
  const comicBooks = "https://www.googleapis.com/books/v1/volumes?q=subject:comic&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"
  const healthBooks= "https://www.googleapis.com/books/v1/volumes?q=subject:health&maxResults=30&key=AIzaSyAvCZNL12MQ1Td1-POBkH-wU8Aw_glGYeY"

  const renderBook = ({item}) => <BookCard book={item} onSelect={handleBookSelect}  />

  const renderSearchedBook =({item}) => <BookCard book={item} onSelect={handleBookSelect} />

  function handleBookSelect(bookId){
    return(
      navigation.navigate("MainBookDetailPage", {bookId})
    )
  }

  async function fetchData(){ 
    
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

useEffect (()=>{fetchData()},[psychologyBooks,historyBooks,novelBooks,scienceBooks,
comicBooks, healthBooks])

  const AllBooks= [...psychology, ...history, ...novel, ...science, ...comic, ...health]

  const handleSearch = () =>{
    return(
      setPageView("search")
    )
  }

  const handleSearchBar = (text) =>{
    if(text){
      const filteredList= AllBooks.filter( book=> {
      const currentTitle = book.volumeInfo.title.toLowerCase()
      const categories = book.volumeInfo.categories || []
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
    setSearchedList([])
    return(setPageView("main"))
  }

  
  return(
    pageView === "main" ? (<View style={styles.main_container} >
      <TouchableOpacity style={styles.search} onPress={handleSearch}>
        <Icon name="magnify" size={20} color={colors.darkgray} />
        <Text style={styles.search_text} >Search in BookShare</Text>
      </TouchableOpacity>
      <ScrollView style={{marginBottom:50}} >

      <Text style={styles.book_type_title} >History</Text>
      <View style={styles.container} >
        <FlatList
        horizontal
        data={history}
        renderItem={renderBook}
        />
      </View>

      <Text style={styles.book_type_title} >Science</Text>
      <View style={styles.container} >
        <FlatList
        horizontal
        data={science}
        renderItem={renderBook}
        />
        </View>

        <Text style={styles.book_type_title} >Psychology</Text>
        <View style={styles.container} >
        <FlatList
        horizontal
        data={psychology}
        renderItem={renderBook}
        />
        </View>

        <Text style={styles.book_type_title} >Novel</Text>
        <View style={styles.container} >
        <FlatList
        horizontal
        data={novel}
        renderItem={renderBook}
        />
        </View>

        <Text style={styles.book_type_title} >Comic</Text>
        <View style={styles.container} >
        <FlatList
        horizontal
        data={comic}
        renderItem={renderBook}
        />
        </View>

        <Text style={styles.book_type_title} >Health</Text>
        <View style={styles.container} >
        <FlatList
        horizontal
        data={health}
        renderItem={renderBook}
        />
        </View>

        </ScrollView>

    </View>
    ):
    (
      <View style={styles.search_main_container}>
      <View style={styles.container}> 
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
export default Main