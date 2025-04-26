import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AddRecipeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const params = useLocalSearchParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [servings, setServings] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [instructions, setInstructions] = useState('');

  // ✅ This pre-fills the form ONLY when editing an existing recipe
  useEffect(() => {
    if (params && name === '') {
      setName(params.RecipeName as string || '');
      setDescription(params.Description as string || '');
      setTotalTime(params.TotalTime as string || '');
      setServings(params.Servings as string || '');
      setInstructions(params.Instructions as string || '');
      setCalories(params.Calories as string || '');
      setProtein(params.Protein as string || '');
      setCarbs(params.Carbs as string || '');
      setFat(params.Fat as string || '');
    }
  }, [params]);

  const handleSubmit = () => {
    // ✅ Keep this for now to verify the data structure
    console.log({
      name,
      description,
      totalTime,
      servings,
      calories,
      protein,
      carbs,
      fat,
      instructions,
    });

    // 🧠 TODO: Replace this with a POST request to save to the database
    // Example:
    /*
    fetch('http://your-server.com/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        totalTime,   // expected as string, e.g. "00:30:00"
        servings: parseInt(servings),
        calories: parseInt(calories),
        protein: parseInt(protein),
        carbs: parseInt(carbs),
        fat: parseInt(fat),
        instructions,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log('Recipe saved:', data);
      router.back();
    })
    .catch(err => console.error('Error saving recipe:', err));
    */

    // ✅ Temporary fallback for now
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
        style={{ flex: 1 }}
      >
        {/* 🧠 All fields are required for POST request to work properly */}
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Recipe Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Oatmeal Banana Bake"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Quick, healthy breakfast recipe"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Total Time</Text>
        <TextInput
          value={totalTime}
          onChangeText={setTotalTime}
          placeholder="30 min"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Servings</Text>
        <TextInput
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
          placeholder="2"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Calories</Text>
        <TextInput
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          placeholder="350"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Protein (g)</Text>
        <TextInput
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
          placeholder="20"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Carbs (g)</Text>
        <TextInput
          value={carbs}
          onChangeText={setCarbs}
          keyboardType="numeric"
          placeholder="35"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Fat (g)</Text>
        <TextInput
          value={fat}
          onChangeText={setFat}
          keyboardType="numeric"
          placeholder="12"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Instructions</Text>
        <TextInput
          value={instructions}
          onChangeText={setInstructions}
          multiline
          placeholder="Step-by-step preparation"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.textArea, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        {/* ✅ Call backend to save new recipe */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors[colorScheme].secondary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
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
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    height: 120,
    textAlignVertical: 'top',
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
