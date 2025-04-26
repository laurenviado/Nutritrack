import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


const CIRCLE_RADIUS = 30;
const STROKE_WIDTH = 4;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

// FAKE DATA
type Props = {
    percentage: number;
    label: string;
    value: number;
    goal: number;
  };  

export default function ProgressCircle({ percentage = 0, label, value, goal }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const progress = Math.min(percentage, 1); // cap at 100%
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <View style={styles.wrapper}>
      <Svg width={70} height={70}>
        <Circle
          stroke="#ccc"
          strokeWidth={STROKE_WIDTH}
          cx={35}
          cy={35}
          r={CIRCLE_RADIUS}
          fill="none"
        />
        <Circle
          stroke={Colors[colorScheme].accent}
          strokeWidth={STROKE_WIDTH}
          cx={35}
          cy={35}
          r={CIRCLE_RADIUS}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={-90}
          origin="35,35"
        />
      </Svg>
      <Text style={styles.percentage}>{value}/{goal}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  percentage: {
    position: 'absolute',
    top: '30%',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
  },  
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
