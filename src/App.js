import React, { Suspense, useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Trivia from './components/Trivia';
import Contact from './components/Contact';
import SystemStatus from './components/SystemStatus';
import StatsPage from './components/StatsPage';
import { trackVisitor } from './lib/visitorStats';

const CarCanvas = React.lazy(() => import('./components/CarCanvas'));

function App() {
  const [isAMGMode, setIsAMGMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPowerDesktop, setIsLowPowerDesktop] = useState(false);
  const [mountCanvas, setMountCanvas] = useState(false);
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/\/+$/, '') || '/'
      : '/';
  const isStatsPage = pathname === '/stats';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const evaluateDevice = (isMobileViewport) => {
      setIsMobile(isMobileViewport);
      const cpuThreads = navigator.hardwareConcurrency || 8;
      const memoryGB = navigator.deviceMemory || 8;
      setIsLowPowerDesktop(!isMobileViewport && (cpuThreads <= 4 || memoryGB <= 4));
    };

    evaluateDevice(mediaQuery.matches);

    const handleViewportChange = (event) => evaluateDevice(event.matches);
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    trackVisitor();
  }, []);

  useEffect(() => {
    if (!isAMGMode || isStatsPage) {
      setMountCanvas(false);
      return undefined;
    }

    const prefetchModel = () => {
      import('./components/C63');
    };

    prefetchModel();

    const mount = () => setMountCanvas(true);

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(mount, { timeout: 1200 });
      return () => {
        window.cancelIdleCallback(idleId);
        setMountCanvas(false);
      };
    }

    const timeoutId = window.setTimeout(mount, 200);
    return () => {
      window.clearTimeout(timeoutId);
      setMountCanvas(false);
    };
  }, [isAMGMode, isStatsPage]);

  return (

    <div
      id="top"
      className={`relative min-h-screen text-white selection:bg-red-500/20 transition-colors duration-500 ${isAMGMode ? 'amg-mode' : 'base-mode'
        }`}
    >
      {isAMGMode && !isStatsPage && mountCanvas && (
        <Suspense fallback={null}>
          <CarCanvas isMobile={isMobile} isLowPowerDesktop={isLowPowerDesktop} />
        </Suspense>
      )}
      <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-20" />

      <div className="relative z-10">
        <Navbar
          isAMGMode={isAMGMode}
          setIsAMGMode={setIsAMGMode}
          isStatsPage={isStatsPage}
        />
        {isStatsPage ? (
          <StatsPage isAMGMode={isAMGMode} />
        ) : (
          <>
            <main>
              <About isAMGMode={isAMGMode} />
              <Projects isAMGMode={isAMGMode} />
              <Trivia isAMGMode={isAMGMode} />
              <Contact isAMGMode={isAMGMode} />
            </main>
            <SystemStatus isAMGMode={isAMGMode} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
