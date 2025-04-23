import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressCircle from '@/components/ProgressCircle';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Calculate macro totals using fake data (at bottom of code)
  const macroTotals = fakeMeals.reduce(
    (totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fat: totals.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

    // fake data for meal plan block
  const currentMealPlan = {
    title: 'Cutting Plan',
    caloriesTarget: 1800,
    proteinTarget: 150,
    carbsTarget: 150,
    fatTarget: 60,
  };

  function calculateMacroProgress(intake: number, goal: number): number {
    return intake/goal;
  }
  
  
  // fake data for meal plan block
  const progressData: {
    [key: string]: { value: number; goal: number };
    calories: { value: number; goal: number };
    protein: { value: number; goal: number };
    carbs: { value: number; goal: number };
    fat: { value: number; goal: number };
  } = {
    calories: { value: 1900, goal: 1800 },
    protein: { value: 130, goal: 150 },
    carbs: { value: 160, goal: 150 },
    fat: { value: 70, goal: 60 },
  };  
  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>{today}</Text>

        {/* Meals Logged Block */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme].peach }]}>
            <TouchableOpacity onPress={() => router.push('/meal-log')}>
                <Text style={[styles.cardTitle, { color: Colors[colorScheme].text }]}>
                    Today's Meal Log
                </Text>
            </TouchableOpacity>          {/*   <--- no meals logged --->
          <Text style={[styles.emptyText, { color: Colors[colorScheme].text }]}>No meals logged yet.</Text>
          <TouchableOpacity style={[styles.cardButton, { backgroundColor: Colors[colorScheme].secondary }]}>
            <Text style={styles.cardButtonText}>+ Add Food</Text>
          </TouchableOpacity>
          */}
        <ScrollView style={styles.mealScroll} nestedScrollEnabled={true} showsVerticalScrollIndicator={true}>
        {fakeMeals.map((meal) => (
            <View key={meal.id} style={styles.mealItem}>
            <Text style={[styles.mealName, { color: Colors[colorScheme].text }]}>
                🍽️ {meal.mealType}: {meal.name}
            </Text>
            <Text style={{ color: Colors[colorScheme].text, fontSize: 12 }}>
                {meal.calories} kcal • {meal.protein}g P / {meal.carbs}g C / {meal.fat}g F
            </Text>
            </View>
        ))}
        </ScrollView>

        <TouchableOpacity style={[styles.cardButton, { backgroundColor: Colors[colorScheme].secondary }]}>
        <Text style={styles.cardButtonText}>+ Add Food</Text>
        </TouchableOpacity>
        </View>

        {/* Macros Block */}
        <View style={[styles.macrosBlock, { backgroundColor: Colors[colorScheme].primary }]}>
          <Text style={[styles.macrosTitle, { color: Colors[colorScheme].text }]}>Daily Macros</Text>
          {/*   <--- empty placeholder --->
          <View style={styles.chartsRow}>
            {['Protein', 'Carbs', 'Fats'].map((macro) => (
              <View style={styles.pieWrapper} key={macro}>
                <View style={[styles.piePlaceholder, { backgroundColor: Colors[colorScheme].accent }]} />
                <Text style={{ color: Colors[colorScheme].text, fontSize: 12 }}>{macro}</Text>
              </View>
            ))}
          </View>
          */}
            <View style={styles.chartsRow}>
            <View style={styles.macroItem}>
            <View style={styles.circleOutline}>
                <Text style={[styles.macroValue, { color: Colors[colorScheme].text }]}>
                    {macroTotals.protein}g
                </Text>
            </View>
                <Text style={[styles.macroLabel, { color: Colors[colorScheme].text }]}>
                Protein
                </Text>
            </View>
            <View style={styles.macroItem}>
            <View style={styles.circleOutline}>
                <Text style={[styles.macroValue, { color: Colors[colorScheme].text }]}>
                    {macroTotals.carbs}g
                </Text>
            </View>
                <Text style={[styles.macroLabel, { color: Colors[colorScheme].text }]}>
                Carbs
                </Text>
            </View>
            <View style={styles.macroItem}>
            <View style={styles.circleOutline}>
                <Text style={[styles.macroValue, { color: Colors[colorScheme].text }]}>
                    {macroTotals.fat}g
                </Text>
            </View>
                <Text style={[styles.macroLabel, { color: Colors[colorScheme].text }]}>
                Fat
                </Text>
            </View>
            </View>

        </View>

        {/* Meal Plan Block */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme].rose }]}>
            <TouchableOpacity onPress={() => router.push('/meal-plan')}>
                <Text style={[styles.cardTitle, { color: Colors[colorScheme].text }]}>
                    Current Meal Plan – {currentMealPlan.title}
                </Text>
            </TouchableOpacity>
            <View style={styles.chartsRow}>
                {(['calories', 'protein', 'carbs', 'fat'] as const).map((key) => {
                    const item = progressData[key];
                    const percent = item.value / item.goal;

                    return (
                    <ProgressCircle
                        key={key}
                        percentage={percent}
                        value={item.value}
                        goal={item.goal}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                    );
                })}
            </View>
        </View>

      </ScrollView>
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
    marginTop: 10,
    marginBottom: 20,
  },
  macrosBlock: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  macrosTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  chartsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
  },
  pieWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  piePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  emptyText: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  cardButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mealItem: {
    marginBottom: 12,
  },
  mealName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  mealScroll: {
    maxHeight: 150, // adjust as needed for 3-ish meals
    marginBottom: 12,
  },  
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
  },  
  circleOutline: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc', // you can swap this with a theme color if you'd like
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },  
  circleOutlineProgress: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  circleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    height: '100%',
    zIndex: 1,
    borderRadius: 30,
  },
  
});

const fakeMeals = [
    {
      id: 1,
      name: 'Greek Yogurt with Berries',
      mealType: 'Breakfast',
      calories: 250,
      protein: 20,
      carbs: 25,
      fat: 8,
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      mealType: 'Lunch',
      calories: 400,
      protein: 35,
      carbs: 15,
      fat: 18,
    },
    {
      id: 3,
      name: 'Salmon with Quinoa',
      mealType: 'Dinner',
      calories: 550,
      protein: 45,
      carbs: 30,
      fat: 22,
    },
    {
        id: 4,
        name: 'Salmon with Quinoa',
        mealType: 'Dinner',
        calories: 550,
        protein: 45,
        carbs: 30,
        fat: 22,
      },
      {
        id: 5,
        name: 'Salmon with Quinoa',
        mealType: 'Dinner',
        calories: 550,
        protein: 45,
        carbs: 30,
        fat: 22,
      },
  ];
  