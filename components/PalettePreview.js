import React from 'react';
import {Text, FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import ColorSquare from './ColorSquare';

const PalettePreview = ({handlePress, colorPalette}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.colorsContainer}>
        <Text style={styles.paletteTitle}>{colorPalette.paletteName}</Text>
        <FlatList
          data={colorPalette.colors.slice(0, 5)}
          keyExtractor={item => item.colorName}
          horizontal={true}
          renderItem={({item}) => <ColorSquare colorHex={item.hexCode} />}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PalettePreview;

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: 'white',
    flex: 1,
  },
  colorsContainer: {
    margin: 10,
  },
  paletteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
