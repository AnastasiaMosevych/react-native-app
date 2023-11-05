import { navigationRef } from './Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen/LoginScreen';
import { StyleSheet, ImageBackground } from 'react-native';
import RegistrationScreen from '../Screens/RegistrationScreen/RegistrationScreen';

const Stack = createStackNavigator();

export default function AuthStack({ navigation }) {
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
  arrowIcon: {
    marginLeft: 16,
  },
});