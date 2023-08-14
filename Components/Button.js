import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function RegisterButton(props) {
  const { onPress, title = 'Register' } = props;
  return (
    <TouchableHighlight  style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 27,
        marginBottom: 16,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        padding: 16,
        fontSize: 16,
        height: 51,
        width: 343,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
})