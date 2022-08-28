import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function SearchBar() {
  return (
    <View style={{marginTop: 15, flexDirection: 'row'}}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        styles={{
          textInput: {
            backgroundColor: 'black',
            borderRadius: 20,
            fontWeight: '800',
            marginTop: 7,
            color: 'black',
          },
          textInputContainer: {
            backgroundColor: '#FFAFCC',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View>
            <Icon
              as={<Entypo name="location-pin" />}
              size={9}
              ml="1"
              color="black"
            />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: 'row',
              marginRight: 8,
              backgroundColor: 'white',
              padding: 9,
              borderRadius: 30,
              alignItems: 'center',
            }}>
            <Icon
              as={<AntDesign name="clockcircle" />}
              size={11}
              ml="1"
              color="black"
              marginRight={1}
            />
            <Text style={{color: 'black'}}>Search</Text>
          </View>
        )}
      />
    </View>
  );
}
