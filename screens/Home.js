import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const URL = 'https://color-palette-api.kadikraman.now.sh/palettes';

const Home = ({navigation}) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchPalettes();
  }, []);

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
});
