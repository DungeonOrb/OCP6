const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function mondayIndex(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const js = d.getDay();      // Sun=0 Mon=1 ... Sat=6
  return (js + 6) % 7;        // Mon=0 ... Sun=6
}

function weekIndexInRange(dateStr, rangeStartStr) {
  const d = new Date(dateStr + "T00:00:00");
  const start = new Date(rangeStartStr + "T00:00:00");
  const diffDays = Math.floor((d - start) / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7); // 0 => S1
}

export function buildDashboardData(activity, rangeStartStr) {
  // 1) weekly distance totals (S1..S4)
  const weeklySum = [0, 0, 0, 0];
  for (const s of activity) {
    const wi = weekIndexInRange(s.date, rangeStartStr);
    if (wi >= 0 && wi < 4) weeklySum[wi] += s.distance;
  }

  const weeklyKm = weeklySum.map((km, i) => ({
    week: `S${i + 1}`,
    km: Number(km.toFixed(1)),
  }));

  const avgKm4Weeks = Number((weeklySum.reduce((a, b) => a + b, 0) / 4).toFixed(1));

  // 2) BPM per weekday (min/max + lastMax line)
  // If multiple sessions on same weekday:
  // - min = min(min)
  // - max = max(max)
  // - lastMax = max of the latest session that weekday
  const bpm = DAY_LABELS.map((day) => ({
    day,
    min: null,
    max: null,
    lastMax: null,
    _lastDate: null, // internal helper
  }));

  for (const s of activity) {
    const i = mondayIndex(s.date);
    const hr = s.heartRate;
    const cur = bpm[i];

    const nextMin = cur.min == null ? hr.min : Math.min(cur.min, hr.min);
    const nextMax = cur.max == null ? hr.max : Math.max(cur.max, hr.max);

    // lastMax = max of the most recent session on that weekday
    let nextLastMax = cur.lastMax;
    let nextLastDate = cur._lastDate;
    if (nextLastDate == null || s.date > nextLastDate) {
      nextLastDate = s.date;
      nextLastMax = hr.max;
    }

    bpm[i] = {
      day: cur.day,
      min: nextMin,
      max: nextMax,
      lastMax: nextLastMax,
      _lastDate: nextLastDate,
    };
  }

  const bpmClean = bpm.map(({ _lastDate, ...rest }) => rest);

  const runsDone = activity.length;
  const durationMinutes = activity.reduce((acc, s) => acc + s.duration, 0);
  const distanceKm = Number(activity.reduce((acc, s) => acc + s.distance, 0).toFixed(1));

  return {
    weeklyKm,
    avgKm4Weeks,
    bpm: bpmClean,
    totals: {
      runsDone,
      runsGoal: 6, 
      durationMinutes,
      distanceKm,
    },
  };
}