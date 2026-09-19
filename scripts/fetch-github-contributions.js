#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const login = process.env.GITHUB_LOGIN || "Admft";
const to = new Date();
const from = new Date(to);
from.setUTCDate(from.getUTCDate() - 364);
from.setUTCHours(0, 0, 0, 0);
const query = `query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    login
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      restrictedContributionsCount
      contributionCalendar { weeks { contributionDays { date contributionCount contributionLevel } } }
    }
  }
}`;
const variables = { login, from: from.toISOString(), to: to.toISOString() };
async function main() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  let payload;
  if (token) {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok)
      throw new Error(`GitHub request failed: ${response.status}`);
    payload = await response.json();
  } else {
    // Local authenticated gh session; no credentials are written to disk or logged.
    payload = JSON.parse(
      execFileSync("gh", ["api", "graphql", "--input", "-"], {
        input: JSON.stringify({ query, variables }),
        encoding: "utf8",
        timeout: 30000,
      }),
    );
  }
  if (payload.errors?.length)
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  const user = payload.data?.user;
  const collection = user?.contributionsCollection;
  if (!collection || !Number.isInteger(collection.totalCommitContributions))
    throw new Error(
      "Incomplete GitHub activity response; keeping the previous snapshot.",
    );
  const levels = [
    "NONE",
    "FIRST_QUARTILE",
    "SECOND_QUARTILE",
    "THIRD_QUARTILE",
    "FOURTH_QUARTILE",
  ];
  const periodStart = variables.from.slice(0, 10),
    periodEnd = variables.to.slice(0, 10);
  const contributions = collection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.date >= periodStart && day.date <= periodEnd)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: Math.max(0, levels.indexOf(day.contributionLevel)),
    }));
  if (
    contributions.length < 364 ||
    contributions.some((day) => !Number.isInteger(day.count) || day.count < 0)
  )
    throw new Error(
      "Invalid contribution calendar; keeping the previous snapshot.",
    );
  const next = {
    login: user.login,
    total: contributions.reduce((sum, day) => sum + day.count, 0),
    commits: collection.totalCommitContributions,
    restrictedContributions: collection.restrictedContributionsCount,
    periodStart,
    periodEnd,
    updatedAt: to.toISOString(),
    source: "GitHub GraphQL contributionsCollection",
    contributions,
  };
  const file = path.join(
    __dirname,
    "..",
    "public",
    "github-contributions.json",
  );
  fs.writeFileSync(`${file}.tmp`, `${JSON.stringify(next, null, 2)}\n`);
  fs.renameSync(`${file}.tmp`, file);
  console.log(
    `Updated ${next.login}: ${next.commits} API-visible commits; ${next.total} contributions (${periodStart} to ${periodEnd}).`,
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
