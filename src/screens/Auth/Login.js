import {
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, Input, Button} from 'native-base';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {useAuthContext} from '../../context/Authcontext';

const initialState = {email: '', password: ''};

export default function Login({navigation}) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const {dispatch} = useAuthContext();
  const handleChange = (name, value) => {
    setState(s => ({...s, [name]: value}));
  };


  const handleGoogle = () => {

    alert("its working")
  }

  const handleLogin = () => {
    let {email, password} = state;

    if (!email) return alert('Email is invalid');
    if (!password) return alert('Password is invalid');

    console.log(email);
    console.log(password);

    setIsProcessing(true);

    

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        dispatch({type: 'LOGIN', payload: {user}});
        console.log('User account created & signed in!');
        navigation.navigate("Home")
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        setIsProcessing(false);
        console.error(error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <>
      <ScrollView
        style={styles.flexContainer}
        showsHorizontalScrollIndicator={false}>
        <ImageBackground
          style={{height: Dimensions.get('window').height / 2.5}}
          source={require('../../asserts/images1/Pic-1.jpg')}>
          <View style={styles.brandIcon}>
            {/* <Icon name=""/> */}
            <Icon
              as={Feather}
              name="home"
              color="#FCA311"
              size={160}
              _dark={{
                color: 'warmGray.50',
              }}
            />
            <Text style={styles.brandText}>USMANIA-GROUP</Text>
          </View>
        </ImageBackground>
        <Text style={styles.h1}> Register</Text>
        <View style={styles.bottomView}>
          <View style={{padding: 30}}>
            <Text style={{color: '#001219', fontSize: 23, fontWeight: 'bold'}}>
              WELCOME
            </Text>
            <Text style={{color: 'black', fontSize: 15}}>
              Don't have an Account?
            </Text>
            <Button
              style={{marginTop: -28}}
              size="sm"
              variant="link"
              colorScheme="secondary"
              onPress={() => {
                navigation.navigate('Register');
              }}>
              Register here
            </Button>
          </View>
        </View>
        {/* Input types */}
        <View>
          <Input
            marginLeft={50}
            marginTop={30}
        
            onChangeText={value => handleChange('email', value)}
            InputLeftElement={
              <Icon
                as={<Fontisto name="person" />}
                size={7}
                ml="2"
                color="muted.400"
              />
            }
            mx="4"
            placeholder="Enter your E-mail here"
            w="100%"
            maxWidth="300px"
            variant="underlined"
            keyboardType="email-address"
            type="email"
          />
          <Input
            marginY={8}
            marginLeft={50}
            value={state.password}
            onChangeText={value => handleChange('password', value)}
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={show ? 'visibility' : 'visibility-off'}
                  />
                }
                size={7}
                mr="1"
                color="muted.400"
                onPress={() => setShow(!show)}
              />
            }
            type={show ? 'text' : 'password'}
            w="100%"
            maxWidth="300px"
            placeholder="Password"
            variant="underlined"
            keyboardType="password"
            onPress={() => setShow(!show)}
          />

          {/* Forget text */}
          <View
            style={{
              color: 'red',
              alignSelf: 'flex-end',
              marginRight: 80,
              marginBottom: 100,
              marginTop: -10,
            }}>
            <Button
              size="sm"
              variant="link"
              colorScheme="secondary"
              onPress={() => {
                navigation.navigate('ForgetPassword');
              }}>
              Forget Password?
            </Button>
          </View>

          {/* Login Button */}

          {/* <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}> */}
          <Button
            isLoading={isProcessing}
            disabled={isProcessing}
            onPress= {handleLogin}
            size="lg"
            variant="subtle"
            colorScheme="secondary"
            style={{
              alignSelf: 'center',
              marginBottom: 100,
              marginTop: -80,
              marginRight: 35,
              width: 100,
              padding: 200,
              width: Dimensions.get('window').width / 1.5,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 24}}>
              {' '}
              LOGIN
            </Text>
          </Button>
        </View>
        <View style={{marginTop: -90}}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}>
            Or log in with
          </Text>
        </View>
        <View style={styles.ScrollView}>
          <Button size="sm" variant="ghost" colorScheme="secondary">
            <Icon
              as={<MaterialCommunityIcon name="facebook" />}
              size={10}
              ml="2"
              color="#0077B6"
            />
          </Button>
          <Button size="sm" variant="ghost" colorScheme="secondary" onPress={handleGoogle}>
            <Icon
              as={<MaterialCommunityIcon name="google" />}
              size={9}
              ml="2"
              color="#BC4749"
            />
          </Button>
          <Button size="sm" variant="ghost" colorScheme="secondary">
            <Icon
              as={<MaterialCommunityIcon name="phone" />}
              size={9}
              ml="2"
              color="black"
            />
          </Button>
        </View>

        {/* </View> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'red',
  },
  brandIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    color: '#3C1053FF',
    fontWeight: 'bold',
    fontSize: 35,
    textTransform: 'uppercase',
    fontFamily: 'DynaPuff_Condensed-Regular',
  },
  bottomView: {
    flex: 1.5,
    bottom: 60,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    backgroundColor: 'white',
  },
  ScrollView: {
    flexDirection: 'row',
    marginLeft: 100,
    marginTop: -8,
  },
});
