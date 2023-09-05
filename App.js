import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import * as Font from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { navigationRef } from './Navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { Home } from './Screens/Home/Home';
import { ArrowLeft } from "react-native-feather";
import { StyleSheet, ImageBackground } from 'react-native';
import CommentsScreen from './Screens/CommentsScreen/CommentsScreen';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import MapScreen from './Screens/MapScreen/MapScreen';
import AppNavigation from './Navigation/AppNavigation';

// const backgroundImage = require('./Images/BackgroundPhoto.jpeg');
const fetchFonts = async () => 
    await Font.loadAsync({
      'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf')
    })

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
    <Provider store={store}>
      <PersistGate
          loading={<Text>Loading...</Text>}
          persistor={persistor}
      >
         <AppNavigation/>
      </PersistGate>
    </Provider>
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
