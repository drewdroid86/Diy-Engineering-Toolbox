import { useState } from 'react';
import BubbleLevel from './components/tools/BubbleLevel';
import Ruler from './components/tools/Ruler';
import AngleModule from './components/tools/AngleModule';
import Flashlight from './components/tools/Flashlight';
import Calculators from './components/tools/Calculators';
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
      <Navigation setView={setView} />
    </div>
  );
}
