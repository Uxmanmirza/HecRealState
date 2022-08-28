import {View, Text, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';

export default function HeaderTabs() {
  const [activeTab, setActiveTab] = useState('Delivery');

  return (
    <View
      style={{flexDirection: 'row', alignSelf: 'center' , marginLeft : 70}}>
      <HeaderButton
        text="Recent"
        btnColor="#FFAFCC"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Recommended"
        btnColor="white"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <View></View>
    </View>
  );
}

const HeaderButton = props => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? '#FFAFCC' : 'white',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => props.setActiveTab(props.text)}>
    <Text
      style={{
        color: 'white',
        fontWeight: '800',
        fontSize: 18,
        color: props.textColor,
      }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);
