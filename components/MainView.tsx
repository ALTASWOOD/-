
import React, { useState, useEffect } from 'react';
import { Planet, Probe } from '../types';
import { getSpaceInfo } from '../services/geminiService';
import { PROBES } from '../constants';

interface MainViewProps {
  selectedItem: Planet | Probe | null;
}

const MainView: React.FC<MainViewProps> = ({ selectedItem }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [geminiData, setGeminiData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setLoading(true);
      setGeminiData(null);
      getSpaceInfo(selectedItem.name).then(data => {
        setGeminiData(data || null);
        setLoading(false);
      });
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
        <div className="w-24 h-24 opacity-20 bg-slate-800 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <p className="text-lg">请从左侧选择一个行星或探测器以查看详细信息</p>
      </div>
    );
  }

  const isPlanet = 'chineseName' in selectedItem;
  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'missions', label: isPlanet ? '相关探测任务' : '任务详情' },
    { id: 'findings', label: '深空洞察 (AI)' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {isPlanet ? (selectedItem as Planet).chineseName : (selectedItem as Probe).name}
          </h1>
          <p className="text-slate-400">
            {isPlanet ? (selectedItem as Planet).name : `目标: ${(selectedItem as Probe).target}`}
          </p>
        </div>
        <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-medium">
          {isPlanet ? '行星数据' : '航天器状态: ' + (selectedItem as Probe).status}
        </div>
      </div>

      {/* Tabs Nav */}
      <div className="flex space-x-8 px-8 border-b border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? 'text-blue-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-900/30">
        {activeTab === 'overview' && (
          <div className="space-y-6 max-w-4xl">
            <p className="text-lg leading-relaxed text-slate-300">
              {selectedItem.description}
            </p>
            {isPlanet ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                 <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <span className="text-xs text-slate-500 block mb-1">距离太阳</span>
                    <span className="text-lg font-bold">{(selectedItem as Planet).distanceFromSun} AU</span>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <span className="text-xs text-slate-500 block mb-1">相对大小</span>
                    <span className="text-lg font-bold">{(selectedItem as Planet).size}</span>
                 </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <span className="text-xs text-slate-500 block mb-1">发射日期</span>
                    <span className="text-lg font-bold">{(selectedItem as Probe).launchDate}</span>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <span className="text-xs text-slate-500 block mb-1">探测器类型</span>
                    <span className="text-lg font-bold">{(selectedItem as Probe).type}</span>
                 </div>
              </div>
            )}
            <img src={`https://picsum.photos/seed/${selectedItem.id}/800/400`} alt="placeholder" className="rounded-2xl border border-slate-700 opacity-80" />
          </div>
        )}

        {activeTab === 'missions' && (
          <div className="space-y-4 max-w-4xl">
            {isPlanet ? (
               <div className="grid gap-4">
                  {(selectedItem as Planet).probes.map(probeId => {
                    const probe = PROBES.find(p => p.id === probeId);
                    return probe ? (
                      <div key={probe.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-white">{probe.name}</h3>
                          <p className="text-sm text-slate-400">{probe.description}</p>
                        </div>
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{probe.status}</span>
                      </div>
                    ) : null;
                  })}
                  { (selectedItem as Planet).probes.length === 0 && <p className="text-slate-500 italic">暂无记录的探测任务</p>}
               </div>
            ) : (
              <div className="space-y-4">
                 <h3 className="text-xl font-bold text-white">飞行路径与目标</h3>
                 <p className="text-slate-400">{(selectedItem as Probe).name} 任务的主要目标是探索 {(selectedItem as Probe).target}。自 {(selectedItem as Probe).launchDate} 发射以来，该任务为人类提供了大量宝贵的科学数据。</p>
                 <div className="h-64 w-full bg-slate-800/50 rounded-xl flex items-center justify-center border border-dashed border-slate-600">
                    <span className="text-slate-500">正在获取轨迹图...</span>
                 </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'findings' && (
          <div className="max-w-4xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 animate-pulse">正在连接 Gemini AI 进行深度分析...</p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed bg-blue-900/10 p-6 rounded-2xl border border-blue-500/20">
                  {geminiData}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainView;
