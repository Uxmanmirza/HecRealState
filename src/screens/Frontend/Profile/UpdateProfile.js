import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Input, Icon, Button} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../../../context/Authcontext';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const {user} = useAuthContext();
  const [image, setImage] = useState({});

  useEffect(() => {
    setName(user.userName);
    setAddress(user.address);
    setPhonenumber(user.phonenumber);
  }, []);

  const imageUplaod = async () => {
    try {
      const result = await launchImageLibrary();
      result.didCancel = true;
      let file = result.assets[0];

      setImage(file);
      console.log(image);
    } catch (err) {
      console.error(err);
      console.log('uploading while error');
    }
  };

  const singleItem = {
    userName: name,
    address: address,
    phonenumber: phonenumber,
  };
  const SaveProfile = async () => {
    if (image.uri) {
      await storage()
        .ref(`images/${image.fileName}`)
        .putFile(image.uri)
        .then(async () => {
          const url = await storage()
            .ref(`images/${image.fileName}`)
            .getDownloadURL();
          firestore()
            .collection('users')
            .doc(user.uid)
            .update({...singleItem, url})
            .then(() => {
              console.log('User profile updated!');
              navigation.navigate("Profile")
            });
        });
      console.log('Profile Updated');
    } else {
      firestore()
        .collection('users')
        .doc(user.uid)
        .update(singleItem)
        .then(() => {
          console.log('User updated!');
          navigation.navigate("Profile")
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: 'bold',

            marginBottom: 30,
            textAlign: 'center',
            color: '#FFAFCC',
          }}>
          Profile
        </Text>

        <TouchableOpacity onPress={imageUplaod}>
          {image.uri ? (
            <Image
              style={styles.userImg}
              source={{
                uri:
                  image.uri ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wrXPLf0fSGdZXCPKp3Y-NrRNrnWLqQwvoQ&usqp=CAU',
              }}
            />
          ) : (
            <Ionicons
              name="image-outline"
              size={100}
              color="#666"
              style={{textAlign: 'center'}}
            />
          )}
        </TouchableOpacity>

        <Input
          marginLeft={50}
          marginTop={30}
          value={name}
          onChangeText={userName => setName(userName)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="md-pricetags-outline" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="Name"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          type="text"
        />

        <Input
          marginLeft={50}
          marginTop={30}
          value={address}
          onChangeText={userAddress => setAddress(userAddress)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="md-pricetags-outline" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="Address"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          type="text"
        />

        <Input
          marginLeft={50}
          marginTop={30}
          value={phonenumber}
          onChangeText={userNum => setPhonenumber(userNum)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="md-pricetags-outline" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="03001234567"
          w="100%"
          maxWidth="300px"
          variant="underlined"
        />

        <Button
          onPress={SaveProfile}
          
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userImg: {
    marginTop: 10,
    marginLeft: 90,
    height: 200,
    width: 200,
  },
});
