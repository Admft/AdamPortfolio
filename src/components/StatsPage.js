import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CalendarDays, BarChart3, RefreshCw, Users } from 'lucide-react';
import { fetchVisitorStats, trackVisitor } from '../lib/visitorStats';

const statIcons = {
  today: Activity,
  week: CalendarDays,
  month: BarChart3,
  allTime: Users,
};

const StatsCard = ({ id, label, value, isAMGMode, delay }) => {
  const Icon = statIcons[id] || Activity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-[30px] border p-6 md:p-8 backdrop-blur-xl shadow-2xl ${
        isAMGMode
          ? 'bg-black/65 border-white/10'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            {label}
          </p>
          <p className="mt-4 text-4xl md:text-5xl font-bold text-white">
            {value.toLocaleString()}
          </p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
            isAMGMode
              ? 'border-red-500/25 bg-red-500/10 text-red-300'
              : 'border-blue-400/20 bg-blue-500/10 text-blue-300'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
};

const StatsPage = ({ isAMGMode }) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [usingLocalFallback, setUsingLocalFallback] = useState(false);

  const loadStats = async () => {
    setIsLoading(true);
    setError('');

    try {
      await trackVisitor();
      const nextStats = await fetchVisitorStats();
      setStats(nextStats);
      setUsingLocalFallback(
        Object.values(nextStats).some((stat) => stat.source === 'local')
      );
      setLastUpdated(
        new Date().toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })
      );
    } catch (loadError) {
      setError('Unable to load visitor counts right now.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const orderedStats = stats
    ? [stats.today, stats.week, stats.month, stats.allTime].filter(Boolean)
    : [];

  return (
    <main className="min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              adamrmoffat.com
            </p>
            <h1 className="mt-4 text-5xl md:text-7xl font-bold tracking-tight text-white">
              Visitor Stats
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Estimated visitors by browser for today, this week, this month,
              and all time.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Updated {lastUpdated}
              </span>
            )}
            <button
              onClick={loadStats}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                isAMGMode
                  ? 'border-red-400 bg-red-500 text-white'
                  : 'border-white/10 bg-white/5 text-zinc-200 hover:border-white/20'
              }`}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-[30px] border border-white/10 bg-white/5"
              />
            ))}

          {!isLoading &&
            !error &&
            orderedStats.map((stat, index) => (
              <StatsCard
                key={stat.id}
                id={stat.id}
                label={stat.label}
                value={stat.value}
                isAMGMode={isAMGMode}
                delay={index * 0.08}
              />
            ))}
        </div>

        {!isLoading && error && (
          <div className="mt-10 rounded-[30px] border border-red-500/20 bg-red-500/10 p-6 text-red-100">
            {error}
          </div>
        )}

        <div
          className={`mt-12 rounded-[28px] border p-6 md:p-8 backdrop-blur-md ${
            isAMGMode
              ? 'border-white/10 bg-black/55'
              : 'border-white/10 bg-white/5'
          }`}
        >
          <p className="text-sm leading-7 text-zinc-300">
            {usingLocalFallback
              ? 'Remote stats are unavailable right now, so this page is showing local browser counts for testing.'
              : 'These numbers are approximate and count one visitor per browser per time period.'}
          </p>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Returning visitors on the same browser will not keep incrementing
            the same bucket.
          </p>
        </div>
      </div>
    </main>
  );
};

export default StatsPage;
