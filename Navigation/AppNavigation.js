import { navigationRef } from './RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen/LoginScreen';
import { Home } from '../Screens/Home/Home';
import { ArrowLeft } from "react-native-feather";
import { StyleSheet, ImageBackground } from 'react-native';
import CommentsScreen from '../Screens/CommentsScreen/CommentsScreen';
import RegistrationScreen from '../Screens/RegistrationScreen/RegistrationScreen';
import MapScreen from '../Screens/MapScreen/MapScreen';

const Stack = createStackNavigator();

export default function AppNavigation({ navigation }) {
    return (
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
    )
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