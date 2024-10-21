import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeMovie } from '@/redux/shortlistedMoviesSlice';
import { MovieDataType } from '@/hooks/UseMovies';
import { Ionicons } from '@expo/vector-icons';

const ShortlistedMoviesScreen = () => {
  const dispatch = useDispatch();
  const shortlistedMovies = useSelector((state:  { shortlistedMovies: { movies: MovieDataType[] } }) => state.shortlistedMovies.movies);

  return (
    <SafeAreaView style={styles.container}>

   {shortlistedMovies.length > 0 ? <FlatList
      data={shortlistedMovies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.movieItem}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
          <View style={styles.movieInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.overview} numberOfLines={3}>{item.overview}</Text>
            <TouchableOpacity onPress={() => dispatch(removeMovie(item.id))} style={styles.removeButton}>
            <Ionicons name="trash" size={22} color="#f7ede2"  /> 
            </TouchableOpacity>
          </View>
        </View>
      )}
      />:(
        <>
        <View style={styles.noMoviesContainer}>
          <Text style={styles.noMoviesText}>No Saved Movie</Text>
        </View>
        </>
      )}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#171717',
    paddingTop:10,
      },
      noMoviesText: {
        fontFamily: 'DMSans',
        fontSize: 18,
        color: '#f7ede2',
      },
      noMoviesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
  movieItem: {
    backgroundColor:'#f7ede2',
     flexDirection: 'row',
     padding: 10,
     borderBottomWidth: 1,
     borderBottomColor: '#ccc',
   },
  
   poster: {
    borderRadius:10,
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
  },
  title: {
    color:'#84a59d',
    fontFamily:'DMSans',
    fontSize: 20,
    fontWeight:'bold',
    marginBottom: 5,
  },
  overview: {
    fontFamily:'DMSans',
    fontSize: 13,
    marginBottom: 5,
  },
  removeButton: { 
  marginVertical:10,
   flexDirection:'row',
   alignItems:'center',
   gap:5,
    backgroundColor: '#f28482',
    paddingVertical:5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});

export default ShortlistedMoviesScreen;