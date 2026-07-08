import React, { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'grid', label: 'GRID' },
  { id: 'stats', label: 'STATS' },
  { id: 'driver', label: 'DRIVER' },
  { id: 'pitwall', label: 'PIT WALL' },
  { id: 'garage', label: 'GARAGE' },
  { id: 'research', label: 'R&D' },
  { id: 'results', label: 'RESULTS' },
  { id: 'quali', label: 'QUALI' },
  { id: 'radio', label: 'RADIO' },
];

// A wiggly vertical racing line — start/finish at the top, flag at the bottom.
const TRACK_PATH =
  'M20 6 C 33 40, 7 70, 20 108 S 33 175, 20 215 S 7 285, 20 325 S 33 395, 20 435 S 7 500, 20 540 L 20 574';

const TrackMap = () => {
  const basePathRef = useRef(null);
  const racedPathRef = useRef(null);
  const carRef = useRef(null);
  const [marks, setMarks] = useState([]);

  // Map each section's document position onto the path.
  useEffect(() => {
    const path = basePathRef.current;
    if (!path) return undefined;

    const total = path.getTotalLength();

    const measure = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const next = SECTIONS.map((section) => {
        const el = document.getElementById(section.id);
        if (!el) return null;
        const fraction = Math.min(1, Math.max(0, el.offsetTop / docHeight));
        const point = path.getPointAtLength(fraction * total);
        return { ...section, x: point.x, y: point.y };
      }).filter(Boolean);

      setMarks(next);
    };

    measure();
    // re-measure once images/model settle layout
    const settleId = window.setTimeout(measure, 1600);
    window.addEventListener('resize', measure);

    return () => {
      window.clearTimeout(settleId);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Drive the car marker + raced-line stroke from scroll.
  useEffect(() => {
    const path = basePathRef.current;
    const raced = racedPathRef.current;
    if (!path || !raced) return undefined;

    const total = path.getTotalLength();
    raced.style.strokeDasharray = `${total}`;

    let frameId;

    const step = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;

      const point = path.getPointAtLength(progress * total);
      if (carRef.current) {
        carRef.current.setAttribute('transform', `translate(${point.x}, ${point.y})`);
      }
      raced.style.strokeDashoffset = `${total * (1 - progress)}`;

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <svg
        width="120"
        height="580"
        viewBox="0 0 120 580"
        fill="none"
        className="overflow-visible"
      >
        {/* start/finish chequers */}
        <g opacity="0.8">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={12 + i * 4}
              y={i % 2 === 0 ? 0 : 4}
              width="4"
              height="4"
              fill="#d8d8d8"
            />
          ))}
        </g>

        {/* base track */}
        <path
          ref={basePathRef}
          d={TRACK_PATH}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* raced line — fills in red behind the car */}
        <path
          ref={racedPathRef}
          d={TRACK_PATH}
          stroke="#e10600"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px rgba(225,6,0,0.55))' }}
        />

        {/* sector markers */}
        {marks.map((mark) => (
          <g
            key={mark.id}
            transform={`translate(${mark.x}, ${mark.y})`}
            onClick={() => jumpTo(mark.id)}
            className="cursor-pointer"
          >
            <circle r="8" fill="transparent" />
            <circle r="3" fill="#0a0a0c" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <text
              x="14"
              y="3"
              fill="rgba(255,255,255,0.45)"
              fontSize="8"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="1.5"
            >
              {mark.label}
            </text>
          </g>
        ))}

        {/* the car */}
        <g ref={carRef}>
          <circle r="7" fill="rgba(225,6,0,0.25)" />
          <circle r="4.5" fill="#e10600" stroke="#fff" strokeWidth="1.2" />
          <text
            x="0"
            y="2.4"
            textAnchor="middle"
            fill="#fff"
            fontSize="5.5"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
          >
            63
          </text>
        </g>
      </svg>
    </div>
  );
};

export default TrackMap;
