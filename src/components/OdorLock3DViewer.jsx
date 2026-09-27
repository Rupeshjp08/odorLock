import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  RotateCw,
  Layers,
  Eye,
  Sparkles,
  Download,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Info,
  ZoomIn,
  ZoomOut,
  Compass,
  Box,
  Check,
  Activity,
  Cpu,
  ShieldCheck,
  Wind,
  Zap,
  Sliders,
  ChevronRight,
  Crosshair
} from 'lucide-react';

// ============================================================
// 12-LAYER PRECISION ENGINEERING COMPONENTS
// ============================================================
const EXPLODED_PARTS = [
  {
    id: 'chamber',
    num: '01',
    name: 'Transparent Chamber',
    category: 'Enclosure',
    tag: 'Optical Polycarbonate',
    desc: 'Impact-resistant UV-filtering dome with 92% optical clarity. Retains active odor-neutralizing micro-climate while isolating external contaminants.',
    spec: '2.8mm injection-molded Makrolon® PC • Anti-scratch oleophobic coating',
    x: 48,
    y: 15,
    side: 'right',
  },
  {
    id: 'helmet_support',
    num: '02',
    name: 'Helmet Support Deck',
    category: 'Aero Dynamics',
    tag: 'Ventilated Dock',
    desc: 'Ergonomic cradle with multi-point silicone pads engineered to seat any full-face, modular, or open-face helmet securely without pressure marks.',
    spec: 'Direct vortex distribution channels • 35kg load rated silicone dampers',
    x: 48,
    y: 26,
    side: 'right',
  },
  {
    id: 'airflow_system',
    num: '03',
    name: 'Airflow Directional System',
    category: 'Pneumatics',
    tag: '360° Flow Ring',
    desc: 'Optimized aerodynamic diffuser ring that guides high-velocity dry air through the helmet crown, brow vents, and cheek pad cavities.',
    spec: 'Aerodynamic twin-scroll nozzle • Low-turbulence laminar flow profile',
    x: 46,
    y: 35,
    side: 'left',
  },
  {
    id: 'moisture_sensor',
    num: '04',
    name: 'Moisture & RH Sensor',
    category: 'Smart Sensing',
    tag: 'Dynamic Feedback',
    desc: 'Capacitive relative humidity sensor measuring ambient moisture inside helmet padding, auto-terminating the cycle when 100% dry.',
    spec: '±1.5% RH accuracy • 100ms sample interval • Auto-shutoff trigger',
    x: 49,
    y: 41,
    side: 'right',
  },
  {
    id: 'odor_cartridge',
    num: '05',
    name: 'Odor Control Module',
    category: 'Filtration',
    tag: 'Removable Cartridge',
    desc: 'Dual-phase cartridge combining medical-grade activated carbon honeycomb and botanical enzyme vapor beads to eliminate 99.8% of bacterial odors.',
    spec: 'High-porosity coconut-shell carbon • 90-day typical service lifespan',
    x: 49,
    y: 46,
    side: 'right',
  },
  {
    id: 'fan_assembly',
    num: '06',
    name: 'Centrifugal Fan Assembly',
    category: 'Propulsion',
    tag: 'Ultra-Quiet Blower',
    desc: 'High-static-pressure centrifugal blower motor designed to push 42 CFM through dense foam padding with whisper-quiet acoustic dampening.',
    spec: 'Brushless DC motor • Dual ball bearings • <28 dB(A) acoustic envelope',
    x: 48,
    y: 54,
    side: 'left',
  },
  {
    id: 'control_board',
    num: '07',
    name: 'Main Control Board (PCB)',
    category: 'Electronics',
    tag: '32-Bit Smart MCU',
    desc: 'Microcontroller architecture managing temperature safety profiles, fan PWM speed curves, moisture sensor readouts, and halo LED states.',
    spec: 'ARM Cortex MCU • Thermal protection cutoff at 45°C • ESD protected',
    x: 48,
    y: 62,
    side: 'right',
  },
  {
    id: 'power_module',
    num: '08',
    name: 'Power Regulation Module',
    category: 'Power Delivery',
    tag: 'PD 3.0 Compatible',
    desc: 'Internal step-down DC/DC power supply delivering stable voltage to blower motor, sensors, and lighting with over-voltage and surge protection.',
    spec: '15W peak draw • Over-current, short-circuit, and reverse-polarity protection',
    x: 47,
    y: 69,
    side: 'left',
  },
  {
    id: 'main_housing',
    num: '09',
    name: 'Main Lower Housing',
    category: 'Chassis',
    tag: 'Matte Polymer',
    desc: 'Structural exterior casing with satin micro-texture finish, integrated front capacitive power switch, and precision-fitted internal ribs.',
    spec: 'Flame-retardant ABS-PC blend • Scratch-resistant UV-cured topcoat',
    x: 48,
    y: 81,
    side: 'right',
  },
  {
    id: 'base_chassis',
    num: '10',
    name: 'Base Chassis Plate',
    category: 'Structure',
    tag: 'Acoustic Dampening',
    desc: 'Weighted structural bottom plate providing low center-of-gravity stability and internal resonance dampening chambers.',
    spec: 'Weighted alloy insert • Internal acoustic baffles',
    x: 43,
    y: 76,
    side: 'left',
  },
  {
    id: 'usbc_input',
    num: '11',
    name: 'USB-C Power Input',
    category: 'Connectivity',
    tag: 'Universal 5V/9V',
    desc: 'Universal USB Type-C power input allowing OdorLock to run from wall adapters, power banks, motorcycle 12V adapters, or garage workstations.',
    spec: '10,000 cycle gold-plated contacts • PD / QC quick-charge compatible',
    x: 58,
    y: 72,
    side: 'right',
  },
  {
    id: 'rubber_feet',
    num: '12',
    name: 'Anti-Vibration Rubber Feet',
    category: 'Hardware',
    tag: 'Silicone Isolation',
    desc: 'Four high-traction silicone elastomer feet that decouple motor vibrations from desk surfaces while preventing slipping on smooth surfaces.',
    spec: 'Shore 50A durometer silicone • Non-marking acoustic isolation',
    x: 55,
    y: 90,
    side: 'right',
  },
];

// 360° Studio camera angles
const STUDIO_ANGLES = [
  { id: 'hero', label: '3/4 Hero', desc: 'Signature perspective with LS2 helmet & green halo', deg: 45 },
  { id: 'front', label: 'Front', desc: 'Orthographic front with logo & illuminated switch', deg: 0 },
  { id: 'side', label: 'Side', desc: 'Aerodynamic rake & lateral intake vents', deg: 90 },
  { id: 'rear', label: 'Rear', desc: 'Vertical slotted exhaust grille & USB-C port', deg: 180 },
  { id: 'top', label: 'Top', desc: 'Overhead view through transparent chamber', deg: -1 },
  { id: 'bottom', label: 'Bottom', desc: 'Underside chassis & anti-vibration feet', deg: -2 },
];

export const OdorLock3DViewer = ({
  initialVariant = 'white',
  height = '620px',
  showDownload = true,
  className = '',
}) => {
  // Navigation & View Modes
  // 'studio' (360° Turntable) | 'exploded' (12-layer) | 'cutaway' (X-Ray Wipe) | 'blueprint' (Master Sheet) | 'webgl' (Three.js Free-Orbit)
  const [activeTab, setActiveTab] = useState('studio');
  const [activeAngle, setActiveAngle] = useState('hero');
  const [colorVariant, setColorVariant] = useState(initialVariant);
  const [ledMode, setLedMode] = useState('active'); // 'active' | 'pulse' | 'idle' | 'off'

  // Interactive 3D Physics & Parallax State
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [lightSheen, setLightSheen] = useState({ x: 50, y: 40 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Turntable Drag Interaction State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(45);

  // Exploded View State
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [explodeSlider, setExplodeSlider] = useState(100); // 0 = assembled, 100 = full exploded

  // X-Ray Cutaway State
  const [cutawayWipe, setCutawayWipe] = useState(50); // 0 to 100 split screen wipe
  const [isWipeDragging, setIsWipeDragging] = useState(false);

  // WebGL 3D State
  const webglMountRef = useRef(null);
  const webglRendererRef = useRef(null);
  const webglSceneRef = useRef(null);
  const webglCameraRef = useRef(null);
  const webglControlsRef = useRef(null);
  const webglAnimRef = useRef(null);
  const [webglLoaded, setWebglLoaded] = useState(false);

  const containerRef = useRef(null);
  const autoRotateIntervalRef = useRef(null);

  // Sync prop changes
  useEffect(() => {
    setColorVariant(initialVariant);
  }, [initialVariant]);

  // -------------------------------------------------------------
  // 3D Mouse Parallax & Dynamic Light Sheen Engine
  // -------------------------------------------------------------
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || isDragging || isWipeDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates (-1 to +1)
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Apply smooth 3D tilt
    setMouseTilt({
      x: -normY * 10, // Max 10 deg vertical tilt
      y: normX * 14,  // Max 14 deg horizontal tilt
    });

    // Dynamic specular sheen reflection position
    setLightSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, [isDragging, isWipeDragging]);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) {
      setMouseTilt({ x: 0, y: 0 });
    }
  }, [isDragging]);

  // -------------------------------------------------------------
  // Drag-to-Spin 360° Turntable Interaction
  // -------------------------------------------------------------
  const handleMouseDown = (e) => {
    if (activeTab !== 'studio') return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setIsAutoRotate(false);
  };

  const handleTouchStart = (e) => {
    if (activeTab !== 'studio' || e.touches.length === 0) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setIsAutoRotate(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX;
      setDragStartX(e.clientX);
      setRotationDeg((prev) => {
        let next = (prev + deltaX * 0.8) % 360;
        if (next < 0) next += 360;
        return next;
      });
    };

    const handleGlobalTouchMove = (e) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - dragStartX;
      setDragStartX(e.touches[0].clientX);
      setRotationDeg((prev) => {
        let next = (prev + deltaX * 0.8) % 360;
        if (next < 0) next += 360;
        return next;
      });
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
      if (isWipeDragging) {
        setIsWipeDragging(false);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, isWipeDragging, dragStartX]);

  // Map continuous rotationDeg to angle preset when dragging
  useEffect(() => {
    if (!isDragging) return;
    // Map 0-360 to angle views
    if (rotationDeg >= 315 || rotationDeg < 45) {
      setActiveAngle('front');
    } else if (rotationDeg >= 45 && rotationDeg < 135) {
      setActiveAngle('hero');
    } else if (rotationDeg >= 135 && rotationDeg < 225) {
      setActiveAngle('side');
    } else {
      setActiveAngle('rear');
    }
  }, [rotationDeg, isDragging]);

  // Auto-Rotate in 360° Studio Mode
  useEffect(() => {
    if (isAutoRotate && activeTab === 'studio') {
      autoRotateIntervalRef.current = setInterval(() => {
        setRotationDeg((prev) => (prev + 0.6) % 360);
      }, 40);
    } else {
      clearInterval(autoRotateIntervalRef.current);
    }
    return () => clearInterval(autoRotateIntervalRef.current);
  }, [isAutoRotate, activeTab]);

  // When clicking an angle button, snap smoothly
  const handleSelectAngle = (angleId) => {
    setActiveAngle(angleId);
    setIsAutoRotate(false);
    const target = STUDIO_ANGLES.find((a) => a.id === angleId);
    if (target && target.deg >= 0) {
      setRotationDeg(target.deg);
    }
  };

  // -------------------------------------------------------------
  // X-Ray Split-Wipe Drag Handler
  // -------------------------------------------------------------
  const handleWipeMouseMove = (e) => {
    if (!isWipeDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setCutawayWipe(percent);
  };

  // -------------------------------------------------------------
  // WebGL Free-Orbit Mode Setup (Three.js)
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== 'webgl') {
      if (webglAnimRef.current) cancelAnimationFrame(webglAnimRef.current);
      return;
    }

    const container = webglMountRef.current;
    if (!container) return;

    // Cleanup previous instance if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    webglSceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(1.1, 0.8, 1.4);
    webglCameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    webglRendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 0.7;
    controls.maxDistance = 3.0;
    controls.target.set(0, 0.35, 0);
    webglControlsRef.current = controls;

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffdfa, 2.0);
    keyLight.position.set(3, 5, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.0);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const greenHaloLight = new THREE.PointLight(0x1db954, 3.0, 1.5);
    greenHaloLight.position.set(0, 0.45, 0);
    scene.add(greenHaloLight);

    // Floor shadow receiver
    const shadowGeo = new THREE.PlaneGeometry(3, 3);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.001;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/odorlock.glb',
      (gltf) => {
        scene.add(gltf.scene);
        setWebglLoaded(true);
      },
      undefined,
      (err) => {
        console.error('Error loading GLB:', err);
        setWebglLoaded(true);
      }
    );

    const animate = () => {
      webglAnimRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (webglAnimRef.current) cancelAnimationFrame(webglAnimRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeTab]);

  // Determine current active render image based on view mode and angle
  const getStudioImage = () => {
    if (colorVariant === 'black' && activeAngle === 'front') {
      return '/images/renders/odorlock_front_black.jpg';
    }
    switch (activeAngle) {
      case 'front':
        return '/images/renders/odorlock_front_hd.jpg';
      case 'side':
        return '/images/renders/odorlock_side_hd.jpg';
      case 'rear':
        return '/images/renders/odorlock_rear_hd.jpg';
      case 'top':
        return '/images/renders/odorlock_top_hd.jpg';
      case 'bottom':
        return '/images/renders/odorlock_bottom_hd.jpg';
      case 'hero':
      default:
        return '/images/renders/odorlock_hero_hd.jpg';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`odorlock-master-3d-experience ${className}`}
      onMouseMove={(e) => {
        handleMouseMove(e);
        if (isWipeDragging) handleWipeMouseMove(e);
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        position: isFullscreen ? 'fixed' : 'relative',
        inset: isFullscreen ? 0 : 'auto',
        width: '100%',
        height: isFullscreen ? '100vh' : height,
        zIndex: isFullscreen ? 99999 : 1,
        borderRadius: isFullscreen ? '0px' : 'var(--radius-xl)',
        overflow: 'hidden',
        background: activeTab === 'exploded'
          ? 'radial-gradient(circle at 50% 40%, #1e242d 0%, #12161c 100%)'
          : 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f1f8f4 55%, #e6f4ea 100%)',
        border: isFullscreen ? 'none' : '1px solid var(--border)',
        boxShadow: isFullscreen ? 'none' : '0 24px 60px -12px rgba(15, 23, 42, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        transition: 'background 0.4s ease',
      }}
    >
      {/* ── TOP MASTER NAVIGATION BAR ──────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 18px',
        borderBottom: activeTab === 'exploded' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
        background: activeTab === 'exploded' ? 'rgba(18, 22, 28, 0.85)' : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {/* Left: View Mode Tabs */}
        <div style={{
          display: 'flex',
          gap: 6,
          background: activeTab === 'exploded' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          padding: 4,
          borderRadius: 'var(--radius-full)',
          border: activeTab === 'exploded' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
        }}>
          {[
            { id: 'studio', label: '360° Studio', icon: RotateCw },
            { id: 'exploded', label: '12-Layer Exploded', icon: Layers },
            { id: 'cutaway', label: 'X-Ray Cutaway', icon: Eye },
            { id: 'blueprint', label: 'Engineering Blueprint', icon: Sliders },
            { id: 'webgl', label: 'WebGL Orbit', icon: Box },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'studio') {
                    setActiveAngle('hero');
                    setRotationDeg(45);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 15px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: isActive
                    ? 'var(--green)'
                    : 'transparent',
                  color: isActive
                    ? 'white'
                    : activeTab === 'exploded' ? 'rgba(255,255,255,0.7)' : 'var(--navy)',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 4px 12px rgba(29, 185, 84, 0.35)' : 'none',
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Colorway, LED Ring, Auto-Spin, Fullscreen, Download */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Color Switcher */}
          {activeTab === 'studio' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}>
              <button
                onClick={() => setColorVariant('white')}
                title="Arctic White Finish"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: colorVariant === 'white' ? '2.5px solid var(--green)' : '1.5px solid #CBD5E1',
                  cursor: 'pointer',
                  boxShadow: colorVariant === 'white' ? '0 0 0 2px rgba(29,185,84,0.3)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              />
              <button
                onClick={() => setColorVariant('black')}
                title="Midnight Black Finish"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#1E293B',
                  border: colorVariant === 'black' ? '2.5px solid var(--green)' : '1.5px solid #0F172A',
                  cursor: 'pointer',
                  boxShadow: colorVariant === 'black' ? '0 0 0 2px rgba(29,185,84,0.3)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              />
            </div>
          )}

          {/* LED Ring Control */}
          {activeTab === 'studio' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '4px 6px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(0,0,0,0.08)',
            }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', paddingLeft: 6 }}>
                HALO:
              </span>
              {[
                { id: 'active', label: 'Active', color: '#1db954' },
                { id: 'pulse', label: 'Pulse', color: '#10b981' },
                { id: 'idle', label: 'White', color: '#94a3b8' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setLedMode(m.id)}
                  style={{
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: ledMode === m.id ? 'var(--green-muted)' : 'transparent',
                    color: ledMode === m.id ? 'var(--green-dark)' : 'var(--text-muted)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color }} />
                  {m.label}
                </button>
              ))}
            </div>
          )}

          {/* Auto-Rotate Toggle (Studio mode) */}
          {activeTab === 'studio' && (
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              title={isAutoRotate ? 'Pause Rotation' : 'Auto Rotate 360°'}
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.08)',
                background: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isAutoRotate ? 'var(--green)' : 'var(--text-muted)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              }}
            >
              {isAutoRotate ? <Pause size={15} /> : <Play size={15} />}
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D Presentation'}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: activeTab === 'exploded' ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.08)',
              background: activeTab === 'exploded' ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.9)',
              color: activeTab === 'exploded' ? 'white' : 'var(--navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          {/* Download 3D Model */}
          {showDownload && (
            <a
              href="/models/odorlock.glb"
              download="OdorLock_Production_3D_Model.glb"
              title="Download High-Resolution 3D GLB Model"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                borderRadius: 'var(--radius-full)',
                background: activeTab === 'exploded' ? 'var(--green)' : 'var(--navy)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.75rem',
                textDecoration: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              }}
            >
              <Download size={13} />
              <span>GLB 3D</span>
            </a>
          )}
        </div>
      </div>

      {/* ── MAIN STAGE CONTENT ──────────────────────────────────────── */}
      <div style={{ position: 'relative', flex: 1, width: '100%', overflow: 'hidden' }}>

        {/* ═══════════════════════════════════════════════════════════
            MODE 1: 360° STUDIO TURNTABLE (PHOTOREALISTIC HD)
        ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'studio' && (
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {/* Dynamic Halo Glow Layer */}
            <div
              style={{
                position: 'absolute',
                bottom: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '35%',
                borderRadius: '50%',
                background: ledMode === 'off'
                  ? 'transparent'
                  : ledMode === 'idle'
                  ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(226,232,240,0.4) 40%, transparent 70%)'
                  : 'radial-gradient(ellipse at center, rgba(29, 185, 84, 0.45) 0%, rgba(29, 185, 84, 0.18) 45%, transparent 75%)',
                filter: 'blur(36px)',
                pointerEvents: 'none',
                transition: 'all 0.5s ease',
                animation: ledMode === 'pulse' ? 'haloBreathing 2.4s ease-in-out infinite' : 'none',
              }}
            />

            {/* Realistic Contact Floor Shadow */}
            <div
              style={{
                position: 'absolute',
                bottom: '12%',
                left: '50%',
                transform: `translateX(calc(-50% + ${mouseTilt.y * 1.5}px)) scaleX(${1 + Math.abs(mouseTilt.y) * 0.01})`,
                width: activeAngle === 'side' ? '380px' : '440px',
                height: '42px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.28) 0%, rgba(15, 23, 42, 0.08) 50%, transparent 75%)',
                filter: 'blur(10px)',
                pointerEvents: 'none',
                transition: 'all 0.15s ease-out',
              }}
            />

            {/* 3D Product Interactive Canvas with Spatial Parallax */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: activeAngle === 'side' || activeAngle === 'front' ? '540px' : '620px',
                height: '82%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1200px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `perspective(1200px) rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg) scale3d(${zoomLevel}, ${zoomLevel}, 1)`,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Dynamic Specular Gloss Highlight across Dome */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '5%',
                    borderRadius: '32px',
                    pointerEvents: 'none',
                    zIndex: 4,
                    background: `radial-gradient(circle at ${lightSheen.x}% ${lightSheen.y}%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 35%, transparent 60%)`,
                    mixBlendMode: 'overlay',
                    transition: 'background 0.1s ease',
                  }}
                />

                {/* Primary Photorealistic OdorLock Render */}
                <img
                  key={getStudioImage()}
                  src={getStudioImage()}
                  alt={`OdorLock 3D ${activeAngle} View`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    filter: colorVariant === 'black' && activeAngle !== 'front'
                      ? 'contrast(1.08) brightness(0.92)'
                      : 'none',
                    transition: 'opacity 0.25s ease',
                  }}
                  draggable={false}
                />
              </div>
            </div>

            {/* Bottom Floating Control Bar: Angle Selectors & Zoom */}
            <div style={{
              position: 'absolute',
              bottom: 18,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(16px)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.06)',
              zIndex: 10,
              maxWidth: '92%',
              overflowX: 'auto',
            }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--text-muted)', paddingLeft: 4, letterSpacing: '0.05em' }}>
                ANGLE:
              </span>
              {STUDIO_ANGLES.map((angle) => (
                <button
                  key={angle.id}
                  onClick={() => handleSelectAngle(angle.id)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: activeAngle === angle.id ? 'var(--navy)' : 'transparent',
                    color: activeAngle === angle.id ? 'white' : 'var(--navy)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {angle.label}
                </button>
              ))}

              <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)', margin: '0 4px' }} />

              {/* Zoom Controls */}
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
                title="Zoom Out"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--navy)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ZoomOut size={14} />
              </button>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                title="Zoom In"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--navy)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ZoomIn size={14} />
              </button>
            </div>

            {/* Interaction Drag Tip HUD */}
            <div style={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.72)',
              backdropFilter: 'blur(8px)',
              color: 'white',
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '4px 14px',
              borderRadius: 'var(--radius-full)',
              pointerEvents: 'none',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <RotateCw size={11} className={isAutoRotate ? 'spin' : ''} />
              <span>Drag horizontally to rotate 360° • Move cursor to inspect in 3D perspective</span>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            MODE 2: 12-LAYER PRECISION EXPLODED VIEW
        ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'exploded' && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            overflow: 'hidden',
          }}>
            {/* Exploded Canvas Stage */}
            <div style={{
              position: 'relative',
              flex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}>
              {/* Assembled to Exploded transition stack */}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '680px',
                height: '92%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* 0% Assembled Overlay Image */}
                <img
                  src="/images/renders/odorlock_hero_hd.jpg"
                  alt="OdorLock Assembled"
                  style={{
                    position: 'absolute',
                    maxWidth: '85%',
                    maxHeight: '85%',
                    objectFit: 'contain',
                    opacity: (100 - explodeSlider) / 100,
                    transform: `scale(${0.9 + (100 - explodeSlider) * 0.001})`,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: 'none',
                    borderRadius: 16,
                  }}
                />

                {/* 100% Exploded Technical Diagram */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: explodeSlider / 100,
                  transition: 'opacity 0.2s ease',
                }}>
                  <img
                    src="/images/renders/odorlock_exploded_hd.jpg"
                    alt="OdorLock 12-Layer Exploded Assembly"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: 12,
                      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    }}
                  />

                  {/* 12 Interactive Glowing Hotspot Pins */}
                  {EXPLODED_PARTS.map((part) => {
                    const isSelected = activeHotspot?.id === part.id;
                    return (
                      <div
                        key={part.id}
                        onClick={() => setActiveHotspot(part)}
                        onMouseEnter={() => setActiveHotspot(part)}
                        style={{
                          position: 'absolute',
                          left: `${part.x}%`,
                          top: `${part.y}%`,
                          transform: 'translate(-50%, -50%)',
                          cursor: 'pointer',
                          zIndex: isSelected ? 30 : 20,
                        }}
                      >
                        {/* Outer Pulse Wave */}
                        <div style={{
                          position: 'absolute',
                          inset: -8,
                          borderRadius: '50%',
                          background: 'rgba(29, 185, 84, 0.45)',
                          animation: 'pulseRing 2s cubic-bezier(0.25, 1, 0.5, 1) infinite',
                        }} />

                        {/* Central Target Pin */}
                        <div style={{
                          width: isSelected ? 22 : 16,
                          height: isSelected ? 22 : 16,
                          borderRadius: '50%',
                          background: isSelected ? '#1db954' : '#ffffff',
                          border: isSelected ? '3px solid #ffffff' : '2.5px solid #1db954',
                          boxShadow: isSelected
                            ? '0 0 20px rgba(29, 185, 84, 0.9), 0 0 10px #1db954'
                            : '0 2px 8px rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isSelected ? 'white' : 'var(--navy)',
                          fontSize: '0.625rem',
                          fontWeight: 800,
                          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}>
                          {isSelected && <Check size={11} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Interactive Assembly Slider */}
              <div style={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(24, 30, 38, 0.92)',
                backdropFilter: 'blur(16px)',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                zIndex: 25,
                width: '380px',
                maxWidth: '90%',
              }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
                  Assembled
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={explodeSlider}
                  onChange={(e) => setExplodeSlider(Number(e.target.value))}
                  style={{
                    flex: 1,
                    accentColor: 'var(--green)',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--green)' }}>
                  Exploded ({explodeSlider}%)
                </span>
              </div>
            </div>

            {/* Right Engineering HUD Panel */}
            <div style={{
              width: '320px',
              height: '100%',
              background: 'rgba(18, 22, 28, 0.96)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              zIndex: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--green)', fontWeight: 800, letterSpacing: '0.08em' }}>
                    EXPLODED SCHEMATIC
                  </div>
                  <h4 style={{ color: 'white', fontSize: '0.9375rem', fontWeight: 800, margin: '2px 0 0' }}>
                    12-Part Architecture
                  </h4>
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(29, 185, 84, 0.15)',
                  border: '1px solid rgba(29, 185, 84, 0.3)',
                  color: 'var(--green)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                }}>
                  Interactive HUD
                </div>
              </div>

              {/* Selected Component Detail Card */}
              {activeHotspot ? (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(29, 185, 84, 0.12) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(29, 185, 84, 0.35)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  marginBottom: 16,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--green)', fontWeight: 800, letterSpacing: '0.06em' }}>
                      LAYER {activeHotspot.num} • {activeHotspot.category.toUpperCase()}
                    </span>
                    <span style={{
                      fontSize: '0.625rem',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontWeight: 600,
                    }}>
                      {activeHotspot.tag}
                    </span>
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.0625rem', fontWeight: 800, marginBottom: 8 }}>
                    {activeHotspot.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem', lineHeight: 1.5, marginBottom: 12 }}>
                    {activeHotspot.desc}
                  </p>
                  <div style={{
                    background: 'rgba(0,0,0,0.35)',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 2 }}>
                      TECHNICAL SPECIFICATION:
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--green)', fontWeight: 600, fontFamily: 'monospace' }}>
                      {activeHotspot.spec}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px dashed rgba(255,255,255,0.15)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px',
                  marginBottom: 16,
                  textAlign: 'center',
                }}>
                  <Crosshair size={22} color="var(--green)" style={{ margin: '0 auto 8px', opacity: 0.8 }} />
                  <div style={{ fontSize: '0.75rem', color: 'white', fontWeight: 700 }}>
                    Select Any Component Pin
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                    Hover or click the green markers on the diagram or parts in the list below.
                  </div>
                </div>
              )}

              {/* Component Layer List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                <span style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800, letterSpacing: '0.05em' }}>
                  ALL 12 MODULES
                </span>
                {EXPLODED_PARTS.map((part) => {
                  const isSelected = activeHotspot?.id === part.id;
                  return (
                    <div
                      key={part.id}
                      onClick={() => setActiveHotspot(part)}
                      onMouseEnter={() => setActiveHotspot(part)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '7px 10px',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'rgba(29, 185, 84, 0.2)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '1px solid var(--green)' : '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          fontSize: '0.625rem',
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          color: isSelected ? 'var(--green)' : 'rgba(255,255,255,0.4)',
                        }}>
                          {part.num}
                        </span>
                        <div>
                          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: isSelected ? 'white' : 'rgba(255,255,255,0.85)' }}>
                            {part.name}
                          </div>
                          <div style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.4)' }}>
                            {part.category}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={13} color={isSelected ? 'var(--green)' : 'rgba(255,255,255,0.2)'} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            MODE 3: X-RAY CUTAWAY INTERNAL VIEW (INTERACTIVE WIPE)
        ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'cutaway' && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Split Screen Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '720px',
              height: '84%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Layer 1: Solid Hero Image (Full width background) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src="/images/renders/odorlock_hero_hd.jpg"
                  alt="Solid Exterior"
                  style={{
                    maxWidth: '92%',
                    maxHeight: '92%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    borderRadius: 16,
                  }}
                />
              </div>

              {/* Layer 2: Translucent X-Ray Cutaway Image (Clipped by cutawayWipe) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                clipPath: `polygon(${cutawayWipe}% 0, 100% 0, 100% 100%, ${cutawayWipe}% 100%)`,
                transition: isWipeDragging ? 'none' : 'clip-path 0.1s ease',
              }}>
                <img
                  src="/images/renders/odorlock_cutaway_hd.jpg"
                  alt="Internal X-Ray Cutaway"
                  style={{
                    maxWidth: '92%',
                    maxHeight: '92%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    borderRadius: 16,
                  }}
                />
              </div>

              {/* Draggable Divider Handle Line */}
              <div
                onMouseDown={() => setIsWipeDragging(true)}
                onTouchStart={() => setIsWipeDragging(true)}
                style={{
                  position: 'absolute',
                  top: '5%',
                  bottom: '5%',
                  left: `${cutawayWipe}%`,
                  width: '3px',
                  background: 'var(--green)',
                  boxShadow: '0 0 12px rgba(29, 185, 84, 0.8), 0 0 4px #1db954',
                  cursor: 'ew-resize',
                  zIndex: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translateX(-50%)',
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--green)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  border: '2px solid white',
                  cursor: 'ew-resize',
                }}>
                  <Sliders size={14} />
                </div>
              </div>

              {/* Left & Right Labels */}
              <div style={{
                position: 'absolute',
                top: 24,
                left: 24,
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--navy)',
                pointerEvents: 'none',
              }}>
                SOLID EXTERIOR
              </div>

              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'rgba(15, 23, 42, 0.85)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--green)',
                pointerEvents: 'none',
              }}>
                INTERNAL X-RAY
              </div>
            </div>

            {/* Bottom Scrub Hint HUD */}
            <div style={{
              position: 'absolute',
              bottom: 18,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.82)',
              backdropFilter: 'blur(10px)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              color: 'white',
              fontSize: '0.6875rem',
              fontWeight: 600,
              pointerEvents: 'none',
            }}>
              Drag the green handle left and right to reveal internal centrifugal fan & airflow ducting
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            MODE 4: ENGINEERING BLUEPRINT (5 ORTHOGRAPHIC VIEWS)
        ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'blueprint' && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            padding: '24px',
            background: '#F8FAFC',
          }}>
            <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--green-dark)', fontWeight: 800, letterSpacing: '0.06em' }}>
                    SPECIFICATION DRAWING
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', margin: '2px 0 0' }}>
                    OdorLock Orthographic Multi-Angle Blueprint
                  </h3>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Scale: 1:1 CAD Master Data
                </div>
              </div>

              {/* Master 3D Sheet Display */}
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                background: 'white',
                marginBottom: 20,
              }}>
                <img
                  src="/images/renders/master_3d_sheet_hd.jpg"
                  alt="OdorLock Master 3D Engineering Board"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>

              {/* Specifications Matrix */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
              }}>
                {[
                  { label: 'Exterior Dimensions', value: '310mm (H) × 245mm (W) × 275mm (D)', icon: Box },
                  { label: 'Blower Airflow', value: '42 CFM High-Pressure Centrifugal', icon: Wind },
                  { label: 'Acoustic Rating', value: '<28 dB(A) Whisper-Quiet Baffling', icon: Activity },
                  { label: 'Power Interface', value: 'USB-C PD 3.0 (5V/9V, 15W Max)', icon: Zap },
                  { label: 'Safety Protections', value: 'Over-temp auto-cutoff @ 45°C', icon: ShieldCheck },
                  { label: 'Sensor Precision', value: '±1.5% Relative Humidity Sensing', icon: Cpu },
                ].map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.label}
                      style={{
                        background: 'white',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--green-muted)',
                        color: 'var(--green-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {spec.label}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--navy)', fontWeight: 800 }}>
                          {spec.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            MODE 5: WEBGL FREE-ORBIT 3D (THREE.JS CANVAS)
        ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'webgl' && (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={webglMountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
            {!webglLoaded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(6px)',
              }}>
                <div className="spinner spinner-green" style={{ width: 40, height: 40, borderWidth: 3, marginBottom: 12 }} />
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--navy)' }}>
                  Loading WebGL Orbit Scene…
                </div>
              </div>
            )}
            <div style={{
              position: 'absolute',
              bottom: 18,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.75)',
              color: 'white',
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              pointerEvents: 'none',
            }}>
              Left click + drag to orbit in 3D • Right click to pan • Scroll to zoom
            </div>
          </div>
        )}
      </div>

      {/* Subtle Keyframe Animations */}
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.9; }
          50% { transform: scale(1.6); opacity: 0.3; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes haloBreathing {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(0.96); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.04); }
        }
        .spin {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OdorLock3DViewer;
