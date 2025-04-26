import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';

export default function AddMealPlanScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDateStr, setStartDateStr] = useState('');
  const [endDateStr, setEndDateStr] = useState('');
  const [caloriesTarget, setCaloriesTarget] = useState('');
  const [proteinTarget, setProteinTarget] = useState('');
  const [carbsTarget, setCarbsTarget] = useState('');
  const [fatTarget, setFatTarget] = useState('');
  const [notes, setNotes] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSubmit = () => {
    const start = Platform.OS === 'web' ? parseDate(startDateStr) : startDate;
    const end = Platform.OS === 'web' ? parseDate(endDateStr) : endDate;
  
    if (!start || !end) {
      alert('Please enter valid dates in MM-DD-YYYY format.');
      return;
    }
  
    // ✅ TEMP console.log for testing
    console.log({
      title,
      startDate: start.toISOString().split('T')[0], // YYYY-MM-DD
      endDate: end.toISOString().split('T')[0],
      caloriesTarget,
      proteinTarget,
      carbsTarget,
      fatTarget,
      notes,
    });
  
    // 🧠 TODO: Replace with backend POST call
    /*
    fetch('http://your-server.com/api/meal-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserID: 1, // 🔑 Pass in real user ID once auth is added
        Title: title,
        StartDate: start.toISOString().split('T')[0],
        EndDate: end.toISOString().split('T')[0],
        CaloriesTarget: parseFloat(caloriesTarget),
        ProteinTarget: parseFloat(proteinTarget),
        CarbsTarget: parseFloat(carbsTarget),
        FatTarget: parseFloat(fatTarget),
        Notes: notes,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Saved Meal Plan:', data);
        router.back();
      })
      .catch((err) => console.error('Error saving meal plan:', err));
    */
  
    // ✅ TEMP fallback for now
    router.back();
  };
  


  const formatDateDisplay = (date: Date | null) =>
    date
      ? `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`
      : '';

  const parseDate = (str: string): Date | null => {
    const [month, day, year] = str.split('-');
    const parsed = new Date(`${year}-${month}-${day}`);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const isValidDateFormat = (str: string) => /^\d{2}-\d{2}-\d{4}$/.test(str);

  const openStartDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: startDate ?? new Date(),
        mode: 'date',
        onChange: (_, selectedDate) => {
          if (selectedDate) {
            setStartDate(selectedDate);
            setStartDateStr(formatDateDisplay(selectedDate));
          }
        },
      });
    } else {
      setShowStartPicker(true);
    }
  };

  const openEndDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: endDate ?? new Date(),
        mode: 'date',
        onChange: (_, selectedDate) => {
          if (selectedDate) {
            setEndDate(selectedDate);
            setEndDateStr(formatDateDisplay(selectedDate));
          }
        },
      });
    } else {
      setShowEndPicker(true);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
    >
      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Bulking Plan"
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      {/* Start Date */}
      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Start Date</Text>
      {Platform.OS === 'web' ? (
        <TextInput
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
          value={startDateStr}
          onChangeText={setStartDateStr}
          placeholder="MM-DD-YYYY"
        />
      ) : (
        <>
          <TouchableOpacity onPress={openStartDatePicker}>
            <TextInput
              editable={false}
              placeholder="Select a date"
              placeholderTextColor={Colors[colorScheme].icon}
              value={formatDateDisplay(startDate)}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />
          </TouchableOpacity>
          {showStartPicker && Platform.OS === 'ios' && (
            <DateTimePicker
              value={startDate ?? new Date()}
              mode="date"
              display="spinner"
              onChange={(_, selectedDate) => {
                setShowStartPicker(false);
                if (selectedDate) {
                  setStartDate(selectedDate);
                  setStartDateStr(formatDateDisplay(selectedDate));
                }
              }}
            />
          )}
        </>
      )}

      {/* End Date */}
      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>End Date</Text>
      {Platform.OS === 'web' ? (
        <TextInput
          style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
          value={endDateStr}
          onChangeText={setEndDateStr}
          placeholder="MM-DD-YYYY"
        />
      ) : (
        <>
          <TouchableOpacity onPress={openEndDatePicker}>
            <TextInput
              editable={false}
              placeholder="Select a date"
              placeholderTextColor={Colors[colorScheme].icon}
              value={formatDateDisplay(endDate)}
              style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
            />
          </TouchableOpacity>
          {showEndPicker && Platform.OS === 'ios' && (
            <DateTimePicker
              value={endDate ?? new Date()}
              mode="date"
              display="spinner"
              onChange={(_, selectedDate) => {
                setShowEndPicker(false);
                if (selectedDate) {
                  setEndDate(selectedDate);
                  setEndDateStr(formatDateDisplay(selectedDate));
                }
              }}
            />
          )}
        </>
      )}

      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Calories Target</Text>
      <TextInput
        value={caloriesTarget}
        onChangeText={setCaloriesTarget}
        keyboardType="numeric"
        placeholder="e.g. 2200"
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Protein Target</Text>
      <TextInput
        value={proteinTarget}
        onChangeText={setProteinTarget}
        keyboardType="numeric"
        placeholder="e.g. 150"
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Carbs Target</Text>
      <TextInput
        value={carbsTarget}
        onChangeText={setCarbsTarget}
        keyboardType="numeric"
        placeholder="e.g. 200"
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Fat Target</Text>
      <TextInput
        value={fatTarget}
        onChangeText={setFatTarget}
        keyboardType="numeric"
        placeholder="e.g. 60"
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="Optional notes..."
        placeholderTextColor={Colors[colorScheme].icon}
        style={[styles.textArea, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].secondary }]}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme].secondary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Save Meal Plan</Text>
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
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    height: 100,
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
