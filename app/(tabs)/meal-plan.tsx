import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

type MealPlan = {
  id: string; // corresponds to MealPlanID in DB
  title: string;
  startDate: string; // formatted as YYYY-MM-DD
  endDate: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  notes: string; 
};

export default function MealPlanScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  // ✅ This will be filled by database query soon
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);

  // 🧠 TEMPORARY: Remove this after connecting DB 
  // const fakeMealPlans: MealPlan[] = [
  //   {
  //     id: '1',
  //     title: 'Spring Cut Plan',
  //     startDate: '2025-04-01',
  //     endDate: '2025-04-30',
  //     calories: 1800,
  //     protein: 150,
  //     carbs: 150,
  //     fat: 60,
  //     notes: 'Maintain deficit, high protein for recovery.',
  //   },
  // ];

  useEffect(() => {
    // 🧠 TODO: Replace this with actual fetch from your backend
    /*
    fetch('http://your-server.com/api/meal-plans')
      .then(res => res.json())
      .then(data => setMealPlans(data))
      .catch(err => console.error('Failed to fetch meal plans:', err));
    */

    // TEMP fallback (can be removed once DB is connected)
    setMealPlans([
      {
        id: '1',
        title: 'Spring Cut Plan',
        startDate: '2025-04-01',
        endDate: '2025-04-30',
        calories: 1800,
        protein: 150,
        carbs: 150,
        fat: 60,
        notes: 'Maintain deficit, high protein for recovery.',
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Meal Plans</Text>

      {/* 📦 This list will populate from DB via useEffect */}
      <FlatList
        data={mealPlans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: Colors[colorScheme].primary }]}
            onPress={() =>
              router.push({ pathname: '/(modals)/view-meal-plan', params: item })
            }
          >
            <Text style={[styles.cardTitle, { color: Colors[colorScheme].text }]}>
              {item.title}
            </Text>
            <Text style={{ color: Colors[colorScheme].text }}>
              {item.startDate} – {item.endDate}
            </Text>
            <Text style={{ color: Colors[colorScheme].text }}>
              Calories: {item.calories}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: Colors[colorScheme].secondary }]}
        onPress={() => router.push('/(modals)/add-meal-plan')}
      >
        <Text style={styles.addButtonText}>+ Add Meal Plan</Text>
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
