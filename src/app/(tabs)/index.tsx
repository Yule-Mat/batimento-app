import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';

export default function RitmoScreen() {
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
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.brand.primary,
  },

  brand: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.neutral.white,
    letterSpacing: 2,
  },

  title: {
    marginTop: theme.spacing.lg,
    fontSize: theme.typography.size.subtitle,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.neutral.white,
  },

  subtitle: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.size.body,
    color: theme.colors.neutral.background,
  },
});