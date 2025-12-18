// Added missing React import to resolve the namespace error for React.ReactNode
import React from 'react';

export enum ActivityType {
  SolarSystem = 'solar-system',
  Probes = 'probes'
}

export interface Probe {
  id: string;
  name: string;
  target: string;
  launchDate: string;
  status: 'active' | 'inactive' | 'retired';
  description: string;
  type: 'orbiter' | 'lander' | 'rover' | 'flyby';
  distanceFromSun?: number; // AU
  position?: [number, number, number];
}

export interface Planet {
  id: string;
  name: string;
  chineseName: string;
  distanceFromSun: number; // relative
  size: number;
  color: string;
  description: string;
  probes: string[]; // probe IDs
}

export interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}