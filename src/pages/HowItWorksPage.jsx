import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, Pause, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { Page, PageHero, useScrollReveal } from '../components/shared';
import { WORKFLOW_STEPS, CYCLE_STAGES } from '../data/config';

// ============================================================
// DETAILED WORKFLOW TIMELINE
// ============================================================
const WorkflowTimeline = () => {
  const DETAIL_STAGES = [
    { id: 1, label: 'Helmet Placement', desc: 'Place your motorcycle or scooter helmet on the OdorLock device. The device is designed to support most standard helmet sizes and types.' },
    { id: 2, label: 'Sensor Check', desc: 'OdorLock\'s built-in sensors perform an initial check to verify the helmet is correctly positioned and ready for the care cycle.' },
    { id: 3, label: 'Moisture Detection', desc: 'The device detects moisture levels inside the helmet. This helps determine the appropriate intensity and duration for the drying stage.' },
    { id: 4, label: 'Airflow Activation', desc: 'Directed airflow is activated, targeting the interior of the helmet. The airflow reaches padding, lining, and inner surfaces.' },
    { id: 5, label: 'Drying Stage', desc: 'Gentle, focused airflow runs through the helmet to help reduce trapped sweat and humidity. Duration adjusts based on detected moisture levels.' },
    { id: 6, label: 'Odor Control Stage', desc: 'After drying, OdorLock activates the odor-control stage, designed to help reduce unpleasant smells and freshen the helmet interior.' },
    { id: 7, label: 'Hygiene Support Stage', desc: 'An additional hygiene support stage helps maintain the overall condition of the helmet\'s interior surfaces.' },
    { id: 8, label: 'Automatic Shutoff', desc: 'Once all stages are complete, OdorLock stops automatically. No manual intervention needed — your helmet is ready for the next ride.' },
  ];

  const [ref, visible] = useScrollReveal();

  return (
    <section className="section" style={{ background: 'var(--off-white)' }} ref={ref}>
      <div className="container">
        <div className="section-header centered">
          <h2 className="section-title">The Full OdorLock Process</h2>
          <p className="section-subtitle">A detailed look at every stage of the care cycle.</p>
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="track-timeline">
            {DETAIL_STAGES.map((stage, i) => (
              <div key={stage.id} className={`track-step ${visible ? 'done' : 'pending'}`}
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-12px)', transition: `all 0.5s ease ${i * 0.08}s` }}>
                <div className="track-dot" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ background: 'var(--green)', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{stage.id}</span>
                    <div className="track-step-label">{stage.label}</div>
                  </div>
                  <p className="body-sm text-muted" style={{ paddingLeft: 34 }}>{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SIMULATION
// ============================================================
const Simulation = () => {
  const [status, setStatus] = useState('idle'); // idle | running | paused | complete | cancelled
  const [stageIdx, setStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = { current: null };

  const totalDuration = CYCLE_STAGES.reduce((s, x) => s + x.duration, 0);

  const start = () => {
    setStatus('running');
    setStageIdx(0);
    setProgress(0);
    setElapsed(0);
  };

  const cancel = () => {
    setStatus('cancelled');
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setStatus('idle');
    setStageIdx(0);
    setProgress(0);
    setElapsed(0);
  };

  useEffect(() => {
    if (status !== 'running') { clearInterval(intervalRef.current); return; }

    intervalRef.current = setInterval(() => {
      setElapsed(prev => {
        const next = prev + 0.5;
        const pct = Math.min((next / totalDuration) * 100, 100);
        setProgress(pct);

        // Figure out which stage we're in
        let acc = 0;
        for (let i = 0; i < CYCLE_STAGES.length; i++) {
          acc += CYCLE_STAGES[i].duration;
          if (next <= acc) { setStageIdx(i); break; }
        }

        if (next >= totalDuration) {
          setStatus('complete');
          setProgress(100);
          setStageIdx(CYCLE_STAGES.length - 1);
          clearInterval(intervalRef.current);
        }

        return next;
      });
    }, 500);

    return () => clearInterval(intervalRef.current);
  }, [status]);

  const currentStage = CYCLE_STAGES[stageIdx];
  const mins = Math.floor(elapsed / 60);
  const secs = Math.floor(elapsed % 60);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header centered">
          <h2 className="section-title">Try the Interactive Demo</h2>
          <p className="section-subtitle">Experience the OdorLock care cycle in simulation mode.</p>
        </div>

        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="simulation-card">
            {/* Ring display */}
            <div className="sim-display">
              <svg viewBox="0 0 180 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="90" cy="90" r="84" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle cx="90" cy="90" r="84" fill="none" stroke="var(--green)" strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 84}`}
                  strokeDashoffset={`${2 * Math.PI * 84 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              {status === 'running' && <div className="sim-ring" />}
              <div className="sim-percent">{Math.round(progress)}%</div>
              <div className="sim-label">
                {status === 'idle' ? 'Ready' : status === 'complete' ? 'Done' : status === 'cancelled' ? 'Cancelled' : 'Running'}
              </div>
            </div>

            {/* Stage label */}
            <div className="sim-stage-label">
              {status === 'idle' && 'Press Start to begin the care cycle'}
              {status === 'running' && currentStage?.label}
              {status === 'paused' && `Paused — ${currentStage?.label}`}
              {status === 'complete' && '✓ Care cycle complete!'}
              {status === 'cancelled' && 'Cycle cancelled'}
            </div>

            {/* Timer */}
            <div className="sim-time">
              {status !== 'idle' && `Elapsed: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
              {status === 'idle' && `Total cycle: ~${totalDuration}s`}
            </div>

            {/* Stage indicators */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
              {CYCLE_STAGES.map((s, i) => (
                <div key={s.id} title={s.label} style={{
                  height: 4, borderRadius: 2,
                  flex: '1 0 24px',
                  background: i < stageIdx ? 'var(--green)' : i === stageIdx && status === 'running' ? 'var(--green-light)' : 'rgba(255,255,255,0.15)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>

            {/* Controls */}
            <div className="sim-controls">
              {status === 'idle' && (
                <button className="btn btn-primary" onClick={start}><Play size={16} /> Start Care Cycle</button>
              )}
              {status === 'running' && (
                <>
                  <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => setStatus('paused')}>
                    <Pause size={16} /> Pause
                  </button>
                  <button className="btn btn-ghost" style={{ color: '#94A3B8' }} onClick={cancel}>Cancel</button>
                </>
              )}
              {status === 'paused' && (
                <>
                  <button className="btn btn-primary" onClick={() => setStatus('running')}><Play size={16} /> Resume</button>
                  <button className="btn btn-ghost" style={{ color: '#94A3B8' }} onClick={cancel}>Cancel</button>
                </>
              )}
              {(status === 'complete' || status === 'cancelled') && (
                <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={reset}>
                  <RotateCcw size={16} /> Start New Cycle
                </button>
              )}
            </div>

            <div className="demo-notice">
              🖥️ This is a software simulation only. It does not control a physical OdorLock device.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// HOW IT WORKS PAGE
// ============================================================
const HowItWorksPage = () => (
  <Page>
    <PageHero
      badge="Simple Process"
      title="How OdorLock Works"
      subtitle="A complete guide to the OdorLock automatic helmet care cycle."
    />
    <WorkflowTimeline />
    <Simulation />
    <section className="section" style={{ background: 'var(--off-white)', padding: '64px 0' }}>
      <div className="container text-center">
        <h2 className="section-title">Ready to try OdorLock?</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 32px' }}>
          Experience the difference. Get your OdorLock today.
        </p>
        <Link to="/product" className="btn btn-primary btn-lg">
          Get OdorLock <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  </Page>
);

export default HowItWorksPage;
