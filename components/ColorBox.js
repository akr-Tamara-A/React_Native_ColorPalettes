/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ColorBox = ({colorHex, colorName}) => {
  const boxColor = {
    backgroundColor: colorHex,
  };
  const boxText = {
    color: parseInt(colorHex.replace('#', ''), 16) > 0xffffff / 1.1 ? '#333333' : 'white',
  };
  return (
    <View style={[styles.box, boxColor]}>
      <Text style={boxText}>{colorName}: {colorHex}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginBottom: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#dddddd',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});

export default ColorBox;
