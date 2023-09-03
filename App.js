import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, ImageBackground, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { Home } from './Screens/Home/Home';
import { ArrowLeft } from "react-native-feather";
import { navigationRef } from './Navigation/RootNavigation';
import * as Font from 'expo-font';
import CommentsScreen from './Screens/CommentsScreen/CommentsScreen';
import MapScreen from './Screens/MapScreen/MapScreen';

// const backgroundImage = require('./Images/BackgroundPhoto.jpeg');
const fetchFonts = async () => 
    await Font.loadAsync({
      'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf')
    })

const Stack = createStackNavigator();
// const window = Dimensions.get('window');

export default function App({navigation}) {
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
    <NavigationContainer ref={navigationRef}>
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
        <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Comments",
            headerTitleStyle: {
              marginBottom: 11,
              fontWeight: 500,
              fontSize: 17,
              color: '#212121',
            },
            headerLeft: () => (
              <ArrowLeft size={24} color='#212121' style={styles.arrowIcon} onPress={() => {
                navigation.navigate('Posts');
              }}/>
            ),
          })} />
        <Stack.Screen
          name='Map'
          component={MapScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Map",
            headerTitleStyle: {
              marginBottom: 11,
              fontWeight: 500,
              fontSize: 17,
              color: '#212121',
            },
            headerLeft: () => (
              <ArrowLeft size={24} color='#212121' style={styles.arrowIcon} onPress={() => {
                navigation.navigate('Posts');
              }} />
            ),
          })}/>
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
  logoutIcon: {
    marginRight: 16,
  },
  arrowIcon: {
    marginLeft: 16,
  },
  
});
