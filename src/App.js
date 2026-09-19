import React, { Suspense, useEffect, useState } from "react";
import { trackVisitor } from "./lib/visitorStats";
import Portfolio from "./portfolio/Portfolio";
import "./portfolio/portfolio.css";
const CarExperience = React.lazy(() => import("./experience/CarExperience"));
const StatsPage = React.lazy(() => import("./components/StatsPage"));
export default function App() {
  const [carMode, setCarMode] = useState(false);
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "test" &&
      !["localhost", "127.0.0.1"].includes(window.location.hostname)
    )
      trackVisitor().catch(() => {});
  }, []);
  const stats = window.location.pathname.replace(/\/+$/, "") === "/stats";
  function changeMode(next) {
    setCarMode(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  if (stats)
    return (
      <Suspense fallback={<p>Loading statistics…</p>}>
        <div className="legacy-stats">
          <a className="text-link" href="/">
            ← Portfolio
          </a>
          <StatsPage />
        </div>
      </Suspense>
    );
  return carMode ? (
    <Suspense
      fallback={
        <div className="loading-experience">
          <div>
            INITIALIZING EXPERIENCE…
            <br />
            <button className="mode-button" onClick={() => changeMode(false)}>
              Return to portfolio
            </button>
          </div>
        </div>
      }
    >
      <CarExperience exit={() => changeMode(false)} />
    </Suspense>
  ) : (
    <Portfolio launch={() => changeMode(true)} />
  );
}
