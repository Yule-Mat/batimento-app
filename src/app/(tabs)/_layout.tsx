import { Tabs } from 'expo-router';
import { theme } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors.neutral.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ritmo',
        }}
      />

      <Tabs.Screen
        name="treinar"
        options={{
          title: 'Treinar',
        }}
      />

      <Tabs.Screen
        name="metodo"
        options={{
          title: 'Método',
        }}
      />

      <Tabs.Screen
        name="progresso"
        options={{
          title: 'Progresso',
        }}
      />
    </Tabs>
  );
}