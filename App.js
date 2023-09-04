import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Text } from 'react-native';
import * as Font from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigation from './Navigation/AppNavigation';


// const backgroundImage = require('./Images/BackgroundPhoto.jpeg');
const fetchFonts = async () => 
    await Font.loadAsync({
      'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf')
    })

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
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <AppNavigation />
      </PersistGate>
    </Provider>
    // </ImageBackground>
  );
}
