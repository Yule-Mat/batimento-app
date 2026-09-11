import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#A52E35',
        tabBarInactiveTintColor: '#6C6464',
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