import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  BatimentoButton,
  BatimentoCard,
  BatimentoScreen,
} from '../../components/batimento';

import { theme } from '../../constants/theme';

export default function RitmoScreen() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  function decreaseBpm() {
    setBpm((currentBpm) => Math.max(30, currentBpm - 1));
  }

  function increaseBpm() {
    setBpm((currentBpm) => Math.min(300, currentBpm + 1));
  }

  function toggleMetronome() {
    setIsPlaying((currentValue) => !currentValue);
  }

  return (
    <BatimentoScreen style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.brand}>
          BATIMENTO
        </Text>

        <BatimentoCard style={styles.metronomeCard}>
          <Text style={styles.bpm}>
            {bpm}
          </Text>

          <Text style={styles.bpmLabel}>
            BPM
          </Text>

          <Text style={styles.meter}>
            4 / 4
          </Text>

          <View style={styles.beats}>
            <View style={[styles.beat, styles.activeBeat]} />
            <View style={styles.beat} />
            <View style={styles.beat} />
            <View style={styles.beat} />
          </View>
        </BatimentoCard>

        <View style={styles.bpmControls}>
          <BatimentoButton
            title="-"
            variant="secondary"
            onPress={decreaseBpm}
            style={styles.bpmButton}
          />

          <BatimentoButton
            title="+"
            variant="secondary"
            onPress={increaseBpm}
            style={styles.bpmButton}
          />
        </View>

        <BatimentoButton
          title={isPlaying ? 'PARAR' : 'INICIAR'}
          onPress={toggleMetronome}
        />
      </View>
    </BatimentoScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.neutral.background,
  },

  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },

  brand: {
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    fontSize: theme.typography.size.subtitle,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.brand.primary,
    letterSpacing: 2,
  },

  metronomeCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },

  bpm: {
    fontSize: theme.typography.size.display,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.neutral.text,
  },

  bpmLabel: {
    fontSize: theme.typography.size.caption,
    color: theme.colors.neutral.textSecondary,
  },

  meter: {
    marginTop: theme.spacing.lg,
    fontSize: theme.typography.size.subtitle,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.neutral.text,
  },

  beats: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },

  beat: {
    width: 12,
    height: 12,
    borderRadius: theme.radius.pill,
    borderWidth: 1.5,
    borderColor: theme.colors.brand.primary,
  },

  activeBeat: {
    backgroundColor: theme.colors.brand.primary,
  },

  bpmControls: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  bpmButton: {
    flex: 1,
  },
});