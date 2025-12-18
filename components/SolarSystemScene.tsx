
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLANETS, PROBES } from '../constants';
import { Planet, Probe } from '../types';

interface SolarSystemSceneProps {
  onSelect: (item: Planet | Probe) => void;
}

const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({ onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 2000);
    camera.position.set(0, 30, 60);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 500;
    controls.minDistance = 5;

    // Stars background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.8 });
    const starVertices = [];
    for (let i = 0; i < 8000; i++) {
      starVertices.push((Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Sun - Using emissive to make it glow
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xfacc15, 
      emissive: 0xfacc15, 
      emissiveIntensity: 2 
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData = { type: 'planet', id: 'sun' };
    scene.add(sun);

    // Lighting
    // Strong PointLight at the sun's position to illuminate planets
    const sunLight = new THREE.PointLight(0xffffff, 500, 300, 1);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Ambient light so the dark side of planets isn't completely black
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Planets
    const planetGroup = new THREE.Group();
    const planetMeshes: THREE.Mesh[] = [];

    PLANETS.forEach((planet) => {
      if (planet.id === 'sun') return;

      // Orbit line
      const orbitCurve = new THREE.EllipseCurve(0, 0, planet.distanceFromSun * 4, planet.distanceFromSun * 4);
      const orbitPoints = orbitCurve.getPoints(128);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.3 });
      const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);
      orbitLine.rotation.x = Math.PI / 2;
      scene.add(orbitLine);

      // Planet Mesh
      const geo = new THREE.SphereGeometry(planet.size, 32, 32);
      const mat = new THREE.MeshStandardMaterial({ 
        color: planet.color,
        roughness: 0.7,
        metalness: 0.2
      });
      const mesh = new THREE.Mesh(geo, mat);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = planet.distanceFromSun * 4;
      mesh.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      
      mesh.userData = { type: 'planet', data: planet };
      planetMeshes.push(mesh);
      planetGroup.add(mesh);
    });
    scene.add(planetGroup);

    // Probes
    const probeGroup = new THREE.Group();
    PROBES.forEach((probe, idx) => {
        const pGeo = new THREE.SphereGeometry(0.15, 8, 8);
        const pMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        
        const dist = 15 + Math.random() * 80;
        const ang = (idx / PROBES.length) * Math.PI * 2;
        pMesh.position.set(Math.cos(ang) * dist, (Math.random() - 0.5) * 10, Math.sin(ang) * dist);
        
        pMesh.userData = { type: 'probe', data: probe };
        probeGroup.add(pMesh);
    });
    scene.add(probeGroup);

    // Interaction
    const onClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([...planetMeshes, ...probeGroup.children], true);

      if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData.type === 'planet') {
          if (object.userData.id === 'sun') {
             onSelect(PLANETS[0]);
          } else {
             onSelect(object.userData.data);
          }
        } else if (object.userData.type === 'probe') {
          onSelect(object.userData.data);
        }
      }
    };

    renderer.domElement.addEventListener('click', onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      
      planetMeshes.forEach((mesh, i) => {
        const time = Date.now() * 0.0001;
        const planet = PLANETS[i + 1];
        const radius = planet.distanceFromSun * 4;
        const speed = (1 / planet.distanceFromSun) * 0.2;
        const angle = time * speed + i;
        mesh.position.set(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
        );
        mesh.rotation.y += 0.01;
      });

      probeGroup.rotation.y += 0.0005;
      stars.rotation.y += 0.00005;
      sun.rotation.y += 0.002;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onClick);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [onSelect]);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-crosshair">
       <div className="absolute top-20 left-8 pointer-events-none bg-slate-900/40 backdrop-blur p-3 rounded-lg border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase tracking-tighter mb-2">操作指南</p>
          <ul className="text-[10px] space-y-1 text-slate-300">
            <li>• 鼠标左键：旋转视角</li>
            <li>• 鼠标右键：平移视角</li>
            <li>• 滚轮：缩放视角</li>
            <li>• 点击行星：查看详情</li>
          </ul>
       </div>
    </div>
  );
};

export default SolarSystemScene;
