import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const fakePantryData = [
  { id: '1', name: 'Oats', quantity: 2, unit: 'cups', expiration: '2025-05-01' },
  { id: '2', name: 'Chickpeas', quantity: 1, unit: 'can', expiration: '2025-06-15' },
  { id: '3', name: 'Olive Oil', quantity: 500, unit: 'ml', expiration: '2026-01-01' },
];

export default function PantryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>My Pantry</Text>

      <FlatList
        data={fakePantryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: Colors[colorScheme].primary }]}>
            <Text style={[styles.itemName, { color: Colors[colorScheme].text }]}>{item.name}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>
              {item.quantity} {item.unit} • Expires {item.expiration}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: Colors[colorScheme].secondary }]}
        onPress={() => router.push('/(modals)/add-pantry-item')}
        >
        <Text style={styles.addButtonText}>+ Add Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
