
import { Planet, Probe } from './types';

export const PLANETS: Planet[] = [
  { id: 'sun', name: 'Sun', chineseName: '太阳', distanceFromSun: 0, size: 2, color: '#facc15', description: '太阳系中心的恒星。', probes: ['parker', 'soho'] },
  { id: 'mercury', name: 'Mercury', chineseName: '水星', distanceFromSun: 3, size: 0.5, color: '#94a3b8', description: '离太阳最近的行星。', probes: ['messenger', 'bepicolombo'] },
  { id: 'venus', name: 'Venus', chineseName: '金星', distanceFromSun: 4.5, size: 0.8, color: '#fdba74', description: '太阳系中最热的行星。', probes: ['akatsuki', 'magellan'] },
  { id: 'earth', name: 'Earth', chineseName: '地球', distanceFromSun: 6, size: 0.9, color: '#3b82f6', description: '我们的家园。', probes: ['iss', 'hubble'] },
  { id: 'mars', name: 'Mars', chineseName: '火星', distanceFromSun: 8, size: 0.7, color: '#ef4444', description: '红色星球，人类未来的目标。', probes: ['perseverance', 'curiosity', 'tianwen1', 'hope'] },
  { id: 'jupiter', name: 'Jupiter', chineseName: '木星', distanceFromSun: 11, size: 1.5, color: '#fb923c', description: '太阳系最大的气态行星。', probes: ['juno', 'galileo', 'juice'] },
  { id: 'saturn', name: 'Saturn', chineseName: '土星', distanceFromSun: 14, size: 1.3, color: '#eab308', description: '拥有壮丽环系的行星。', probes: ['cassini', 'dragonfly'] },
  { id: 'uranus', name: 'Uranus', chineseName: '天王星', distanceFromSun: 17, size: 1.1, color: '#22d3ee', description: '冰巨星，自转轴倾斜严重。', probes: ['voyager2'] },
  { id: 'neptune', name: 'Neptune', chineseName: '海王星', distanceFromSun: 20, size: 1.1, color: '#6366f1', description: '离太阳最远的冰巨星。', probes: ['voyager2'] },
];

export const PROBES: Probe[] = [
  { id: 'voyager1', name: '旅行者1号', target: ' interstellar', launchDate: '1977-09-05', status: 'active', type: 'flyby', description: '目前距离地球最远的人造物体。' },
  { id: 'perseverance', name: '毅力号', target: 'mars', launchDate: '2020-07-30', status: 'active', type: 'rover', description: '正在火星杰泽罗陨石坑寻找生命迹象。' },
  { id: 'juno', name: '朱诺号', target: 'jupiter', launchDate: '2011-08-05', status: 'active', type: 'orbiter', description: '深入研究木星的成分和重力场。' },
  { id: 'tianwen1', name: '天问一号', target: 'mars', launchDate: '2020-07-23', status: 'active', type: 'orbiter', description: '中国首个火星探测器，包含祝融号火星车。' },
  { id: 'parker', name: '帕克太阳探测器', target: 'sun', launchDate: '2018-08-12', status: 'active', type: 'orbiter', description: '人类历史上最接近太阳的航天器。' },
  { id: 'jameswebb', name: '詹姆斯·韦伯望远镜', target: 'deepspace', launchDate: '2021-12-25', status: 'active', type: 'orbiter', description: '有史以来最强大的太空望远镜，观测早期宇宙。' },
  { id: 'cassini', name: '卡西尼号', target: 'saturn', launchDate: '1997-10-15', status: 'retired', type: 'orbiter', description: '对土星及其卫星进行了13年的详尽探索。' },
  { id: 'newhorizons', name: '新视野号', target: 'pluto', launchDate: '2006-01-19', status: 'active', type: 'flyby', description: '首次飞掠冥王星并探索柯伊伯带。' }
];
