import Feather from '@expo/vector-icons/Feather';
import PostsScreen from '../PostsScreen/PostsScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import CreatePostsScreen from '../CreatePostsScreen/CreatePosts';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogOut, ArrowLeft } from "react-native-feather";
import { StyleSheet, View } from 'react-native';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';

const Tabs = createBottomTabNavigator();

function TabBar({ navigation, state, route }) {
    console.log(`Ths is Route Params in TabBar ${route.params}`)
    const { login, avatar } = route.params;
    const { email } = useAuth();
    console.log(`We're in TabBar. Is here an email? ${email}`)
    const [isSignedIn, setIsSignedIn] = useState(false);

    const signOutUser = () => {
        signOut(auth)
            .then((re) => {
                setIsSignedIn(false)
                navigation.navigate('Registration')
            })
            .catch((error) => {
            console.log(error.message)
        })
    }

    return (
        <Tabs.Navigator  
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                let iconName;

            if (route.name === "Profile") {
                iconName = focused
                ? "user"
                : "user"
            } else if (route.name === "Posts") {
                iconName = focused ? "grid" : "grid";
            } else if (route.name === "Create Posts") {
                iconName = focused ? "plus" : "plus"
            }
            if (iconName === 'plus') {
                return (
                     <View style={{width: 70, height: 40, backgroundColor: '#FF6C00', borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <Feather name="plus" size={24} color='#FFFFFF'/>
                    </View>
                    )
            }
            return <Feather name={iconName} size={24} color={color}/>;
            },
            tabBarActiveTintColor: "#FF6C00",
            tabBarInactiveTintColor: "#212121",
            tabBarShowLabel: false,
            tabBarStyle: ((route) => {
              if (route.name === 'Create Posts') {
                return { display: "none" }
              }
              return
            })(route)
            })}
            
        >
        <Tabs.Screen
            name="Posts"
            component={PostsScreen}
            options={{
                title: "Posts",
                headerTitleStyle: {
                    fontWeight: 500,
                    fontSize: 17,
                },
                headerRight: () => (
                    <LogOut color="#BDBDBD" size={24} style={styles.logoutIcon} onPress={signOutUser}/>
                ),
            }}
            initialParams={{ login, email, avatar }}
            />
            <Tabs.Screen
                name="Create Posts"
                component={CreatePostsScreen}
                options={{
                    title: "Create Post",
                    headerTitleStyle: {
                    marginBottom: 11,
                    fontWeight: 500,
                    fontSize: 17,
                    },
                    headerLeft: () => (
                        <ArrowLeft size={24} color='#212121' style={styles.arrowIcon} onPress={() => {
                            navigation.navigate('Posts');
                        }}/>
                    ),
                }}
            />
        <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator> 
    )
}


export const Home = ({ navigation, route }) => {
    return (
        <TabBar navigation={navigation} route={route}/>
    )
}

const styles = StyleSheet.create({
    logoutIcon: {
        marginRight: 16,
    },
    arrowIcon: {
        marginLeft: 16,
    }
})

export default Home;