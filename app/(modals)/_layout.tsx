import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerBackTitle: 'minimal',
        headerShown: false,
        headerBackButtonDisplayMode: 'minimal',
        title: '',
      }}
    />
  );
}
