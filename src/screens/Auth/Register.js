import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Icon, Input} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../context/Authcontext';
import firebase from "@react-native-firebase/app"
import firestore from '@react-native-firebase/firestore';

const initialState = {email: '', password: ''};
export default function Register({navigation}) {

  const [show, setShow] = useState(false);
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);


  const {dispatch } = useAuthContext()
  const handleChange = (name, value) => {
    setState(s => ({...s, [name]: value}));
  };

  const handleRegister = () => {
    let {email, password} = state;

    if (!email) return alert('Email is invalid');
    if (!password) return alert('Password is invalid');

    console.log(email);
    console.log(password);

    setIsProcessing(true);

    

    auth()
      .createUserWithEmailAndPassword(
         email , password
      )
      .then((userCredential) => {

        const user = userCredential.user
        dispatch ({type : "LOGIN" , payload : {user}})
        console.log('User account created & signed in!');
        createUserProfile(user)
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


      const createUserProfile = (user) => {
        let formData = {
            firstName: "",
            lastName: "",
            email: user.email,
            uid: user.uid,
            // dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        dateCreated : firebase.firestore.FieldValue.serverTimestamp()
          }
        firestore()
            .collection('users')
            .doc(user.uid)
            .set(formData)
            .then(() => {
                console.log('User added!');
                dispatch({ type: "LOGIN", payload: { user } })
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }
  };


  return (
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

      <View style={styles.bottomView}>
        <View style={{padding: 30}}>
          <Text style={{color: '#001219', fontSize: 23, fontWeight: 'bold'}}>
            WELCOME
          </Text>
          <Text style={{color: 'black', fontSize: 15, marginHorizontal: -4}}>
            Already have an Account?
          </Text>
          <Button
            style={{marginTop: -28}}
            size="sm"
            variant="link"
            colorScheme="secondary"
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Login here
          </Button>
        </View>
      </View>
      <View>
        <Input
          marginLeft={50}
          marginTop={30}
          value = {state.email}
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
          value = {state.password}
          InputRightElement={
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
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
          onChangeText={value => handleChange('password', value)}
        />

        <Button
          onPress={handleRegister}
          isLoading={isProcessing}
          disabled={isProcessing}
          size="lg"
          variant="subtle"
          colorScheme="secondary"
          style={{
            alignSelf: 'center',
            marginBottom: 100,
            marginTop: -10,
            marginRight: 35,
            width: 100,
            padding: 200,
            width: Dimensions.get('window').width / 1.5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 24}}>
            {' '}
            REGISTER
          </Text>
        </Button>
      </View>
    </ScrollView>
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
    // fontWeight: 'bold',
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
});
