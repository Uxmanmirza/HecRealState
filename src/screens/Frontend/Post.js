import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

// import InputField from "../../components/InputField";
import {Input, Button, Icon} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import CustomButton from '../../components/CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function Post({navigation}) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [area, setArea] = useState();
   

  const [image, setImage] = useState({});

  const handleSubmit = () => {
    console.log(singleItem);
  };

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
  const id = Math.random().toString(36).slice(2);
  
  const singleItem = {
    title,
    detail,
    price,
    location,
    type,
    area,
  };
  singleItem.id = id;
  

  const productUpload = async () => {
      if (image.uri) {
          await storage()
          .ref(`images/${image.fileName}`)
          .putFile(image.uri)
          .then(async () => {
              const url = await storage()
              .ref(`images/${image.fileName}`)
              .getDownloadURL();
              
               
          firestore()
            .collection('products')
            .doc(singleItem.id)
            .set({...singleItem, url})
            .then(() => {
              console.log('product has been successfully added.');
              navigation.navigate("Home")
              
            })
            .catch(err => {
              console.error(err);
            });
        });
      Alert('product added');
    } else {
      firestore()
        .collection('products')
        .doc(singleItem.id)
        .set({...singleItem, url})
        .then(() => {
          console.log('product has been successfully added.');
          navigation.navigate("Home")
        
          
        })
        .catch(err => {
          console.error(err);
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
            fontSize: 40,
            fontWeight: 'bold',
            color: '#FFAFCC',
            marginBottom: 30,
            textAlign: 'center',
          }}>
          RealEstate
        </Text>

        <Text
          style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: 30,
            fontSize: 20,
          }}>
          Post
        </Text>
        <Input
          marginLeft={50}
          marginTop={30}
          value = {title}
          onChangeText={userName => setTitle(userName)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="pencil" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="Enter your Title here"
          w="100%"
          maxWidth="300px"
          variant="underlined"
         
        />
        
         <Input
          marginLeft={50}
          marginTop={30}
          value = {location}
          onChangeText={userName => setLocation(userName)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="location" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="Enter your Location here"
          w="100%"
          maxWidth="300px"
          variant="underlined"
         
        />
        {/* <Input
          label={'Type'}
          icon={
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          labelValue={type}
          onChangeText={userName => setType(userName)}
        /> */}
         <Input
          marginLeft={50}
          marginTop={30}
          value = {type}
          onChangeText={userName => setType(userName)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="information-circle-outline" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="Type"
          w="100%"
          maxWidth="300px"
          variant="underlined"
           
        />
        {/* <Input
          label={'detail'}
          icon={
            <Ionicons
              name="ios-clipboard-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          labelValue={detail}
          onChangeText={itemDetail => setDetail(itemDetail)}
        /> */}
         <Input
          marginLeft={50}
          marginTop={30}
          value = {detail}
          onChangeText={itemDetail => setDetail(itemDetail)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="ios-clipboard-outline" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="Detail"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          type="text"
        />
        {/* <Input
          label={'Area in square'}
          icon={
            <Ionicons
              name="md-layers-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          labelValue={area}
          onChangeText={itemPrice => setArea(itemPrice)}
        /> */}
         <Input
          marginLeft={50}
          marginTop={30}
          value = {area}
          onChangeText={itemArea => setArea(itemArea)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="md-layers-outline" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="Area in square"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          type="any"
        />

        {/* <Input
          label={'Price'}
          icon={
            <Ionicons
              name="md-pricetags-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          labelValue={price}
          onChangeText={itemPrice => setprice(itemPrice)}
        /> */}
         <Input
          marginLeft={50}
          marginTop={30}
          value = {price}
          onChangeText={itemPrice => setPrice(itemPrice)}
          InputLeftElement={
            <Icon
              as={<Ionicons name="md-pricetags-outline" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
          mx="4"
          placeholder="price"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          type="text"
        />

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

        <Button
         
          onPress={productUpload}
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
            Add Post
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
