import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {COLORS} from '../utils/constants';

const ColorPaletteModal = ({navigation}) => {
  const [name, onChangeName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleValueChange = useCallback((value, color) => {
    if (value) {
      setSelectedColors(colors => [...colors, color]);
    } else {
      setSelectedColors(colors => {
        colors.filter(
          selectedColor => color.colorName !== selectedColor.colorName,
        );
      });
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!name) {
      Alert.alert('Please enter a palette name');
    } else if (selectedColors.length < 3) {
      Alert.alert('Please add at least 3 colors');
    } else {
      const newColorPalette = {
        paletteName: name,
        colors: selectedColors,
      };
      setSelectedColors([]);
      navigation.navigate('Home', {newColorPalette});
    }
  }, [name, selectedColors]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name of your color palette</Text>
      <TextInput
        value={name}
        onChangeText={onChangeName}
        style={styles.input}
        placeholder="Palette name"
      />
      <FlatList
        data={COLORS}
        keyExtractor={item => item.colorName}
        renderItem={({item}) => (
          <View style={styles.colorContainer}>
            <Text>{item.colorName}</Text>
            <Switch
              value={
                !!selectedColors.find(
                  color => color.colorName === item.colorName,
                )
              }
              onValueChange={selected => {
                handleValueChange(selected, item);
              }}
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ColorPaletteModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#bbbbbb',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  colorContainer: {
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    height: 40,
    backgroundColor: '#008B8B',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
