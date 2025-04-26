import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';

type MealPlan = {
  Title: string;
  StartDate: string; // e.g. '2025-04-01'
  EndDate: string;
  CaloriesTarget: number;
  ProteinTarget: number;
  CarbsTarget: number;
  FatTarget: number;
  Notes: string;
};

export default function ViewMealPlanScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { id } = useLocalSearchParams(); // MealPlanID from router

  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  useEffect(() => {
    // 🧠 TODO: Replace with real fetch from DB
    /*
    fetch(`http://your-server.com/api/meal-plans/${id}`)
      .then(res => res.json())
      .then(data => setMealPlan(data))
      .catch(err => console.error('Failed to fetch meal plan:', err));
    */

    // ✅ TEMPORARY placeholder
    if (id === '1') {
      setMealPlan({
        Title: 'Spring Cut Plan',
        StartDate: '2025-04-01',
        EndDate: '2025-04-30',
        CaloriesTarget: 1800,
        ProteinTarget: 150,
        CarbsTarget: 150,
        FatTarget: 60,
        Notes: 'Maintain deficit, high protein for recovery.',
      });
    }
  }, [id]);

  if (!mealPlan) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
        <Text style={{ color: Colors[colorScheme].text }}>Meal Plan not found.</Text>
      </SafeAreaView>
    );
  }

  const {
    Title,
    StartDate,
    EndDate,
    CaloriesTarget,
    ProteinTarget,
    CarbsTarget,
    FatTarget,
    Notes,
  } = mealPlan;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>{Title}</Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme].icon }]}>
          {StartDate} to {EndDate}
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Macro Targets</Text>
          <Text style={styles.cardText}>Calories: {CaloriesTarget}</Text>
          <Text style={styles.cardText}>Protein: {ProteinTarget}g</Text>
          <Text style={styles.cardText}>Carbs: {CarbsTarget}g</Text>
          <Text style={styles.cardText}>Fat: {FatTarget}g</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notes</Text>
          <Text style={styles.cardText}>{Notes}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[colorScheme].secondary }]}
            onPress={() =>
              router.push({
                pathname: '/(modals)/add-meal-plan',
                params: { id, ...mealPlan },
              })
            }
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[colorScheme].rose }]}
            onPress={() => {
              // 🧠 TODO: Add DELETE endpoint call here
              // fetch(`http://your-server.com/api/meal-plans/${id}`, { method: 'DELETE' })
              alert('Meal plan deleted!');
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
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#EEE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
