import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const URL = 'https://color-palette-api.kadikraman.now.sh/palettes';

const Home = ({navigation, route}) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;

  useEffect(() => {
    fetchPalettes();
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes(palettes => [newColorPalette, ...palettes]);
    }
  }, [newColorPalette]);

  const fetchPalettes = useCallback(async () => {
    const result = await fetch(URL);
    if (result.ok) {
      const palettes = await result.json();
      setColorPalettes(palettes);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchPalettes();
    setIsRefreshing(false);
  }, []);

  return (
    <View style={styles.homeScreen}>
      <FlatList
        data={colorPalettes}
        keyExtractor={item => item.paletteName}
        renderItem={({item}) => (
          <PalettePreview
            handlePress={() => {
              navigation.navigate('ColorPalette', {
                name: item.paletteName,
                colors: item.colors,
              });
            }}
            colorPalette={item}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.addPaletteButton}
            onPress={() => {
              navigation.navigate('ColorPaletteModal');
            }}>
            <Text style={styles.addPaletteButtonText}>Add a color scheme</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};
export default Home;

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
  addPaletteButton: {
    height: 40,
    backgroundColor: '#008B8B',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
  },
  addPaletteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
