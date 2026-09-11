import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { theme } from '../../constants/theme';

type BatimentoButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export function BatimentoButton({
  title,
  onPress,
  variant = 'primary',
  style,
}: BatimentoButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isPrimary
            ? styles.primaryText
            : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: theme.colors.brand.primary,
  },

  secondary: {
    backgroundColor: theme.colors.neutral.surface,
    borderWidth: 1,
    borderColor: theme.colors.neutral.border,
  },

  pressed: {
    opacity: 0.75,
  },

  text: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
  },

  primaryText: {
    color: theme.colors.neutral.white,
  },

  secondaryText: {
    color: theme.colors.brand.primary,
  },
});