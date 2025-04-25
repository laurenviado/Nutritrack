import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type Recipe = {
  RecipeName: string;
  Description: string;
  TotalTime: string;
  Servings: number;
  Calories: number;
  Protein: number;
  Carbs: number;
  Fat: number;
  Instructions: string;
};

export default function ViewRecipe() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // 🧠 TODO: Replace this with a real API call to fetch a single recipe by ID
    /*
    fetch(`http://your-server.com/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(err => {
        console.error('Failed to fetch recipe:', err);
      });
    */

    // ✅ TEMPORARY: Use fake data for layout testing only
    const fakeRecipes: { [key: string]: Recipe } = {
      '1': {
        RecipeName: 'Banana Oatmeal',
        Description: 'A quick and easy breakfast!',
        TotalTime: '10 min',
        Servings: 2,
        Calories: 350,
        Protein: 12,
        Carbs: 45,
        Fat: 10,
        Instructions: 'Mash banana.\nMix with oats.\nMicrowave for 2 minutes.',
      },
    };

    setRecipe(fakeRecipes[id as string] ?? null);
  }, [id]);

  if (!recipe) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>Recipe not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ScrollView>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>{recipe.RecipeName}</Text>

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Description:</Text>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>{recipe.Description}</Text>

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Total Time:</Text>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>{recipe.TotalTime}</Text>

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Servings:</Text>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>{recipe.Servings}</Text>

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Calories:</Text>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>{recipe.Calories} kcal</Text>

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Protein:</Text>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>{recipe.Protein} g</Text>

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Carbs:</Text>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>{recipe.Carbs} g</Text>

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Fat:</Text>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>{recipe.Fat} g</Text>

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Instructions:</Text>
        {recipe.Instructions.split('\n').map((line, index) => (
          <Text key={index} style={[styles.text, { color: Colors[colorScheme].text }]}>
            {index + 1}. {line}
          </Text>
        ))}

        {/* 🧠 You may want to hook up these buttons to real backend logic */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[colorScheme].secondary }]}
            onPress={() => {
              router.push({
                pathname: '/(modals)/add-recipe',
                params: { ...recipe, id: id as string },
              });
            }}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => {
              // 🧠 TODO: Call DELETE endpoint here
              // fetch(`http://your-server.com/api/recipes/${id}`, { method: 'DELETE' })
              alert('Recipe deleted!');
              router.back();
            }}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontWeight: 'bold', fontSize: 16, marginTop: 12 },
  text: { fontSize: 14, marginTop: 4 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
