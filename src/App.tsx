import { useState } from 'react';
import BubbleLevel from './components/tools/BubbleLevel';
import Ruler from './components/tools/Ruler';
import AngleModule from './components/tools/AngleModule';
import Flashlight from './components/tools/Flashlight';
import Calculators from './components/tools/Calculators';
import UnitConverter from './components/tools/UnitConverter';
import LuxMeter from './components/tools/LuxMeter';
import DecibelMeter from './components/tools/DecibelMeter';
import Inclinometer3D from './components/tools/Inclinometer3D';
import MetalDetector from './components/tools/MetalDetector';
import VibrationAnalyzer from './components/tools/VibrationAnalyzer';
import NewTool from './components/tools/NewTool';
import Navigation from './components/Navigation';

export default function App() {
  const [view, setView] = useState('level');

  return (
    <div className="min-h-screen pb-20">
      {view === 'level' && <BubbleLevel />}
      {view === 'ruler' && <Ruler />}
      {view === 'angle' && <AngleModule />}
      {view === 'light' && <Flashlight />}
      {view === 'calc' && <Calculators />}
      {view === 'converter' && <UnitConverter />}
      {view === 'lux' && <LuxMeter />}
      {view === 'db' && <DecibelMeter />}
      {view === '3d-incl' && <Inclinometer3D />}
      {view === 'metal' && <MetalDetector />}
      {view === 'vibration' && <VibrationAnalyzer />}
      {view === 'new' && <NewTool />}
      <Navigation setView={setView} />
    </div>
  );
}
