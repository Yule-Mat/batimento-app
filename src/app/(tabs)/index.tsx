import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>BATIMENTO</Text>

      <Text style={styles.title}>
        Ouvir. Ver. Sentir.
      </Text>

      <Text style={styles.subtitle}>
        O ritmo começa aqui.
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
    backgroundColor: '#A52E35',
  },

  brand: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2,
  },

  title: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#F7F2F0',
  },
});