import { useRef, useState } from 'react';
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

  const tapTimes = useRef<number[]>([]);

  function decreaseBpm() {
    setBpm((currentBpm) => Math.max(30, currentBpm - 1));
  }

  function increaseBpm() {
    setBpm((currentBpm) => Math.min(300, currentBpm + 1));
  }

  function toggleMetronome() {
    setIsPlaying((currentValue) => !currentValue);
  }

  function tapTempo() {
  const now = Date.now();

  const lastTap = tapTimes.current[tapTimes.current.length - 1];

  if (lastTap && now - lastTap > 2000) {
    tapTimes.current = [];
  }

  tapTimes.current.push(now);

  if (tapTimes.current.length > 5) {
    tapTimes.current.shift();
  }

  if (tapTimes.current.length < 2) {
    return;
  }

  const intervals = [];

  for (let i = 1; i < tapTimes.current.length; i += 1) {
    intervals.push(
      tapTimes.current[i] - tapTimes.current[i - 1]
    );
  }

  const averageInterval =
    intervals.reduce((sum, interval) => sum + interval, 0) /
    intervals.length;

  const calculatedBpm = Math.round(
    60000 / averageInterval
  );

  const limitedBpm = Math.min(
    300,
    Math.max(30, calculatedBpm)
  );

  setBpm(limitedBpm);
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
            title="TAP"
            variant="secondary"
            onPress={tapTempo}
            style={styles.tapButton}
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
  tapButton: {
  flex: 1.5,
},
});