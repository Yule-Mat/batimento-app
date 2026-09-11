import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';

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
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.neutral.background,
  },

  title: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.neutral.text,
  },

  subtitle: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.size.body,
    color: theme.colors.neutral.textSecondary,
  },
});