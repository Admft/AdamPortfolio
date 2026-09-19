#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const LOGIN = process.env.GITHUB_LOGIN || 'admft';
const OUT_FILE = path.join(__dirname, '..', 'public', 'github-contributions.json');
const SOURCE = `https://github-contributions-api.jogruber.de/v4/${LOGIN}?y=last`;

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch contributions (${response.status})`);
  }

  return response.json();
};

const main = async () => {
  const payload = await fetchJson(SOURCE);
  const contributions = Array.isArray(payload.contributions) ? payload.contributions : [];
  const total =
    payload.total?.lastYear ??
    contributions.reduce((sum, day) => sum + (day.count || 0), 0);

  const next = {
    login: LOGIN,
    total,
    updatedAt: new Date().toISOString(),
    source: 'github-contributions-api.jogruber.de',
    contributions: contributions.map((day) => ({
      date: day.date,
      count: day.count || 0,
      level: day.level || 0,
    })),
  };

  fs.writeFileSync(OUT_FILE, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`Wrote ${contributions.length} days (${total} contributions) to ${OUT_FILE}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
