import { ReactNode } from 'react';
import {
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../constants/theme';

type BatimentoScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function BatimentoScreen({
  children,
  style,
}: BatimentoScreenProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral.background,
  },
});