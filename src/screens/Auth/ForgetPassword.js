import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Icon, Input} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import auth from '@react-native-firebase/auth';
 

const initials = {email: ''};

export default function ForgetPassword({navigation}) {
  const [state, setState] = useState(initials);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (name, value) => {
    setState(s => ({...s, [name]: value}));
  };

  const handleForget = () => {
    const {email} = state;
    console.log(email);
    if (!email) return alert('Email is invalid');
    
    setIsProcessing(true);
    auth()
      .sendPasswordResetEmail(email)
      .then( ()=>{
        
        console.log("email has been send");
      }).catch(error => {
        console.error(error);
        setIsProcessing(false);
      }).finally(() => {

        setIsProcessing(false)
      })
    
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

        <Button
          size="lg"
          variant="subtle"
          isLoading={isProcessing}
          disabled={isProcessing}
          onPress={handleForget}
          colorScheme="secondary"
          style={{
            alignSelf: 'center',
            marginBottom: 100,
            marginTop: 50,
            marginRight: 35,
            width: 100,
            padding: 200,
            width: Dimensions.get('window').width / 1.5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 24}}>
            {' '}
            Send Email
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
    bottom: 60,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    backgroundColor: 'white',
  },
});
