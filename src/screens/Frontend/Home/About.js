import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../components/db';

export default function About() {
  return (
    <View >
      <Text style = {style.text}> we offers the option to list apartments for sale, rent, or lease as well as virtually tour properties and contact agents.Users even can receive update notifications about selected properties from the app.

 

USMANIA GROUPS is free of cost for buyers and sellers. The primary source of revenue for the app comes from advertising and lead generation costs from realtors. USMAINIA’s scale earns it the title of best overall because it boasts the largest inventory, many ways to search and sort for both home buyers and apartment renters, and convenient features like sharing favorites and built-in applications.</Text>
    </View>
  )
}

const style = StyleSheet.create({

    text: {
        fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
              textAlign : "justify",
    }
})