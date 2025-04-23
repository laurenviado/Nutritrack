import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function AddPantryItemScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [expiration, setExpiration] = useState('');

  const handleSubmit = () => {
    console.log({ name, quantity, unit, expiration });
    // later: save to DB and navigate back
    router.back(); // goes back to pantry
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Ingredient Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Oats"
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Quantity</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        placeholder="2"
        keyboardType="numeric"
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Unit</Text>
      <TextInput
        value={unit}
        onChangeText={setUnit}
        placeholder="cups"
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Expiration Date</Text>
      <TextInput
        value={expiration}
        onChangeText={setExpiration}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme].secondary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
