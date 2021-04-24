import React from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPallete = ({route}) => {
  const {colors, name} = route.params;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={colors}
          keyExtractor={item => item.colorName}
          renderItem={({item}) => (
            <ColorBox colorName={item.colorName} colorHex={item.hexCode} />
          )}
          ListHeaderComponent={<Text style={styles.title}>{name}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};
export default ColorPallete;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
});
