import { ReactNode } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { theme } from '../../constants/theme';

type BatimentoCardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function BatimentoCard({
  children,
  style,
}: BatimentoCardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutral.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.neutral.border,
  },
});