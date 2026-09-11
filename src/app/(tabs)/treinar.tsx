import { StyleSheet, Text, View } from 'react-native';

export default function TreinarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treinar</Text>
      <Text style={styles.subtitle}>
        Exercícios e prática rítmica.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F7F2F0',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#292426',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#6C6464',
  },
});