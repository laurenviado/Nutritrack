// app/(tabs)/recipes.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function RecipesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  type Recipe = {
    id: number;
    name: string;
    description: string;
  };
  

  // 🔧 Step 1: State to store fetched recipes from the database
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // ✅ TEMPORARY FAKE DATA for UI display (comment out once DB is hooked up)
  // const fakeRecipes = [
  //   {
  //     id: 1,
  //     name: 'Banana Oat Pancakes',
  //     description: 'A quick and healthy breakfast.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Lentil Soup',
  //     description: 'Comforting and hearty, perfect for winter.',
  //   },
  // ];

  // 🧠 TODO: Fetch recipes from the database on mount
  useEffect(() => {
    // Example pseudocode for fetch
    /*
    fetch('http://your-server.com/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
    */
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>My Recipes</Text>

      {/* 📦 Use `recipes` from state once DB is connected */}
      <FlatList
        // data={fakeRecipes} // ❌ remove this once using real data
        data={recipes} // ✅ use this instead
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: Colors[colorScheme].primary }]}
            onPress={() => router.push(`/view-recipe?id=${item.id}`)} // ✅ Pass RecipeID here
          >
            <Text style={[styles.name, { color: Colors[colorScheme].text }]}>{item.name}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>{item.description}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* ➕ Add Recipe Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: Colors[colorScheme].secondary }]}
        onPress={() => router.push('/(modals)/add-recipe')}
      >
        <Text style={styles.addButtonText}>+ Add Recipe</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
  name: {
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
