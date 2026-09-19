import React, { useEffect, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

const formatNumber = (number) => number.toLocaleString("en-US");
const formatDate = (date) =>
  new Date(`${date.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export default function GitHubActivity({ compact = false }) {
  const [activity, setActivity] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    const loadSnapshot = async (url) => {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: "no-cache",
      });
      if (!response.ok) throw new Error("Unavailable");
      const data = await response.json();
      if (![data.periodStart, data.periodEnd, data.updatedAt].every((value) => typeof value === "string" && !Number.isNaN(Date.parse(value)))) throw new Error("Outdated snapshot");
      return data;
    };
    // Published GitHub snapshots update independently of Vercel deployments.
    // A timeout and bundled fallback keep the portfolio usable if GitHub is down.
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    loadSnapshot(
      "https://raw.githubusercontent.com/Admft/AdamPortfolio/master/public/github-contributions.json?v=2",
    )
      .catch(() => {
        window.clearTimeout(timeout);
        return fetch("/github-contributions.json").then((response) => {
          if (!response.ok) throw new Error("Unavailable");
          return response.json();
        });
      })
      .then((data) => {
        window.clearTimeout(timeout);
        if (
          !Number.isInteger(data.total) ||
          !Array.isArray(data.contributions) ||
          !data.contributions.length
        )
          throw new Error("Invalid snapshot");
        if (!cancelled) setActivity(data);
      })
      .catch((error) => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  if (!activity)
    return (
      <section
        className="github-activity github-loading"
        aria-label="Annual GitHub activity"
      >
        <p>
          {failed
            ? "GitHub activity is temporarily unavailable."
            : "Loading annual GitHub activity…"}
        </p>
        <a
          className="text-link"
          href="https://github.com/Admft"
          target="_blank"
          rel="noreferrer"
        >
          View GitHub profile <ArrowUpRight size={15} />
        </a>
      </section>
    );
  const startPadding = new Date(
    `${activity.contributions[0].date}T12:00:00Z`,
  ).getUTCDay();
  const days = [...Array(startPadding).fill(null), ...activity.contributions];
  const weeks = Math.ceil(days.length / 7);
  const months = Array.from({ length: weeks }, (_, index) => {
    const first = days
      .slice(index * 7, index * 7 + 7)
      .find((day) => day && day.date.endsWith("-01"));
    return first
      ? new Date(`${first.date}T12:00:00Z`).toLocaleDateString("en-US", {
          month: "short",
          timeZone: "UTC",
        })
      : "";
  });

  return (
    <section
      className={`github-activity ${compact ? "github-compact" : ""}`}
      aria-label="Annual GitHub activity"
    >
      <div className="github-heading">
        <div>
          <span className="eyebrow">CONSISTENTLY BUILDING</span>
          <h3>A year of turning ideas into code.</h3>
        </div>
        <a
          className="text-link"
          href={`https://github.com/${activity.login}`}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} /> @{activity.login} <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="github-numbers">
        <div>
          <strong>{formatNumber(activity.total)}</strong>
          <span>contributions in the last year</span>
        </div>
        <p>
          {formatDate(activity.periodStart)} — {formatDate(activity.periodEnd)}
          <br />
          Last 12 months · Updated {formatDate(activity.updatedAt)}
        </p>
      </div>
      {!compact && (
        <div
          className="github-calendar-scroll"
          tabIndex={0}
          aria-label="Scrollable annual contribution calendar"
        >
          <div
            className="github-months"
            style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}
            aria-hidden="true"
          >
            {months.map((month, index) => (
              <span key={index}>{month}</span>
            ))}
          </div>
          <div
            className="github-calendar"
            role="img"
            aria-label={`${formatNumber(activity.total)} GitHub contributions over the last 12 months. Calendar includes commits and other contribution types.`}
            style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}
          >
            {days.map((day, index) => (
              <span
                key={day?.date || `empty-${index}`}
                className={`contribution-cell ${day ? `level-${day.level}` : "empty"}`}
                title={
                  day
                    ? `${day.count} contributions on ${formatDate(day.date)}`
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      )}
      <div className="github-footnote">
        <p>Public and private contributions shared on GitHub.</p>
        {!compact && (
          <div className="contribution-legend" aria-hidden="true">
            Less{" "}
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={`contribution-cell level-${level}`}
              />
            ))}{" "}
            More
          </div>
        )}
      </div>
    </section>
  );
}
