import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface IAddButton {
  onPress: () => void;
}

const AddButton: React.FC<IAddButton> = ({ onPress }) => {
  return <FAB style={styles.button} onPress={onPress} icon="plus" />;
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: '5%',
    bottom: '5%',
  },
});

export default AddButton;
