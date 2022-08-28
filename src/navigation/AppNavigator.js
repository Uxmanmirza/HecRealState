import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import Home from '../screens/Frontend/Home/Home';
import {useAuthContext} from '../context/Authcontext';
import Post from '../screens/Frontend/Post';
import Profile from '../screens/Frontend/Profile/Profile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import UpdateProfile from '../screens/Frontend/Profile/UpdateProfile';
import About from '../screens/Frontend/Home/About';
import { Spinner } from 'native-base';
export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();
  const {isAuthenticated , isProcessing} = useAuthContext();

  const HomeData = () => {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />

          <Stack.Screen name="About" component={About} />
        </Stack.Group>
      </Stack.Navigator>
    );
  };
  //   const PostData = () => {
  //     return (
  //       <Stack.Navigator>
  //         <Stack.Screen
  //           name="Post"
  //           component={Post}
  //           options={{headerShown: false}}
  //         />
  //       </Stack.Navigator>
  //     );
  //   };
  const ProfileData = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );

  };
  if (isProcessing) return <Spinner/>
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          </Stack.Group>
        </Stack.Navigator>
      ) : (
        <Tabs.Navigator
          screenOptions={{
            tabBarActiveBackgroundColor: '#E7C8DD',
            tabBarActiveTintColor: '#264653',
          }}>
          <Tabs.Screen
            name="Home "
            component={HomeData}
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <FontAwesome5Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="Post "
            component={Post}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <IonIcons name="notifications" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="ProfileData"
            component={ProfileData}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome5Icon name="users" color={color} size={size} />
              ),
            }}
          />
        </Tabs.Navigator>
      )}
    </NavigationContainer>
  );
}

//
