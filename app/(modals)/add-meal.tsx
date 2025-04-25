import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function AddMealScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const [mode, setMode] = useState<'recipe' | 'custom'>('recipe');

  // For both modes
  const [mealType, setMealType] = useState(''); // e.g., Breakfast, Lunch

  // Recipe Mode
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [servings, setServings] = useState('1');

  // Custom Mode
  const [customName, setCustomName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const handleSubmit = () => {
    if (mode === 'recipe') {
      console.log({ mealType, selectedRecipe, servings });
    } else {
      console.log({ mealType, customName, calories, protein, carbs, fat });
    }
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ScrollView>
        <Text style={[styles.header, { color: Colors[colorScheme].text }]}>Add Meal</Text>

        {/* Meal Type Input */}
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Meal Type</Text>
        <TextInput
          value={mealType}
          onChangeText={setMealType}
          placeholder="e.g. Breakfast"
          placeholderTextColor={Colors[colorScheme].icon}
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
        />

        {/* Mode Toggle */}
        <View style={styles.toggleContainer}>
            <TouchableOpacity
                onPress={() => setMode('recipe')}
                style={[
                    styles.toggleButton,
                    {
                    backgroundColor: mode === 'recipe' ? Colors[colorScheme].secondary : 'transparent',
                    borderColor: Colors[colorScheme].secondary,
                    },
                ]}
                >
                <Text
                    style={{
                    fontWeight: 'bold',
                    color: mode === 'recipe' ? Colors[colorScheme].text : Colors[colorScheme].text, // you can make this '#aaa' or similar if needed
                    }}
                >
                    Use Recipe
                </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => setMode('custom')}
                style={[
                    styles.toggleButton,
                    {
                    backgroundColor: mode === 'custom' ? Colors[colorScheme].secondary : 'transparent',
                    borderColor: Colors[colorScheme].secondary,
                    },
                ]}
                >
                <Text
                    style={{
                    fontWeight: 'bold',
                    color: mode === 'custom' ? Colors[colorScheme].text : Colors[colorScheme].text,
                    }}
                >
                    Custom Item
                </Text>
            </TouchableOpacity>
        </View>

        {mode === 'recipe' ? (
          <>
            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Recipe</Text>
            <TextInput
              value={selectedRecipe}
              onChangeText={setSelectedRecipe}
              placeholder="e.g. Oatmeal Bake"
              placeholderTextColor={Colors[colorScheme].icon}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />

            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Servings</Text>
            <TextInput
              value={servings}
              onChangeText={setServings}
              keyboardType="numeric"
              placeholder="1"
              placeholderTextColor={Colors[colorScheme].icon}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />
          </>
        ) : (
          <>
            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Item Name</Text>
            <TextInput
              value={customName}
              onChangeText={setCustomName}
              placeholder="e.g. Banana"
              placeholderTextColor={Colors[colorScheme].icon}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />

            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Calories</Text>
            <TextInput
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
              placeholder="e.g. 90"
              placeholderTextColor={Colors[colorScheme].icon}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />

            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Protein (g)</Text>
            <TextInput
              value={protein}
              onChangeText={setProtein}
              keyboardType="numeric"
              placeholder="e.g. 1"
              placeholderTextColor={Colors[colorScheme].icon}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />

            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Carbs (g)</Text>
            <TextInput
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
              placeholder="e.g. 23"
              placeholderTextColor={Colors[colorScheme].icon}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />

            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Fat (g)</Text>
            <TextInput
              value={fat}
              onChangeText={setFat}
              keyboardType="numeric"
              placeholder="e.g. 0.3"
              placeholderTextColor={Colors[colorScheme].icon}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />
          </>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors[colorScheme].secondary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
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
  toggleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-evenly',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#aaa',
  },
  activeToggle: {
    backgroundColor: '#aaa',
  },
  toggleText: {
    fontWeight: 'bold',
  },
});
