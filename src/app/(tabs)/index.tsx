import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  BatimentoButton,
  BatimentoCard,
  BatimentoScreen,
} from '../../components/batimento';

import { theme } from '../../constants/theme';
import {
  preload,
  setAudioModeAsync,
  useAudioPlayer,
} from 'expo-audio';
import { useMetronomeClock } from '../../hooks/useMetronomeClock';

const clickSource = require('../../../assets/sounds/click.wav');
const accentSource = require('../../../assets/sounds/accent.wav');

preload(clickSource);
preload(accentSource);

type BeatAccent = 'normal' | 'accent' | 'strong';
type Subdivision = 1 | 2 | 3 | 4;

export default function RitmoScreen() {
  const [bpm, setBpm] = useState(120);
  const [activeBpm, setActiveBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [subdivision, setSubdivision] =
  useState<Subdivision>(1);
  const [beatAccents, setBeatAccents] = useState<BeatAccent[]>([
  'strong',
  'normal',
  'normal',
  'normal',
]);

const [activeBeatAccents, setActiveBeatAccents] =
  useState<BeatAccent[]>([
    'strong',
    'normal',
    'normal',
    'normal',
  ]);

const clickPlayer = useAudioPlayer(clickSource);
const accentPlayer = useAudioPlayer(accentSource);
const pulseOpacity = useRef(new Animated.Value(1)).current; 
const activeBeatAccentsRef = useRef(activeBeatAccents);
const bpmHoldTimeout = useRef<ReturnType<typeof setTimeout> | null>(
  null
);
const bpmRepeatInterval = useRef<ReturnType<typeof setInterval> | null>(
  null
);
const bpmDraftRef = useRef(bpm);
const beatAccentsDraftRef = useRef(beatAccents);

useEffect(() => {
  activeBeatAccentsRef.current = activeBeatAccents;
}, [activeBeatAccents]);

  useMetronomeClock({
  isPlaying,
  bpm: activeBpm,
  beatsPerMeasure: 4,
  subdivisionsPerBeat: subdivision,

  onTick: ({
    beat,
    isMainBeat,
  }) => {
    if (!isMainBeat) {
      return;
    }

    setCurrentBeat(beat);

    playBeatSound(
      activeBeatAccentsRef.current[beat]
    );
  },
});

useEffect(() => {
  return () => {
    if (bpmHoldTimeout.current) {
      clearTimeout(bpmHoldTimeout.current);
    }

    if (bpmRepeatInterval.current) {
      clearInterval(bpmRepeatInterval.current);
    }
  };
}, []);

  const tapTimes = useRef<number[]>([]);

  function changeBpm(amount: number) {
  setBpm((currentBpm) => {
    const nextBpm = Math.min(
      300,
      Math.max(30, currentBpm + amount)
    );

    bpmDraftRef.current = nextBpm;

    return nextBpm;
  });
}

function startBpmHold(direction: 1 | -1) {
  changeBpm(direction);

  const startedAt = Date.now();

  bpmHoldTimeout.current = setTimeout(() => {
    bpmRepeatInterval.current = setInterval(() => {
      const heldFor = Date.now() - startedAt;

      let step = 1;

      if (heldFor > 1200) {
        step = 2;
      }

      if (heldFor > 2500) {
        step = 5;
      }

      changeBpm(direction * step);
    }, 100);
  }, 350);
}

function stopBpmHold() {
  if (bpmHoldTimeout.current) {
    clearTimeout(bpmHoldTimeout.current);
  }

  if (bpmRepeatInterval.current) {
    clearInterval(bpmRepeatInterval.current);
  }

  bpmHoldTimeout.current = null;
  bpmRepeatInterval.current = null;

  setActiveBpm(bpmDraftRef.current);
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
  function cycleBeatAccent(beatIndex: number) {
  setBeatAccents((currentAccents) => {
    const newAccents = currentAccents.map((accent, index) => {
      if (index !== beatIndex) {
        return accent;
      }

      if (accent === 'normal') {
        return 'accent';
      }

      if (accent === 'accent') {
        return 'strong';
      }

      return 'normal';
    });

    beatAccentsDraftRef.current = newAccents;

    return newAccents;
  });
}

function commitBeatAccents() {
  const newActiveAccents = [
    ...beatAccentsDraftRef.current,
  ];

  activeBeatAccentsRef.current = newActiveAccents;

  setActiveBeatAccents(
    newActiveAccents
  );
}

async function playBeatSound(accent: BeatAccent) {
  
  const player =
    accent === 'normal'
      ? clickPlayer
      : accentPlayer;

  player.volume =
    accent === 'normal'
      ? 0.45
      : accent === 'accent'
        ? 0.7
        : 1;

  try {
    await player.seekTo(0);
    player.play();
  } catch (error) {
    console.log('Erro ao tocar click:', error);
  }
}

async function playSubdivisionSound() {
  clickPlayer.volume = 0.22;

  try {
    await clickPlayer.seekTo(0);
    clickPlayer.play();
  } catch (error) {
    console.log(
      'Erro ao tocar subdivisão:',
      error
    );
  }
}

useEffect(() => {
  async function configureAudio() {
    await setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'mixWithOthers',
    });

    console.log('Áudio configurado');
  }

  configureAudio();
}, []);

useEffect(() => {
  if (!isPlaying) {
    pulseOpacity.setValue(1);
    return;
  }
  const currentAccent = beatAccents[currentBeat];
  let flashStartOpacity = 0.65;

  if (currentAccent === 'accent') {
    flashStartOpacity = 0.4;
  }

  if (currentAccent === 'strong') {
    flashStartOpacity = 0.15;
  }

  pulseOpacity.setValue(flashStartOpacity);

  Animated.timing(pulseOpacity, {
    toValue: 1,
    duration: 120,
    useNativeDriver: true,
  }).start();
}, [
  currentBeat,
  isPlaying,
  beatAccents,
  pulseOpacity,
]);


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
           {[0, 1, 2, 3].map((beat) => {
            const accent = beatAccents[beat];
            const isCurrentBeat = currentBeat === beat;

            return (
             <Pressable
              key={beat}
              onPressIn={() => cycleBeatAccent(beat)}
              onPressOut={commitBeatAccents}
              style={styles.beatButton}
            >
           <Animated.View
            style={[
             styles.beat,
            accent === 'accent' && styles.accentBeat,
            accent === 'strong' && styles.strongBeat,
            isCurrentBeat && styles.activeBeat,
            isCurrentBeat && {
            opacity: pulseOpacity,
           },
          ]}
         />

        <Text style={styles.beatNumber}>
          {beat + 1}
        </Text>
      </Pressable>
    );
  })}
   </View>
        </BatimentoCard>

        <View style={styles.subdivisionSection}>
  <Text style={styles.subdivisionLabel}>
    SUBDIVISÃO
  </Text>

  <View style={styles.subdivisionControls}>
    <Pressable
      onPress={() => setSubdivision(1)}
      style={[
        styles.subdivisionButton,
        subdivision === 1 &&
          styles.subdivisionButtonActive,
      ]}
    >
      <Text
        style={[
          styles.subdivisionButtonText,
          subdivision === 1 &&
            styles.subdivisionButtonTextActive,
        ]}
      >
        Pulso
      </Text>
    </Pressable>

    <Pressable
      onPress={() => setSubdivision(2)}
      style={[
        styles.subdivisionButton,
        subdivision === 2 &&
          styles.subdivisionButtonActive,
      ]}
    >
      <Text
        style={[
          styles.subdivisionButtonText,
          subdivision === 2 &&
            styles.subdivisionButtonTextActive,
        ]}
      >
        2
      </Text>
    </Pressable>

    <Pressable
      onPress={() => setSubdivision(3)}
      style={[
        styles.subdivisionButton,
        subdivision === 3 &&
          styles.subdivisionButtonActive,
      ]}
    >
      <Text
        style={[
          styles.subdivisionButtonText,
          subdivision === 3 &&
            styles.subdivisionButtonTextActive,
        ]}
      >
        3
      </Text>
    </Pressable>

    <Pressable
      onPress={() => setSubdivision(4)}
      style={[
        styles.subdivisionButton,
        subdivision === 4 &&
          styles.subdivisionButtonActive,
      ]}
    >
      <Text
        style={[
          styles.subdivisionButtonText,
          subdivision === 4 &&
            styles.subdivisionButtonTextActive,
        ]}
      >
        4
      </Text>
    </Pressable>
  </View>
</View>

        <View style={styles.bpmControls}>
          <BatimentoButton
           title="-"
           variant="secondary"
           onPressIn={() => startBpmHold(-1)}
           onPressOut={stopBpmHold}
           style={styles.bpmButton}
          />

          <BatimentoButton
           title="+"
           variant="secondary"
           onPressIn={() => startBpmHold(1)}
           onPressOut={stopBpmHold}
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

  beatButton: {
  alignItems: 'center',
  gap: theme.spacing.xs,
},

  beat: {
  width: 20,
  height: 20,
  borderRadius: theme.radius.pill,
  borderWidth: 1.5,
  borderColor: theme.colors.brand.primary,
  backgroundColor: 'transparent',
},

accentBeat: {
  backgroundColor: theme.colors.brand.primaryLight,
  borderWidth: 2,
},

strongBeat: {
  backgroundColor: theme.colors.brand.primary,
  borderWidth: 3,
},

activeBeat: {
  backgroundColor: theme.colors.brand.primaryDark,
  borderColor: theme.colors.brand.primaryDark,
  opacity: 1,
},

beatNumber: {
  fontSize: theme.typography.size.caption,
  color: theme.colors.neutral.textSecondary,
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
subdivisionSection: {
  marginBottom: theme.spacing.lg,
},

subdivisionLabel: {
  marginBottom: theme.spacing.sm,
  textAlign: 'center',
  fontSize: theme.typography.size.caption,
  fontWeight: theme.typography.weight.semibold,
  color: theme.colors.neutral.textSecondary,
},

subdivisionControls: {
  flexDirection: 'row',
  gap: theme.spacing.sm,
},

subdivisionButton: {
  flex: 1,
  minHeight: 44,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1.5,
  borderColor: theme.colors.neutral.border,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.neutral.surface,
},

subdivisionButtonActive: {
  borderColor: theme.colors.brand.primary,
  backgroundColor: theme.colors.brand.primary,
},

subdivisionButtonText: {
  fontSize: theme.typography.size.caption,
  fontWeight: theme.typography.weight.semibold,
  color: theme.colors.neutral.text,
},

subdivisionButtonTextActive: {
  color: theme.colors.neutral.white,
},
});