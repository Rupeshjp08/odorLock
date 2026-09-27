import fs from 'fs';
import path from 'path';

// Polyfill browser globals needed by GLTFExporter in Node.js
global.FileReader = class {
  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    this.onloadend && this.onloadend();
  }
  async readAsDataURL(blob) {
    const buf = Buffer.from(await blob.arrayBuffer());
    this.result = 'data:application/octet-stream;base64,' + buf.toString('base64');
    this.onloadend && this.onloadend();
  }
};

const THREE = await import('three');
const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');

console.log('Building OdorLock Production 3D Master Model...');

// ============================================================
// 1. MATERIAL DEFINITIONS (Spec Compliant)
// ============================================================
const materials = {
  whitePlastic: new THREE.MeshStandardMaterial({
    name: 'OdorLock_WhitePlastic',
    color: 0xf5f7fa,
    roughness: 0.28,
    metalness: 0.04,
  }),
  blackPlastic: new THREE.MeshStandardMaterial({
    name: 'OdorLock_BlackPlastic',
    color: 0x181a1d,
    roughness: 0.42,
    metalness: 0.08,
  }),
  clearChamber: new THREE.MeshPhysicalMaterial({
    name: 'OdorLock_ClearChamber',
    color: 0xffffff,
    transparent: true,
    opacity: 0.32,
    roughness: 0.05,
    metalness: 0.05,
    transmission: 0.95,
    ior: 1.52,
    thickness: 0.015,
  }),
  greenAccent: new THREE.MeshStandardMaterial({
    name: 'OdorLock_GreenAccent',
    color: 0x1db954,
    roughness: 0.3,
    metalness: 0.1,
  }),
  ledGreen: new THREE.MeshStandardMaterial({
    name: 'OdorLock_LED_Green',
    color: 0x1db954,
    emissive: 0x1db954,
    emissiveIntensity: 2.2,
    roughness: 0.1,
    metalness: 0.0,
  }),
  helmetShell: new THREE.MeshStandardMaterial({
    name: 'OdorLock_HelmetShell',
    color: 0x121417,
    roughness: 0.38,
    metalness: 0.12,
  }),
  helmetVisor: new THREE.MeshPhysicalMaterial({
    name: 'OdorLock_HelmetVisor',
    color: 0x0a0c0e,
    transparent: true,
    opacity: 0.88,
    roughness: 0.04,
    metalness: 0.15,
    transmission: 0.65,
    ior: 1.58,
  }),
  metal: new THREE.MeshStandardMaterial({
    name: 'OdorLock_Metal',
    color: 0xc8cdd6,
    roughness: 0.22,
    metalness: 0.88,
  }),
  rubber: new THREE.MeshStandardMaterial({
    name: 'OdorLock_Rubber',
    color: 0x111315,
    roughness: 0.85,
    metalness: 0.02,
  }),
  electronics: new THREE.MeshStandardMaterial({
    name: 'OdorLock_Electronics',
    color: 0x0f3b20,
    roughness: 0.35,
    metalness: 0.3,
  }),
};

// Helper: Rounded box geometry generator
function createRoundedBox(w, h, d, r, s) {
  const shape = new THREE.Shape();
  const hw = w / 2 - r;
  const hh = h / 2 - r;

  shape.moveTo(-hw, -hh - r);
  shape.lineTo(hw, -hh - r);
  shape.quadraticCurveTo(hw + r, -hh - r, hw + r, -hh);
  shape.lineTo(hw + r, hh);
  shape.quadraticCurveTo(hw + r, hh + r, hw, hh + r);
  shape.lineTo(-hw, hh + r);
  shape.quadraticCurveTo(-hw - r, hh + r, -hw - r, hh);
  shape.lineTo(-hw - r, -hh);
  shape.quadraticCurveTo(-hw - r, -hh - r, -hw, -hh - r);

  const extrudeSettings = {
    depth: d - 2 * r,
    bevelEnabled: true,
    bevelSegments: s,
    steps: 1,
    bevelSize: r,
    bevelThickness: r,
    curveSegments: s,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
}

// ============================================================
// 2. MODEL BUILDER FUNCTION (Builds all components)
// ============================================================
function buildOdorLockModel(isExploded = false) {
  const root = new THREE.Group();
  root.name = isExploded ? 'OdorLock_Exploded_Model' : 'OdorLock_Product_Model';

  // Vertical offsets for exploded view (12 distinct logical layers)
  const dy = isExploded
    ? {
        chamber: 0.48,
        helmet: 0.28,
        support: 0.14,
        airDuct: 0.04,
        odorModule: -0.04,
        sensor: -0.08,
        fan: -0.16,
        pcb: -0.25,
        power: -0.32,
        mainBody: -0.42,
        base: -0.54,
        feet: -0.62,
      }
    : {
        chamber: 0,
        helmet: 0,
        support: 0,
        airDuct: 0,
        odorModule: 0,
        sensor: 0,
        fan: 0,
        pcb: 0,
        power: 0,
        mainBody: 0,
        base: 0,
        feet: 0,
      };

  // ------------------------------------------------------------
  // 1. OdorLock_Base (Bottom chassis plate)
  // ------------------------------------------------------------
  const baseGroup = new THREE.Group();
  baseGroup.name = 'OdorLock_Base';
  baseGroup.position.y = dy.base;

  const basePlateGeom = createRoundedBox(0.42, 0.03, 0.38, 0.03, 5);
  const basePlate = new THREE.Mesh(basePlateGeom, materials.whitePlastic);
  basePlate.position.y = 0.015;
  baseGroup.add(basePlate);
  root.add(baseGroup);

  // ------------------------------------------------------------
  // 2. OdorLock_RubberFeet (4 dark rubber feet)
  // ------------------------------------------------------------
  const feetGroup = new THREE.Group();
  feetGroup.name = 'OdorLock_RubberFeet';
  feetGroup.position.y = dy.feet;

  const footGeom = new THREE.CylinderGeometry(0.02, 0.024, 0.015, 16);
  const footPositions = [
    [-0.16, 0.0075, -0.14],
    [0.16, 0.0075, -0.14],
    [-0.16, 0.0075, 0.14],
    [0.16, 0.0075, 0.14],
  ];
  footPositions.forEach(([x, y, z]) => {
    const foot = new THREE.Mesh(footGeom, materials.rubber);
    foot.position.set(x, y, z);
    feetGroup.add(foot);
  });
  root.add(feetGroup);

  // ------------------------------------------------------------
  // 3. OdorLock_MainBody (White lower housing with air grilles)
  // ------------------------------------------------------------
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'OdorLock_MainBody';
  bodyGroup.position.y = dy.mainBody;

  const bodyGeom = createRoundedBox(0.44, 0.18, 0.40, 0.04, 6);
  const bodyMesh = new THREE.Mesh(bodyGeom, materials.whitePlastic);
  bodyMesh.position.y = 0.12;
  bodyGroup.add(bodyMesh);

  // Rear intake grille slots
  const grilleSlotGeom = new THREE.BoxGeometry(0.008, 0.06, 0.01);
  for (let i = -6; i <= 6; i++) {
    const slot = new THREE.Mesh(grilleSlotGeom, materials.blackPlastic);
    slot.position.set(i * 0.02, 0.12, -0.201);
    bodyGroup.add(slot);
  }

  // Side exhaust vents on right side
  for (let row = 0; row < 3; row++) {
    const vent = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.008, 0.08),
      materials.blackPlastic
    );
    vent.position.set(0.221, 0.08 + row * 0.025, 0.04);
    bodyGroup.add(vent);
  }
  root.add(bodyGroup);

  // ------------------------------------------------------------
  // 4. OdorLock_PowerButton (Front interface)
  // ------------------------------------------------------------
  const buttonGroup = new THREE.Group();
  buttonGroup.name = 'OdorLock_PowerButton';
  buttonGroup.position.y = dy.mainBody;

  // Outer bezel ring
  const bezelGeom = new THREE.TorusGeometry(0.024, 0.003, 16, 32);
  const bezel = new THREE.Mesh(bezelGeom, materials.metal);
  bezel.position.set(0, 0.075, 0.203);
  buttonGroup.add(bezel);

  // Green glowing LED ring
  const ledRingGeom = new THREE.TorusGeometry(0.02, 0.0025, 16, 32);
  const ledRing = new THREE.Mesh(ledRingGeom, materials.ledGreen);
  ledRing.position.set(0, 0.075, 0.204);
  buttonGroup.add(ledRing);

  // Center button face (matte black)
  const btnFaceGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.004, 32);
  btnFaceGeom.rotateX(Math.PI / 2);
  const btnFace = new THREE.Mesh(btnFaceGeom, materials.blackPlastic);
  btnFace.position.set(0, 0.075, 0.2045);
  buttonGroup.add(btnFace);

  // Power symbol icon on button (illuminated green)
  const pwrRingGeom = new THREE.TorusGeometry(0.008, 0.0012, 12, 24, Math.PI * 1.5);
  pwrRingGeom.rotateZ(Math.PI * 0.75);
  const pwrRing = new THREE.Mesh(pwrRingGeom, materials.ledGreen);
  pwrRing.position.set(0, 0.075, 0.207);
  buttonGroup.add(pwrRing);

  const pwrLineGeom = new THREE.CylinderGeometry(0.0012, 0.0012, 0.007, 8);
  const pwrLine = new THREE.Mesh(pwrLineGeom, materials.ledGreen);
  pwrLine.position.set(0, 0.079, 0.207);
  buttonGroup.add(pwrLine);
  root.add(buttonGroup);

  // ------------------------------------------------------------
  // 5. OdorLock_ControlBoard (Main PCB)
  // ------------------------------------------------------------
  const pcbGroup = new THREE.Group();
  pcbGroup.name = 'OdorLock_ControlBoard';
  pcbGroup.position.y = dy.pcb;

  const pcbBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.004, 0.12),
    materials.electronics
  );
  pcbBoard.position.set(0, 0.09, 0.02);
  pcbGroup.add(pcbBoard);

  // Microcontroller IC & SMD Chips
  const mcu = new THREE.Mesh(
    new THREE.BoxGeometry(0.024, 0.004, 0.024),
    materials.blackPlastic
  );
  mcu.position.set(-0.03, 0.094, 0.02);
  pcbGroup.add(mcu);

  // Capacitors / Inductors
  for (let c = 0; c < 3; c++) {
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.006, 0.012, 12),
      materials.metal
    );
    cap.position.set(0.04 + c * 0.02, 0.098, 0.01);
    pcbGroup.add(cap);
  }
  root.add(pcbGroup);

  // ------------------------------------------------------------
  // 6. OdorLock_PowerModule & OdorLock_USB_C
  // ------------------------------------------------------------
  const powerGroup = new THREE.Group();
  powerGroup.name = 'OdorLock_PowerModule';
  powerGroup.position.y = dy.power;

  const powerPcb = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.004, 0.05),
    materials.electronics
  );
  powerPcb.position.set(0, 0.05, -0.16);
  powerGroup.add(powerPcb);

  // USB-C receptacle
  const usbC = new THREE.Mesh(
    new THREE.BoxGeometry(0.014, 0.006, 0.01),
    materials.metal
  );
  usbC.name = 'OdorLock_USB_C';
  usbC.position.set(0, 0.05, -0.201);
  powerGroup.add(usbC);
  root.add(powerGroup);

  // ------------------------------------------------------------
  // 7. OdorLock_Fan (Centrifugal Air Blower Assembly)
  // ------------------------------------------------------------
  const fanGroup = new THREE.Group();
  fanGroup.name = 'OdorLock_Fan';
  fanGroup.position.y = dy.fan;

  // Fan casing
  const fanCasing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.032, 24),
    materials.blackPlastic
  );
  fanCasing.position.set(0, 0.13, -0.06);
  fanGroup.add(fanCasing);

  // Center hub & motor
  const fanHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.034, 16),
    materials.metal
  );
  fanHub.position.set(0, 0.13, -0.06);
  fanGroup.add(fanHub);

  // Impeller blades
  for (let b = 0; b < 8; b++) {
    const angle = (b / 8) * Math.PI * 2;
    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(0.028, 0.025, 0.002),
      materials.blackPlastic
    );
    blade.position.set(
      Math.cos(angle) * 0.035,
      0.13,
      -0.06 + Math.sin(angle) * 0.035
    );
    blade.rotation.y = angle + 0.4;
    fanGroup.add(blade);
  }
  root.add(fanGroup);

  // ------------------------------------------------------------
  // 8. OdorLock_AirDuct (Airflow routing channel)
  // ------------------------------------------------------------
  const ductGroup = new THREE.Group();
  ductGroup.name = 'OdorLock_AirDuct';
  ductGroup.position.y = dy.airDuct;

  // Duct curving upward from fan to helmet support
  const ductMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.055, 0.07, 24),
    materials.blackPlastic
  );
  ductMesh.position.set(0, 0.175, -0.02);
  ductGroup.add(ductMesh);
  root.add(ductGroup);

  // ------------------------------------------------------------
  // 9. OdorLock_OdorModule (Replaceable cartridge)
  // ------------------------------------------------------------
  const odorGroup = new THREE.Group();
  odorGroup.name = 'OdorLock_OdorModule';
  odorGroup.position.set(isExploded ? 0.22 : 0, dy.odorModule, isExploded ? 0.08 : 0);

  const cartridgeBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.035, 0.06),
    materials.blackPlastic
  );
  cartridgeBody.position.set(0.12, 0.135, -0.05);
  odorGroup.add(cartridgeBody);

  const cartridgeAccent = new THREE.Mesh(
    new THREE.BoxGeometry(0.092, 0.008, 0.062),
    materials.greenAccent
  );
  cartridgeAccent.position.set(0.12, 0.135, -0.05);
  odorGroup.add(cartridgeAccent);

  // Cartridge grip handle
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.035, 12),
    materials.metal
  );
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0.17, 0.135, -0.05);
  odorGroup.add(handle);
  root.add(odorGroup);

  // ------------------------------------------------------------
  // 10. OdorLock_MoistureSensor (Humidity & Temperature Sensor)
  // ------------------------------------------------------------
  const sensorGroup = new THREE.Group();
  sensorGroup.name = 'OdorLock_MoistureSensor';
  sensorGroup.position.set(isExploded ? -0.18 : 0, dy.sensor, isExploded ? 0.06 : 0);

  const sensorPcb = new THREE.Mesh(
    new THREE.BoxGeometry(0.025, 0.003, 0.025),
    materials.electronics
  );
  sensorPcb.position.set(-0.06, 0.18, 0.03);
  sensorGroup.add(sensorPcb);

  const sensorCap = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.008, 0.012),
    materials.metal
  );
  sensorCap.position.set(-0.06, 0.185, 0.03);
  sensorGroup.add(sensorCap);
  root.add(sensorGroup);

  // ------------------------------------------------------------
  // 11. OdorLock_HelmetSupport (Upper platform inside chamber)
  // ------------------------------------------------------------
  const supportGroup = new THREE.Group();
  supportGroup.name = 'OdorLock_HelmetSupport';
  supportGroup.position.y = dy.support;

  // Deck platform
  const deckPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.18, 0.018, 36),
    materials.blackPlastic
  );
  deckPlate.position.set(0, 0.22, 0);
  supportGroup.add(deckPlate);

  // Circular directed airflow outlet slots
  for (let r = 0; r < 12; r++) {
    const a = (r / 12) * Math.PI * 2;
    const ventHole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.006, 0.022, 8),
      materials.blackPlastic
    );
    ventHole.position.set(Math.cos(a) * 0.11, 0.22, Math.sin(a) * 0.11);
    supportGroup.add(ventHole);
  }

  // Central contoured pedestal riser
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.10, 0.05, 32),
    materials.blackPlastic
  );
  pedestal.position.set(0, 0.245, 0);
  supportGroup.add(pedestal);

  // Ambient LED ring on platform floor (glowing green ring)
  const ringGeom = new THREE.TorusGeometry(0.145, 0.004, 16, 48);
  ringGeom.rotateX(Math.PI / 2);
  const ringMesh = new THREE.Mesh(ringGeom, materials.ledGreen);
  ringMesh.position.set(0, 0.23, 0);
  supportGroup.add(ringMesh);
  root.add(supportGroup);

  // ------------------------------------------------------------
  // 12. OdorLock_Helmet (Aerodynamic Full-Face Helmet)
  // ------------------------------------------------------------
  const helmetGroup = new THREE.Group();
  helmetGroup.name = 'OdorLock_Helmet';
  helmetGroup.position.y = dy.helmet;

  // Helmet outer shell (aerodynamic full face)
  const shellGeom = new THREE.SphereGeometry(0.12, 32, 24);
  shellGeom.scale(0.92, 1.08, 1.15);
  const shell = new THREE.Mesh(shellGeom, materials.helmetShell);
  shell.position.set(0, 0.40, -0.01);
  helmetGroup.add(shell);

  // Chin bar
  const chinGeom = new THREE.CylinderGeometry(0.09, 0.10, 0.075, 24);
  chinGeom.scale(0.9, 1.0, 1.25);
  const chin = new THREE.Mesh(chinGeom, materials.helmetShell);
  chin.position.set(0, 0.33, 0.04);
  helmetGroup.add(chin);

  // Visor (dark tinted curved polycarbonate shield)
  const visorGeom = new THREE.CylinderGeometry(0.102, 0.102, 0.07, 32, 1, true, -Math.PI * 0.42, Math.PI * 0.84);
  visorGeom.rotateY(-Math.PI / 2);
  const visor = new THREE.Mesh(visorGeom, materials.helmetVisor);
  visor.position.set(0, 0.405, 0.025);
  helmetGroup.add(visor);

  // Visor side pivot plates
  const pivotGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.005, 16);
  pivotGeom.rotateZ(Math.PI / 2);
  const leftPivot = new THREE.Mesh(pivotGeom, materials.metal);
  leftPivot.position.set(-0.112, 0.41, 0.0);
  helmetGroup.add(leftPivot);

  const rightPivot = leftPivot.clone();
  rightPivot.position.set(0.112, 0.41, 0.0);
  helmetGroup.add(rightPivot);

  // Helmet vents (chin vent & top vents)
  const ventGeom = new THREE.BoxGeometry(0.03, 0.006, 0.01);
  const chinVent = new THREE.Mesh(ventGeom, materials.blackPlastic);
  chinVent.position.set(0, 0.32, 0.122);
  helmetGroup.add(chinVent);

  const topVent = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.008, 0.02), materials.blackPlastic);
  topVent.position.set(0, 0.51, 0.03);
  helmetGroup.add(topVent);

  root.add(helmetGroup);

  // ------------------------------------------------------------
  // 13. OdorLock_TransparentChamber (Clear Upper Enclosure)
  // ------------------------------------------------------------
  const chamberGroup = new THREE.Group();
  chamberGroup.name = 'OdorLock_TransparentChamber';
  chamberGroup.position.y = dy.chamber;

  // Upper curved clear dome
  const chamberGeom = createRoundedBox(0.42, 0.42, 0.38, 0.06, 6);
  const chamberMesh = new THREE.Mesh(chamberGeom, materials.clearChamber);
  chamberMesh.position.set(0, 0.44, 0);
  chamberGroup.add(chamberMesh);

  // Top interior LED neon bar (OdorLock green accent glow)
  const topLedBar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.006, 0.006, 0.22, 16),
    materials.ledGreen
  );
  topLedBar.rotation.z = Math.PI / 2;
  topLedBar.position.set(0, 0.60, 0);
  chamberGroup.add(topLedBar);

  root.add(chamberGroup);

  return root;
}

// ============================================================
// 3. EXPORT GLB FILES
// ============================================================
async function exportToGLB(scene, filename) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (glb) => {
        const buffer = Buffer.from(glb);
        fs.writeFileSync(filename, buffer);
        console.log(`✓ Exported ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
        resolve(buffer);
      },
      (error) => {
        console.error(`Error exporting ${filename}:`, error);
        reject(error);
      },
      { binary: true, embedImages: true }
    );
  });
}

// A. Assembled Model
const assembledScene = new THREE.Scene();
const assembledModel = buildOdorLockModel(false);
assembledScene.add(assembledModel);
await exportToGLB(assembledScene, 'public/models/odorlock.glb');

// B. Exploded Model
const explodedScene = new THREE.Scene();
const explodedModel = buildOdorLockModel(true);
explodedScene.add(explodedModel);
await exportToGLB(explodedScene, 'public/models/odorlock_exploded.glb');

console.log('✓ Both 3D models built and exported successfully!');
