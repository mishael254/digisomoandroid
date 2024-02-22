import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the main app screen after the splash screen
      if (navigation && navigation.navigate) {
        navigation.navigate('Onboarding');
      }
    }, 2000); // Adjust the duration as needed
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {navigation && (
        <LottieView
          source={require('../assets/splash10.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => navigation.navigate('Onboarding')}
          style={styles.animation}
        />
      )}
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
