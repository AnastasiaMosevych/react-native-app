import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import * as Font from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { StyleSheet, ImageBackground } from 'react-native';
// import RootNavigation from './Navigation';
import AppNavigation from './Navigation/AppNavigation';

// const backgroundImage = require('./Images/BackgroundPhoto.jpeg');
// const window = Dimensions.get('window');

const fetchFonts = async () => 
    await Font.loadAsync({
      'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf')
    })

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
        {/* <RootNavigation/> */}
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
  arrowIcon: {
    marginLeft: 16,
  },
  
});
