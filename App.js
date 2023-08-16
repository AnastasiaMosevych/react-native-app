import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, ImageBackground, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { Home } from './Screens/Home/Home';
import * as Font from 'expo-font';

// const backgroundImage = require('./Images/BackgroundPhoto.jpeg');
const fetchFonts = async () => 
    await Font.loadAsync({
      'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf')
    })

const Stack = createStackNavigator();
// const window = Dimensions.get('window');

export default function App() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
      });
      setIsFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!isFontsLoaded) return null;

  return (
    // fix image background so that it's only in app.js and visible on every screen
    // <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Registration'
        screenOptions={{
        headerShown: false
        }}>
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} />
          <Stack.Screen
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // backgroundImage: {
  //   position: 'absolute',
  //   flex: 1,
  //   resizeMode: 'cover',
  //   width: window.width,
  //   height: window.height,
  //   zIndex: -1,
  // },
  
});
