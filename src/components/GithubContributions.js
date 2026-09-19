import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatCount = (count) => {
  if (count === 1) return '1 contribution';
  return `${count} contributions`;
};

const formatDate = (isoDate) => {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const buildWeeks = (days) => {
  if (!days.length) return [];

  const byDate = new Map(days.map((day) => [day.date, day]));
  const start = new Date(`${days[0].date}T12:00:00`);
  const end = new Date(`${days[days.length - 1].date}T12:00:00`);

  start.setDate(start.getDate() - start.getDay());

  const weeks = [];
  const cursor = new Date(start);

  while (cursor <= end || cursor.getDay() !== 0 || weeks.length === 0) {
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      const iso = cursor.toISOString().slice(0, 10);
      week.push(
        byDate.get(iso) || {
          date: iso,
          count: 0,
          level: 0,
          empty: cursor < new Date(`${days[0].date}T12:00:00`) || cursor > end,
        }
      );
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
    if (cursor > end && cursor.getDay() === 0) break;
  }

  return weeks;
};

const monthLabels = (weeks) =>
  weeks.map((week, index) => {
    const firstOfMonth = week.find((day) => day.date.endsWith('-01'));
    if (!firstOfMonth) return { index, label: '' };
    const month = Number(firstOfMonth.date.slice(5, 7)) - 1;
    return { index, label: MONTHS[month] };
  });

const GithubContributions = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    fetch('/github-contributions.json')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load contribution graph');
        return response.json();
      })
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch(() => {
        if (!cancelled) setError('Graph is refreshing. Check back after the next update.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => buildWeeks(data?.contributions || []), [data]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const updatedLabel = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <section id="github" className="site-section pt-0">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          className="readable overflow-hidden border border-white/12 bg-black/70"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-6">
            <div>
              <p className="font-tele text-[11px] uppercase tracking-[0.28em] text-race-red">
                GitHub
              </p>
              <h3 className="mt-1 font-display text-2xl uppercase text-white md:text-3xl">
                {data ? `${data.total} contributions in the last year` : 'Contributions'}
              </h3>
            </div>
            <a
              href={`https://github.com/${data?.login || 'admft'}`}
              target="_blank"
              rel="noreferrer"
              className="font-tele text-[11px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-white"
            >
              @{data?.login || 'admft'}
            </a>
          </div>

          <div className="px-5 py-5 md:px-6">
            {error && <p className="text-sm text-zinc-400">{error}</p>}

            {!error && !data && (
              <div className="h-[120px] animate-pulse bg-white/5" />
            )}

            {data && (
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <div
                    className="mb-1 grid gap-[3px] pl-8"
                    style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}
                  >
                    {labels.map(({ index, label }) => (
                      <span
                        key={`month-${index}`}
                        className="h-4 whitespace-nowrap text-[10px] leading-none text-zinc-500"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex w-6 shrink-0 flex-col justify-between py-[1px] text-[10px] leading-none text-zinc-500">
                      <span />
                      <span>Mon</span>
                      <span />
                      <span>Wed</span>
                      <span />
                      <span>Fri</span>
                      <span />
                    </div>

                    <div
                      className="grid gap-[3px]"
                      style={{
                        gridTemplateColumns: `repeat(${weeks.length}, 11px)`,
                        gridTemplateRows: 'repeat(7, 11px)',
                        gridAutoFlow: 'column',
                      }}
                    >
                      {weeks.flatMap((week) =>
                        week.map((day) => (
                          <span
                            key={day.date}
                            title={
                              day.empty
                                ? ''
                                : `${formatCount(day.count)} on ${formatDate(day.date)}`
                            }
                            className={`block h-[11px] w-[11px] rounded-[2px] ${
                              day.empty
                                ? 'bg-transparent'
                                : [
                                    'bg-[#161b22]',
                                    'bg-[#0e4429]',
                                    'bg-[#006d32]',
                                    'bg-[#26a641]',
                                    'bg-[#39d353]',
                                  ][Math.min(day.level, 4)]
                            }`}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-500">
                    <p>Updated {updatedLabel}. Refreshes every 2 days.</p>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      {[0, 1, 2, 3, 4].map((level) => (
                        <span
                          key={level}
                          className={`h-[11px] w-[11px] rounded-[2px] ${
                            [
                              'bg-[#161b22]',
                              'bg-[#0e4429]',
                              'bg-[#006d32]',
                              'bg-[#26a641]',
                              'bg-[#39d353]',
                            ][level]
                          }`}
                        />
                      ))}
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubContributions;
