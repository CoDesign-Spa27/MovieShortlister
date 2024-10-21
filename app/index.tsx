import { Link } from "expo-router";
import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Text, Animated, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#FF4770', '#FF7676']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.heading}>MovieStream</Text>
        <Text style={styles.subheading}>Your Personal Entertainment Companion</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="film-outline" size={80} color="white" />
        </View>
        <Link href="/(tabs)/movie" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Explore Movies</Text>
            <Ionicons name="arrow-forward" size={24} color="white" style={styles.buttonIcon} />
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: 'center',
    width: width * 0.8,
  },
  heading: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subheading: {
    fontSize: 18,
    color: "white",
    marginBottom: 40,
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});