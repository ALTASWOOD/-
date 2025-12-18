
import React from 'react';
import { ActivityType, Planet, Probe } from '../types';
import { PLANETS, PROBES } from '../constants';

interface SidebarProps {
  activeType: ActivityType;
  selectedItem: Planet | Probe | null;
  onSelect: (item: Planet | Probe) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeType, selectedItem, onSelect }) => {
  return (
    <div className="w-80 h-full bg-slate-900/80 backdrop-blur-md border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white">
          {activeType === ActivityType.SolarSystem ? '太阳系结构' : '深空探测器'}
        </h2>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
          {activeType === ActivityType.SolarSystem ? 'Content Tree' : 'Fleet List'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {activeType === ActivityType.SolarSystem ? (
          PLANETS.map((planet) => (
            <div key={planet.id} className="space-y-1">
              <button
                onClick={() => onSelect(planet)}
                className={`w-full flex items-center p-3 rounded-xl transition-all ${
                  selectedItem?.id === planet.id 
                    ? 'bg-blue-600/20 border border-blue-600/40 text-blue-300 shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 border border-transparent hover:text-slate-200'
                }`}
              >
                <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: planet.color }} />
                <span className="font-medium">{planet.chineseName}</span>
                <span className="ml-auto text-[10px] opacity-50 font-mono">{planet.name}</span>
              </button>
              
              {/* Nested Probes */}
              <div className="ml-6 space-y-1 border-l border-slate-800 pl-4 py-1">
                {planet.probes.map(probeId => {
                  const probe = PROBES.find(p => p.id === probeId);
                  if (!probe) return null;
                  return (
                    <button
                      key={probe.id}
                      onClick={() => onSelect(probe)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-all ${
                        selectedItem?.id === probe.id
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                      }`}
                    >
                      • {probe.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-2">
            {PROBES.map((probe) => (
              <button
                key={probe.id}
                onClick={() => onSelect(probe)}
                className={`w-full flex flex-col p-4 rounded-xl transition-all border ${
                  selectedItem?.id === probe.id 
                    ? 'bg-blue-600/20 border-blue-600/40 text-blue-300' 
                    : 'bg-slate-800/30 border-slate-700 hover:border-slate-500 text-slate-400'
                }`}
              >
                <div className="flex justify-between w-full mb-1">
                  <span className="font-bold">{probe.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    probe.status === 'active' ? 'border-green-500/50 text-green-400' : 'border-slate-500/50 text-slate-500'
                  }`}>
                    {probe.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] opacity-70">
                  <span>目标: {probe.target}</span>
                  <span>{probe.launchDate.split('-')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-slate-900/50 text-[10px] text-slate-600 border-t border-slate-800 flex justify-between">
        <span>数据版本: 2024.Q4</span>
        <span>连接状态: 实时</span>
      </div>
    </div>
  );
};

export default Sidebar;
