import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
 
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
const {width} = Dimensions.get('window');
import {COLOURS} from '../../../components/db';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import HeaderTabs from '../../../components/HeaderTab';

import {Button} from 'native-base';

const Home = ({navigation}) => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    firestore()
      .collection('products')
      .get()
      .then(querySnapshot => {
        let array = [];
        querySnapshot.forEach(documentSnapshot => {
          array.push({...documentSnapshot.data()});
          setProduct(array);
        });
      });
  }, []);
  const Card = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.subCard}>
          <View style={styles.body}>
            <Image
              style={{width: '80%', height: '50%', borderRadius: 15}}
              source={{
                uri: item.url || 'https://source.unsplash.com/200x150/?fashion',
              }}
            />

            <Text
              style={{
                marginLeft: 0,
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                marginLeft: 2,
              }}>
              {`${item.price}$`}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', {item})}>
              <Entypo
                name="bookmark"
                style={{
                  fontSize: 30,
                  color: COLOURS.backgroundDark,
                  borderRadius: 10,
                  marginLeft: 130,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      nestedScrollEnabled={true}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      {/* <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <HeaderTabs />
         
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 26,
              color: '#FFAFCC',
              fontWeight: 'blod',
              letterSpacing: 0.5,
              marginBottom: 10,
              textAlign: 'center',
            }}>
            USMANIA GROUPS RealEstate &amp; Service
          </Text>
          <Button
            onPress={() => {
              navigation.navigate('About');
            }}
            size="lg"
            variant="ghost"
            colorScheme="secondary"
            style={{
              marginLeft: 39,
              // marginBottom: 120,
              width: 100,
              // padding: 200,
              width: Dimensions.get('window').width / 1.5,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 24}}>
              {' '}
              ABOUT US
            </Text>
          </Button>
        </View>
      </ScrollView>

      <FlatList
        data={products}
        numColumns={2}
        renderItem={({item}) => <Card item={item} />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 10,
   
  },
  card: {
    width: width * 0.503,
    height: 100,
    marginBottom: 100,
    borderRadius: 15,
    
  },
  subCard: {
    height: 400,
    backgroundColor: 'white',
    borderRadius: 15,
  },

  font: {
    fontSize: 12,
    fontWeight: 'bold',

    color: 'black',
  },
});
