
import React, { useState } from 'react';
import { ActivityType, Planet, Probe } from './types';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import SolarSystemScene from './components/SolarSystemScene';
import { Logo, PlanetIcon, ProbeIcon } from './components/Icon';

const App: React.FC = () => {
  const [activeType, setActiveType] = useState<ActivityType>(ActivityType.SolarSystem);
  const [selectedItem, setSelectedItem] = useState<Planet | Probe | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'details'>('3d');

  const handleSelect = (item: Planet | Probe) => {
    setSelectedItem(item);
    setViewMode('details');
  };

  const toggleHome = () => {
    setSelectedItem(null);
    setViewMode('3d');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-200">
      
      {/* 1. Activity Bar (Activity Column) */}
      <div className="w-16 h-full flex flex-col items-center py-6 bg-slate-950 border-r border-slate-800 z-50">
        <button 
          onClick={toggleHome}
          className="mb-10 text-blue-500 hover:scale-110 transition-transform"
        >
          <Logo className="w-10 h-10" />
        </button>

        <nav className="flex flex-col space-y-6">
          <button
            onClick={() => setActiveType(ActivityType.SolarSystem)}
            className={`p-3 rounded-2xl transition-all ${
              activeType === ActivityType.SolarSystem 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
            title="太阳系"
          >
            <PlanetIcon className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => setActiveType(ActivityType.Probes)}
            className={`p-3 rounded-2xl transition-all ${
              activeType === ActivityType.Probes 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
            title="探测器"
          >
            <ProbeIcon className="w-6 h-6" />
          </button>
        </nav>

        <div className="mt-auto flex flex-col space-y-4 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold border border-slate-700">
                USER
            </div>
        </div>
      </div>

      {/* 2. Left Sidebar (Tree/List Column) */}
      <Sidebar 
        activeType={activeType} 
        selectedItem={selectedItem} 
        onSelect={handleSelect} 
      />

      {/* 3. Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Navigation / Header */}
        <header className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-950/80 to-transparent flex items-center px-8 z-10 pointer-events-none">
          <div className="pointer-events-auto flex items-center space-x-2">
             <button 
                onClick={toggleHome}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === '3d' ? 'bg-white text-black' : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
             >
               3D 视角
             </button>
             {selectedItem && (
               <button 
                  onClick={() => setViewMode('details')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    viewMode === 'details' ? 'bg-white text-black' : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
               >
                 详细数据
               </button>
             )}
          </div>
          
          <div className="ml-auto text-xs text-slate-500 font-mono hidden md:block">
            DEEP_SPACE_EYE_CORE_v1.0.4 // LOCAL_TIME: {new Date().toLocaleTimeString()}
          </div>
        </header>

        {/* View Switching */}
        <div className="flex-1 w-full h-full">
            {viewMode === '3d' ? (
              <div className="w-full h-full relative">
                <SolarSystemScene onSelect={handleSelect} />
                <div className="absolute bottom-8 right-8 p-4 bg-slate-900/60 backdrop-blur border border-slate-700 rounded-2xl pointer-events-none">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Live Telemetry</span>
                  </div>
                  <div className="space-y-1 text-[10px] font-mono text-slate-400">
                    <div>X_COORD: 41.2294 AU</div>
                    <div>Y_COORD: -04.1192 AU</div>
                    <div>STATUS: SCANNING_DEEP_SKY</div>
                  </div>
                </div>
              </div>
            ) : (
              <MainView selectedItem={selectedItem} />
            )}
        </div>
      </main>

    </div>
  );
};

export default App;
