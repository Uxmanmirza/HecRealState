import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import CustomButton from '../../components/CustomButton';
import {useAuthContext} from '../../../context/Authcontext';
import {Image, Button, StatusBar} from 'native-base';
import auth from '@react-native-firebase/auth';
export default function Profile({navigation}) {
  const [image, setImage] = useState({});

  const {user , dispatch} = useAuthContext();
  console.log(user);


  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: 'LOGOUT'});
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong');
      });
    console.log(auth);
  };

  return (
    <>
    <StatusBar barStyle={'light-content'} backgroundColor="#14213D"/>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.cover]}></View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <Image
            alt="userImg"
            style={[styles.userImg]}
            source={{
              uri: user.url
                ? user.url
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wrXPLf0fSGdZXCPKp3Y-NrRNrnWLqQwvoQ&usqp=CAU',
            }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ position: 'absolute' }} onPress={imageUplaod}>
          <FontIcon style={{ textAlign: 'center', marginLeft: 150 }} name="camera" size={22} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.info}>
        <Text>Name</Text>

        <Text>{user.firstName}</Text>
        <Text>{user.lastName}</Text>
      </View>
      <View style={styles.info}>
        <Text>Email</Text>

        <Text>{[user.email]}</Text>
      </View>
      <View style={styles.info}>
        <Text>Address</Text>

        <Text>{[user.address ? user.address : 'Address']}</Text>
      </View>
      <View style={styles.info}>
        <Text>Phonenumber</Text>

        <Text>{[user.phonenumber ? user.phonenumber : 'PhoneNumnber']}</Text>
      </View>

      <View>
        <Button
          // isLoading={isProcessing}
          // disabled={isProcessing}
          onPress={() => {
            navigation.navigate('UpdateProfile');
          }}
          size="lg"
          variant="subtle"
          colorScheme="secondary"
          style={{
            marginLeft: 59,
            marginTop: 40,
            width: 100,
            padding: 200,
            width: Dimensions.get('window').width / 1.5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 24}}>
            {' '}
            UpdateProfile
          </Text>
        </Button>
        <Button
          // isLoading={isProcessing}
          // disabled={isProcessing}
          onPress={handleLogout}
          size="lg"
          variant="subtle"
          colorScheme="red"
          style={{
            marginLeft: 59,
            marginTop: 40,
            width: 100,
            padding: 200,
            width: Dimensions.get('window').width / 1.5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 24}}>
            {' '}
            Logout
          </Text>
        </Button>
      </View>
    </ScrollView>
            </>
  );
}

const styles = StyleSheet.create({
  cover: {
    backgroundColor: '#14213D',
    width: '100%',
    height: 180,
    marginTop: 0,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
  },
  userImg: {
    marginRight: 20,
    marginTop: -90,
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  info: {
    width: '90%',
    marginLeft: 15,
    marginTop: 50,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customBtn: {
    marginTop: 50,
    marginLeft: 35,
    width: '80%',
  },
});
