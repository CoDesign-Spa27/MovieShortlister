import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useMovies } from '@/hooks/UseMovies';
import { addMovie, removeMovie } from '@/redux/shortlistedMoviesSlice';
import { MovieDataType } from '@/hooks/UseMovies';
import { Ionicons } from '@expo/vector-icons';

const MovieList = () => {
  const { data: movies, isLoading, error } = useMovies();
  const dispatch = useDispatch();
  const shortlistedMovies = useSelector((state: { shortlistedMovies: { movies: MovieDataType[] } }) => state.shortlistedMovies.movies);
 

  const toggleShortlist = (movie: MovieDataType) => {
    const isShortlisted = shortlistedMovies.some(m => m.id === movie.id);
    if (isShortlisted) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(addMovie(movie));
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView  style={styles.container}>

    <FlatList
    style={{ }} 
    data={movies}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.movieItem}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
          <View style={styles.movieInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.overview} numberOfLines={3}>{item.overview}</Text>
            <TouchableOpacity onPress={() => toggleShortlist(item)} style={styles.shortlistButton}>
        
              {shortlistedMovies.some(m => m.id === item.id) ? <Ionicons name="trash" size={22} color="#f7ede2"  /> :   <Ionicons name="bookmark" size={22} color="#f7ede2"  />
              }
             
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
backgroundColor:'#f7ede2',
paddingTop:10,
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
  shortlistButton: { 
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
  buttonText: {
    fontFamily:'DMSans',
    color:"#fff",
  }
});

export default MovieList;
