import { useEffect, useRef } from 'react';

type UseMetronomeClockProps = {
  isPlaying: boolean;
  bpm: number;
  beatsPerMeasure: number;
  onBeat: (beat: number) => void;
};

export function useMetronomeClock({
  isPlaying,
  bpm,
  beatsPerMeasure,
  onBeat,
}: UseMetronomeClockProps) {
  const bpmRef = useRef(bpm);
  const onBeatRef = useRef(onBeat);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    onBeatRef.current = onBeat;
  }, [onBeat]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let beat = 0;
    let timeout: ReturnType<typeof setTimeout>;

    onBeatRef.current(0);

    function scheduleNextBeat() {
      const intervalMs = 60000 / bpmRef.current;

      timeout = setTimeout(() => {
        beat = (beat + 1) % beatsPerMeasure;

        onBeatRef.current(beat);

        scheduleNextBeat();
      }, intervalMs);
    }

    scheduleNextBeat();

    return () => {
      clearTimeout(timeout);
    };
  }, [isPlaying, beatsPerMeasure]);
}