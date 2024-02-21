import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the main app screen after the splash screen
      navigation.navigate('Onboarding');
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash10.json')} // Use splash10.json instead of splash9.gif
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.navigate('Onboarding')}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
 
});

export default SplashScreen;
