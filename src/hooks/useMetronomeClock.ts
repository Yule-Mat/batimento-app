import { useEffect, useRef } from 'react';

type UseMetronomeClockProps = {
  isPlaying: boolean;
  bpm: number;
  beatsPerMeasure: number;
  subdivisionsPerBeat?: number;
  onTick: (data: {
    beat: number;
    subdivision: number;
    isMainBeat: boolean;
  }) => void;
};

export function useMetronomeClock({
  isPlaying,
  bpm,
  beatsPerMeasure,
  subdivisionsPerBeat = 1,
  onTick,
}: UseMetronomeClockProps) {
  const bpmRef = useRef(bpm);
  const onTickRef = useRef(onTick);
  const subdivisionsRef = useRef(subdivisionsPerBeat);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    subdivisionsRef.current = subdivisionsPerBeat;
  }, [subdivisionsPerBeat]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let beat = 0;
    let subdivision = 0;
    let timeout: ReturnType<typeof setTimeout>;

    onTickRef.current({
      beat: 0,
      subdivision: 0,
      isMainBeat: true,
    });

    function scheduleNextTick() {
      const subdivisions =
        subdivisionsRef.current;

      const intervalMs =
        60000 /
        bpmRef.current /
        subdivisions;

      timeout = setTimeout(() => {
        subdivision += 1;

        if (subdivision >= subdivisions) {
          subdivision = 0;
          beat =
            (beat + 1) %
            beatsPerMeasure;
        }

        onTickRef.current({
          beat,
          subdivision,
          isMainBeat: subdivision === 0,
        });

        scheduleNextTick();
      }, intervalMs);
    }

    scheduleNextTick();

    return () => {
      clearTimeout(timeout);
    };
  }, [isPlaying, beatsPerMeasure]);
}