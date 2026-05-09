
import React, { useEffect, useState } from 'react';
import { SimType } from '../types';

interface SimulationCanvasProps {
  type: SimType;
  values: Record<string, number>;
}

export const SimulationCanvas: React.FC<SimulationCanvasProps> = ({ type, values }) => {
  // Use a tick for animations
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setTick((t) => t + 1);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // --- RENDERERS ---

  const renderShadow = () => {
    const dist = values.distance || 50; // 10 to 90
    
    const objectX = 150;
    const wallX = 280;
    
    // Map dist (10-90) to lightX.
    const lightX = objectX - Math.max(10, dist); 
    const lightY = 100;

    // Project shadow
    const objTopY = 130;
    const objBotY = 170;
    
    const mTop = (objTopY - lightY) / (objectX - lightX);
    const mBot = (objBotY - lightY) / (objectX - lightX);
    
    const shadowTopY = mTop * (wallX - lightX) + lightY;
    const shadowBotY = mBot * (wallX - lightX) + lightY;

    return (
      <svg viewBox="0 0 300 300" className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-lg border-2 border-slate-300 dark:border-slate-700">
        <rect x="0" y="250" width="300" height="50" className="fill-slate-400" />
        <rect x={wallX} y="50" width="20" height="200" className="fill-slate-500" />
        <path d={`M ${wallX} ${shadowTopY} L ${wallX} ${shadowBotY} L ${wallX+5} ${shadowBotY} L ${wallX+5} ${shadowTopY} Z`} className="fill-black opacity-50" />
        <line x1={lightX} y1={lightY} x2={wallX} y2={shadowTopY} stroke="orange" strokeDasharray="4" opacity="0.5" />
        <line x1={lightX} y1={lightY} x2={wallX} y2={shadowBotY} stroke="orange" strokeDasharray="4" opacity="0.5" />
        <rect x={objectX-5} y={130} width="10" height="40" className="fill-blue-600" />
        <circle cx={lightX} cy={lightY} r="10" className="fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
        <text x="10" y="20" className="text-xs fill-slate-700 dark:fill-slate-300">Move slider to change light distance</text>
      </svg>
    );
  };

  const renderPH = () => {
    const ph = values.ph || 7;
    let hue = 0;
    if (ph <= 7) {
      hue = (ph / 7) * 120; // 0 to 120 (Red to Green)
    } else {
      hue = 120 + ((ph - 7) / 7) * 120; // 120 to 240 (Green to Blue/Purple)
    }

    return (
      <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
        <path d="M 60 50 L 60 150 Q 60 160 70 160 L 130 160 Q 140 160 140 150 L 140 50" fill="none" stroke="gray" strokeWidth="4" />
        <path d="M 65 80 L 65 150 Q 65 155 70 155 L 130 155 Q 135 155 135 150 L 135 80 Z" fill={`hsl(${hue}, 80%, 60%)`} className="transition-colors duration-200" />
        <text x="100" y="185" textAnchor="middle" className="text-xl font-bold fill-slate-700 dark:fill-slate-200">pH: {ph.toFixed(1)}</text>
        <text x="100" y="30" textAnchor="middle" className="text-sm fill-slate-500">{ph < 7 ? 'Acidic' : ph > 7 ? 'Alkaline' : 'Neutral'}</text>
      </svg>
    );
  };

  const renderGrowth = () => {
    const intensity = values.light || 20; 
    const co2 = values.co2 !== undefined ? values.co2 : 100;
    const limitingFactor = Math.min(intensity, co2);
    
    const bubbles = [];
    const count = Math.floor(limitingFactor / 10);
    for (let i = 0; i < count; i++) {
        const yPos = 150 - ((tick * (1 + limitingFactor/20) + i * 30) % 100);
        const xPos = 120 + Math.sin(tick/10 + i) * 10;
        bubbles.push(<circle key={i} cx={xPos} cy={yPos} r={3} className="fill-blue-200 opacity-70" />);
    }

    return (
      <svg viewBox="0 0 200 200" className="w-full h-full bg-sky-100 dark:bg-slate-700 rounded-lg">
        <circle cx="20" cy="20" r={10 + intensity/5} className="fill-yellow-500 opacity-80" />
        {values.co2 !== undefined && (
             <g opacity={co2 / 100}>
                <ellipse cx="160" cy="40" rx="30" ry="15" className="fill-gray-300" />
                <text x="160" y="45" textAnchor="middle" fontSize="10" className="fill-black">CO₂</text>
             </g>
        )}
        <path d="M 100 180 Q 100 100 80 80 M 100 180 Q 100 120 120 90" stroke="green" strokeWidth="4" fill="none"/>
        <path d="M 80 80 Q 60 70 80 60 Q 90 70 80 80 Z" className="fill-green-600"/>
        <path d="M 120 90 Q 140 80 120 70 Q 110 80 120 90 Z" className="fill-green-600"/>
        <rect x="0" y="150" width="200" height="50" className="fill-blue-500 opacity-30" />
        {bubbles}
      </svg>
    );
  };

  const renderLens = () => {
    const angle = values.angle || 45; 
    const n = values.density || 1.5; 
    const radInc = (angle * Math.PI) / 180;
    const radRef = Math.asin(Math.sin(radInc) / n);
    const cx = 150; const cy = 100; const len = 100;
    const x1 = cx - len * Math.sin(radInc);
    const y1 = cy - len * Math.cos(radInc);
    const x2 = cx + len * Math.sin(radRef);
    const y2 = cy + len * Math.cos(radRef);

    return (
      <svg viewBox="0 0 300 200" className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-lg">
        <rect x="50" y="100" width="200" height="100" className="fill-cyan-200 opacity-40 stroke-cyan-500" />
        <line x1="150" y1="20" x2="150" y2="180" stroke="gray" strokeDasharray="4" />
        <line x1={x1} y1={y1} x2={cx} y2={cy} stroke="red" strokeWidth="2" />
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="blue" strokeWidth="2" />
        <text x="10" y="20" className="text-xs fill-slate-600 dark:fill-slate-300">n = {n.toFixed(2)}</text>
      </svg>
    )
  }

  const renderDensity = () => {
      const dObj = values.objDensity || 0.5;
      const dLiq = 1.0; 
      let yPos = 100; 
      
      const waterLevel = 100;
      const blockH = 40;
      const floor = 200;

      if (dObj < dLiq) {
          // Floating
          const submergedRatio = dObj / dLiq; 
          yPos = waterLevel - blockH * (1 - submergedRatio);
      } else {
          // Sinking
          yPos = floor - blockH;
      }

      return (
          <svg viewBox="0 0 200 250" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <rect x="0" y="100" width="200" height="150" className="fill-blue-400 opacity-50" />
              <rect x="80" y={yPos} width="40" height="40" className="fill-amber-600 stroke-black stroke-2" />
              <line x1="0" y1="100" x2="200" y2="100" stroke="blue" strokeWidth="2" />
              <text x="10" y="50" className="text-xs fill-slate-500">Obj Density: {dObj.toFixed(1)} g/cm³</text>
              <text x="10" y="70" className="text-xs fill-slate-500">Water: 1.0 g/cm³</text>
          </svg>
      );
  };

  const renderCell = () => {
    const isPlant = values.type > 0.5;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
        {isPlant ? (
          <g transform="translate(50, 50)">
             {/* Cell Wall */}
             <rect x="0" y="0" width="100" height="100" stroke="green" strokeWidth="5" fill="#e0f2f1" />
             {/* Cell Membrane */}
             <rect x="5" y="5" width="90" height="90" stroke="green" strokeWidth="1" fill="none" />
             {/* Vacuole */}
             <rect x="20" y="20" width="60" height="60" fill="#b2dfdb" opacity="0.5" />
             {/* Nucleus */}
             <circle cx="20" cy="20" r="10" fill="purple" />
             {/* Chloroplasts */}
             <ellipse cx="80" cy="30" rx="5" ry="8" fill="green" />
             <ellipse cx="80" cy="60" rx="5" ry="8" fill="green" />
             <text x="0" y="-10" fontSize="12" fill="green">Plant Cell</text>
          </g>
        ) : (
          <g transform="translate(100, 100)">
            {/* Membrane */}
            <path d="M -40 -30 Q 0 -60 40 -30 Q 60 0 40 40 Q 0 60 -40 40 Q -60 0 -40 -30" stroke="red" strokeWidth="2" fill="#ffebee" />
            {/* Nucleus */}
            <circle cx="0" cy="0" r="12" fill="purple" />
             <text x="-30" y="-70" fontSize="12" fill="red">Animal Cell</text>
          </g>
        )}
      </svg>
    );
  };

  const renderStates = () => {
    const temp = values.temp || 20;
    let state = 'Solid';
    let speed = 0.5;
    
    if (temp >= 0 && temp < 100) {
      state = 'Liquid';
      speed = 2 + (temp/100)*3;
    } else if (temp >= 100) {
      state = 'Gas';
      speed = 8 + ((temp-100)/20)*2;
    } else {
        speed = 0.5;
    }

    const particles = [];
    for(let i=0; i<30; i++) {
        const row = Math.floor(i/6);
        const col = i%6;
        
        let cx = 60 + col * 15;
        let cy = 60 + row * 15;

        if (state === 'Liquid') {
            cx += Math.sin(tick/10 + i) * 5;
            cy += 40 + Math.cos(tick/10 + i) * 5; 
        } else if (state === 'Gas') {
             cx = (cx + tick * speed + i*100) % 180 + 10;
             cy = (cy + tick * speed * 0.7 + i*50) % 180 + 10;
        } else {
            cx += Math.random();
            cy += 40 + Math.random();
        }

        particles.push(<circle key={i} cx={cx} cy={cy} r={4} fill={state === 'Gas' ? 'gray' : 'blue'} opacity={0.7} />);
    }

    return (
       <svg viewBox="0 0 200 200" className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-300">
           <text x="10" y="20" fontSize="12" className="fill-slate-600">{state} ({temp}°C)</text>
           {particles}
           <rect x="0" y="190" width="200" height="10" fill="red" opacity={temp > 0 ? temp/150 : 0.1} />
       </svg>
    );
  };

  const renderCircuit = () => {
    const isOn = values.switch > 0.5;
    const batteries = Math.round(values.batteries || 1);
    const brightness = isOn ? batteries * 0.3 + 0.1 : 0;
    
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
         <rect x="40" y="40" width="120" height="120" stroke="black" strokeWidth="2" fill="none" />
         
         <g transform="translate(40, 100)">
            <line x1="-10" y1="-10" x2="-10" y2="10" stroke="black" strokeWidth="2" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke="black" strokeWidth="4" />
            <text x="-25" y="5" fontSize="10">{batteries}x</text>
         </g>

         <g transform="translate(100, 40)">
            <line x1="-10" y1="0" x2={isOn ? 10 : 10} y2={isOn ? 0 : -10} stroke="black" strokeWidth="2" />
            <circle cx="-10" cy="0" r="2" fill="black"/>
            <circle cx="10" cy="0" r="2" fill="black"/>
         </g>

         <g transform="translate(160, 100)">
            <circle cx="0" cy="0" r="10" stroke="black" fill={isOn ? `rgba(255,255,0,${Math.min(1, brightness)})` : 'none'} />
            <path d="M -5 5 L 0 -5 L 5 5" stroke="black" fill="none" />
            {isOn && <g stroke="orange" strokeWidth="2">
                <line x1="0" y1="-15" x2="0" y2="-25" />
                <line x1="12" y1="-8" x2="20" y2="-12" />
                <line x1="-12" y1="-8" x2="-20" y2="-12" />
            </g>}
         </g>
      </svg>
    );
  };

  const renderFoodTest = () => {
    const food = values.food || 0; 
    const reagent = values.reagent || 0; 
    
    let color = '#e0e0e0'; 
    let label = "No Reaction";

    if (reagent === 0) { 
        if (food < 0.5) { color = '#1a237e'; label="Blue-Black (Starch present)"; } 
        else { color = '#d4a017'; label="Brown (No Starch)"; }
    } else if (reagent === 1) { 
        if (food >= 0.5 && food < 1.5) { color = '#b71c1c'; label="Brick Red (Glucose present)"; } 
        else { color = '#2196f3'; label="Blue (No Glucose)"; }
    } else if (reagent === 2) { 
        if (food >= 1.5 && food < 2.5) { color = '#d32f2f'; label="Red Precipitate (Protein)"; } 
        else { color = '#eeeeee'; label="Clear (No Protein)"; }
    } else { 
        if (food >= 2.5) { color = '#fff9c4'; label="Cloudy/Emulsion (Fat)"; } 
        else { color = '#ffffff'; label="Clear (No Fat)"; }
    }

    return (
        <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
            <path d="M 80 50 L 80 150 Q 80 170 100 170 Q 120 170 120 150 L 120 50" stroke="gray" strokeWidth="2" fill="none" />
            <path d="M 82 100 L 82 150 Q 82 168 100 168 Q 118 168 118 150 L 118 100 Z" fill={color} />
            <text x="100" y="190" textAnchor="middle" fontSize="10" className="fill-slate-600 dark:fill-slate-300">{label}</text>
            <text x="100" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" className="fill-slate-800 dark:fill-slate-100">
                Test: {['Iodine', 'Benedict', 'Millon', 'Ethanol'][Math.round(reagent)]} on {['Bread', 'Apple', 'Egg', 'Oil'][Math.round(food)]}
            </text>
        </svg>
    )
  }

  const renderDiffusion = () => {
      const time = values.time || 0;
      const glucoseOutside = Math.min(20, Math.floor(time / 2));
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <path d="M 40 40 L 40 160 Q 40 180 100 180 Q 160 180 160 160 L 160 40" stroke="black" strokeWidth="2" fill="none" />
              <path d="M 45 60 L 45 160 Q 45 175 100 175 Q 155 175 155 160 L 155 60" fill="#e3f2fd" opacity="0.5" />
              <path d="M 80 20 L 80 140 Q 80 150 100 150 Q 120 150 120 140 L 120 20" stroke="orange" strokeWidth="2" fill="#fff3e0" opacity="0.8" />
              <circle cx="90" cy="100" r="6" fill="red" />
              <circle cx="110" cy="120" r="6" fill="red" />
              <circle cx="95" cy="80" r="6" fill="red" />
              <circle cx="100" cy="90" r="3" fill="blue" />
              <circle cx="90" cy="130" r="3" fill="blue" />
              {Array.from({length: glucoseOutside}).map((_, i) => (
                  <circle key={i} cx={50 + (i*17)%100} cy={100 + (i*23)%60} r="3" fill="blue" className="animate-pulse" />
              ))}
              <text x="100" y="195" textAnchor="middle" fontSize="10" fill="gray">Time: {time} min</text>
          </svg>
      )
  }

  const renderSolubility = () => {
      const temp = values.temp || 25;
      const stir = values.stir || 0;
      const rate = (temp + stir * 20) / 10;
      const progress = (tick * rate) % 500; 
      const opacity = Math.max(0, 1 - progress/300);

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
               <rect x="60" y="60" width="80" height="100" stroke="black" fill="#e1f5fe" />
               {stir > 0 && (
                   <line x1="100" y1="20" x2="100" y2="120" stroke="gray" strokeWidth="3">
                       <animateTransform attributeName="transform" type="rotate" from="0 100 20" to="360 100 20" dur={`${1.5 - stir/10}s`} repeatCount="indefinite" />
                   </line>
               )}
               <path d="M 80 150 Q 100 130 120 150 Z" fill="brown" opacity={opacity} />
               {Array.from({length: 10}).map((_, i) => (
                   <circle key={i} cx={70 + Math.random()*60} cy={70 + Math.random()*80} r="2" fill="brown" opacity={1-opacity} />
               ))}
               <text x="100" y="180" textAnchor="middle" fontSize="10">Temp: {temp}°C, Stir: {stir}</text>
          </svg>
      )
  }

  const renderElectromagnet = () => {
      const turns = values.turns || 5;
      const voltage = values.voltage || 1;
      const strength = turns * voltage;
      const clips = Math.min(10, Math.floor(strength / 5));

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <rect x="50" y="80" width="100" height="20" fill="gray" rx="5" />
              {Array.from({length: Math.floor(turns)}).map((_, i) => (
                  <path key={i} d={`M ${60 + i * (80/turns)} 80 Q ${65 + i * (80/turns)} 60 ${70 + i * (80/turns)} 80`} stroke="orange" strokeWidth="2" fill="none" />
              ))}
              <rect x="80" y="20" width="40" height="20" fill="black" />
              <text x="100" y="35" fill="white" fontSize="10" textAnchor="middle">{voltage}V</text>
              <line x1="50" y1="90" x2="50" y2="30" stroke="black" />
              <line x1="50" y1="30" x2="80" y2="30" stroke="black" />
              <line x1="150" y1="90" x2="150" y2="30" stroke="black" />
              <line x1="150" y1="30" x2="120" y2="30" stroke="black" />
              <g transform="translate(100, 110)">
                 {Array.from({length: clips}).map((_, i) => (
                     <path key={i} d={`M ${-10 + i*3} ${i*5} L ${-5 + i*3} ${10 + i*5}`} stroke="silver" strokeWidth="2" />
                 ))}
              </g>
              <text x="100" y="180" textAnchor="middle" fontSize="12">Clips Attracted: {clips}</text>
          </svg>
      )
  }

  const renderTropism = () => {
      const angle = values.angle || 90;
      const lightX = 20 + ((angle - 20) / 140) * 160;
      const lightY = 20;

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <circle cx={lightX} cy={lightY} r="15" fill="yellow" className="drop-shadow-lg" />
              <path d="M 80 160 L 120 160 L 115 190 L 85 190 Z" fill="brown" />
              <path d={`M 100 160 Q 100 120 ${100 + (angle-90)} 80`} stroke="green" strokeWidth="6" fill="none" />
              <circle cx={100 + (angle-90)} cy={80} r="10" fill="green" />
              <text x="100" y="195" textAnchor="middle" fontSize="10">Light Angle: {angle}°</text>
          </svg>
      )
  }

  const renderRespiration = () => {
      const diaphragm = values.diaphragm || 0;
      const balloonScale = 1 + diaphragm * 0.5;
      
      return (
          <svg viewBox="0 0 200 250" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <path d="M 50 200 L 50 50 Q 100 20 150 50 L 150 200" stroke="black" strokeWidth="2" fill="none" />
              <path d="M 100 40 L 100 80 L 80 100 M 100 80 L 120 100" stroke="gray" strokeWidth="4" fill="none" />
              <g transform={`translate(80, 100) scale(${balloonScale})`}>
                 <ellipse cx="0" cy="20" rx="15" ry="20" fill="pink" />
              </g>
              <g transform={`translate(120, 100) scale(${balloonScale})`}>
                 <ellipse cx="0" cy="20" rx="15" ry="20" fill="pink" />
              </g>
              <path d={`M 50 200 Q 100 ${200 + diaphragm * 30} 150 200`} stroke="brown" strokeWidth="3" fill="#d7ccc8" />
              <line x1="100" y1={200 + diaphragm * 15} x2="100" y2={230 + diaphragm * 30} stroke="black" strokeWidth="2" />
              <circle cx="100" cy={230 + diaphragm * 30} r="5" fill="black" />
              <text x="10" y="240" fontSize="10">{diaphragm > 0.5 ? 'Inhalation (Vol Up, Press Down)' : 'Exhalation'}</text>
          </svg>
      )
  }

  const renderTranspiration = () => {
      const wind = values.wind || 0;
      const speed = 1 + wind; 
      const bubblePos = (tick * speed) % 180;

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <path d="M 40 100 L 40 60 L 30 40 M 40 60 L 50 40" stroke="green" strokeWidth="2" />
              <circle cx="30" cy="40" r="5" fill="green" />
              <circle cx="50" cy="40" r="5" fill="green" />
              <path d="M 40 100 L 40 150 L 180 150" stroke="gray" strokeWidth="4" fill="none" />
              <line x1="40" y1="150" x2="180" y2="150" stroke="cyan" strokeWidth="2" />
              <circle cx={180 - bubblePos} cy="150" r="3" fill="white" stroke="black" />
              <line x1="60" y1="160" x2="180" y2="160" stroke="black" />
              {Array.from({length: 13}).map((_, i) => (
                  <line key={i} x1={60 + i*10} y1="160" x2={60 + i*10} y2="165" stroke="black" />
              ))}
              {wind > 0 && (
                  <g transform="translate(10, 40)">
                      <path d="M -10 -10 L 10 10 M -10 10 L 10 -10" stroke="blue" strokeWidth="2">
                          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur={`${1/wind}s`} repeatCount="indefinite" />
                      </path>
                      <text x="-10" y="25" fontSize="8">Fan</text>
                  </g>
              )}
          </svg>
      )
  }

  const renderExoEndo = () => {
      const type = values.chemical; 
      const isExo = type < 0.5;
      const temp = isExo ? 40 : 10;
      const color = isExo ? 'red' : 'blue';
      const label = isExo ? 'Heat Released (Hot)' : 'Heat Absorbed (Cold)';

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <rect x="60" y="60" width="80" height="100" stroke="black" fill={isExo ? '#ffcdd2' : '#e1f5fe'} />
              <rect x="95" y="40" width="10" height="100" fill="white" stroke="black" />
              <rect x="97" y={140 - temp*2} width="6" height={temp*2} fill="red" />
              <circle cx="100" cy="140" r="8" fill="red" />
              <text x="100" y="180" textAnchor="middle" fill={color} fontWeight="bold">{label}</text>
              <text x="100" y="30" textAnchor="middle" fontSize="12">{isExo ? 'NaOH + Water' : 'NH4NO3 + Water'}</text>
          </svg>
      )
  }

  const renderCircuitSP = () => {
      const isParallel = values.type > 0.5;
      const brightness = isParallel ? 1 : 0.5;
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <line x1="20" y1="100" x2="50" y2="100" stroke="black" />
              <rect x="50" y="90" width="5" height="20" fill="black" />
              <rect x="60" y="85" width="5" height="30" fill="black" />
              <line x1="65" y1="100" x2="180" y2="100" stroke="black" />
              <line x1="20" y1="100" x2="20" y2="50" stroke="black" />
              <line x1="180" y1="100" x2="180" y2="50" stroke="black" />

              {isParallel ? (
                  <g>
                      <line x1="20" y1="50" x2="180" y2="50" stroke="black" />
                      <line x1="20" y1="150" x2="180" y2="150" stroke="black" />
                      <line x1="20" y1="100" x2="20" y2="150" stroke="black" />
                      <line x1="180" y1="100" x2="180" y2="150" stroke="black" />
                      <circle cx="100" cy="50" r="10" stroke="black" fill={`rgba(255,255,0,${brightness})`} />
                      <circle cx="100" cy="150" r="10" stroke="black" fill={`rgba(255,255,0,${brightness})`} />
                  </g>
              ) : (
                  <g>
                      <line x1="20" y1="50" x2="180" y2="50" stroke="black" />
                      <circle cx="70" cy="50" r="10" stroke="black" fill={`rgba(255,255,0,${brightness})`} />
                      <circle cx="130" cy="50" r="10" stroke="black" fill={`rgba(255,255,0,${brightness})`} />
                  </g>
              )}
              <text x="100" y="190" textAnchor="middle" fontSize="12">{isParallel ? 'Parallel (Bright)' : 'Series (Dim)'}</text>
          </svg>
      )
  }

  const renderHeart = () => {
      const activity = values.activity || 0; 
      const bpm = 60 + activity * 12;
      const scale = 1 + (Math.sin(tick * (0.2 + activity/20)) * 0.1);

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
             <path transform={`translate(100, 100) scale(${scale}) translate(-100, -100)`} d="M 100 180 L 100 180 Q 50 130 50 80 A 25 25 0 0 1 100 80 A 25 25 0 0 1 150 80 Q 150 130 100 180 Z" fill="red" />
             <text x="100" y="190" textAnchor="middle" fontSize="16" fontWeight="bold" fill="black" className="dark:fill-white">{Math.round(bpm)} BPM</text>
             <text x="100" y="30" textAnchor="middle" fill="gray">{activity < 3 ? 'Resting' : 'Running'}</text>
          </svg>
      )
  }

  const renderTransformer = () => {
      const ratio = values.turnsRatio || 1; 
      const vOut = 100 * ratio;
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <rect x="50" y="50" width="100" height="100" stroke="gray" strokeWidth="10" fill="none" rx="5" />
              <g transform="translate(45, 60)">
                  <rect x="0" y="0" width="10" height="80" fill="orange" opacity="0.5" />
                  {Array.from({length: 8}).map((_, i) => (
                      <path key={i} d={`M 0 ${i*10} C 10 ${i*10+5} 10 ${i*10+5} 0 ${i*10+10}`} stroke="brown" fill="none"/>
                  ))}
                  <text x="-25" y="40" fontSize="10">Pri</text>
                  <text x="-35" y="55" fontSize="10">100V</text>
              </g>
              <g transform="translate(145, 60)">
                  <rect x="0" y="0" width="10" height="80" fill="orange" opacity="0.5" />
                  {Array.from({length: Math.round(8*ratio)}).map((_, i) => (
                      <path key={i} d={`M 0 ${i*(80/(8*ratio))} C -10 ${i*(80/(8*ratio))+2} -10 ${i*(80/(8*ratio))+2} 0 ${i*(80/(8*ratio))+5}`} stroke="brown" fill="none"/>
                  ))}
                  <text x="15" y="40" fontSize="10">Sec</text>
                  <text x="15" y="55" fontSize="10" fill={ratio > 1 ? 'red' : 'blue'}>{vOut.toFixed(0)}V</text>
              </g>
              <text x="100" y="180" textAnchor="middle" fontSize="12">
                  {ratio > 1 ? 'Step-Up' : ratio < 1 ? 'Step-Down' : 'Isolation'}
              </text>
          </svg>
      )
  }

  const renderTitration = () => {
      const vol = values.vol || 0;
      const endpoint = 25;
      // Below 25: Pink (Alkali + Phenolphthalein)
      // Above 25: Colorless (Neutral/Acidic)
      const isPink = vol < endpoint;
      const color = isPink ? '#f48fb1' : '#e0f7fa';
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              {/* Burette */}
              <rect x="90" y="10" width="20" height="80" stroke="black" fill="none" />
              <line x1="90" y1="80" x2="110" y2="80" stroke="black" />
              
              {/* Drops */}
              {tick % 20 < 10 && (
                  <circle cx="100" cy={90 + (tick%20)*2} r="3" fill="#e0f7fa" />
              )}
              
              {/* Flask */}
              <path d="M 80 120 L 70 180 L 130 180 L 120 120 L 110 100 L 90 100 L 80 120" stroke="black" strokeWidth="2" fill="none" />
              <path d="M 72 170 L 128 170 L 122 130 L 78 130 Z" fill={color} className="transition-colors duration-500" />
              
              <text x="100" y="195" textAnchor="middle" fontSize="12">{isPink ? 'Pink (Alkali)' : 'Colorless (Neutral)'}</text>
          </svg>
      )
  }

  const renderElectrolysis = () => {
      const on = values.switch > 0.5;
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              {/* Beaker */}
              <path d="M 50 60 L 50 160 L 150 160 L 150 60" stroke="black" strokeWidth="2" fill="none" />
              <rect x="50" y="100" width="100" height="60" fill="#bdbdbd" opacity="0.5" /> {/* Molten PbBr2 */}
              
              {/* Electrodes */}
              <rect x="70" y="40" width="10" height="100" fill="black" />
              <rect x="120" y="40" width="10" height="100" fill="black" />
              
              {/* Wire & Battery */}
              <polyline points="75,40 75,20 90,20" stroke="black" fill="none" />
              <polyline points="125,40 125,20 110,20" stroke="black" fill="none" />
              <rect x="90" y="15" width="20" height="10" fill={on ? 'green' : 'red'} />

              {/* Products */}
              {on && (
                  <g>
                      {/* Brown Gas at Anode (Left) */}
                      <circle cx="75" cy="130" r="3" fill="brown" className="animate-bounce" />
                      <circle cx="65" cy="120" r="4" fill="brown" className="animate-bounce" />
                      <text x="40" y="100" fontSize="10" fill="brown">Br₂ Gas</text>
                      
                      {/* Grey Solid at Cathode (Right) */}
                      <circle cx="125" cy="130" r="5" fill="gray" />
                      <circle cx="125" cy="120" r="5" fill="gray" />
                      <text x="140" y="100" fontSize="10" fill="gray">Pb Solid</text>
                  </g>
              )}
              <text x="100" y="180" textAnchor="middle" fontSize="12">Molten PbBr₂</text>
          </svg>
      )
  }

  const renderRateConc = () => {
      const conc = values.conc || 0.1; 
      // Higher conc = faster cloudiness.
      // Cloudiness (Opacity) increases with tick * conc.
      const opacity = Math.min(1, (tick * conc) / 50);

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
               {/* Paper with X */}
               <rect x="70" y="160" width="60" height="30" fill="white" stroke="black" />
               <line x1="90" y1="165" x2="110" y2="185" stroke="black" strokeWidth="2" />
               <line x1="110" y1="165" x2="90" y2="185" stroke="black" strokeWidth="2" />

               {/* Flask */}
               <path d="M 80 120 L 70 160 L 130 160 L 120 120 L 110 100 L 90 100 L 80 120" stroke="black" strokeWidth="2" fill="none" />
               
               {/* Solution */}
               <path d="M 72 158 L 128 158 L 122 130 L 78 130 Z" fill="#fff9c4" />
               
               {/* Precipitate Overlay */}
               <path d="M 72 158 L 128 158 L 122 130 L 78 130 Z" fill="yellow" opacity={opacity} />

               <text x="100" y="190" textAnchor="middle" fontSize="12">Conc: {conc} mol/dm³</text>
          </svg>
      )
  }

  const renderLatex = () => {
      const sub = values.substance; // 0=None, 1=Acid, 2=Alkali
      // 0: Liquid (particles separated)
      // 1: Solid (particles clumped)
      // 2: Liquid (particles separated)
      const isSolid = sub === 1;
      
      const particles = [];
      for(let i=0; i<15; i++) {
          let cx, cy;
          if (isSolid) {
              // Clumped in center
              cx = 100 + (Math.random()-0.5) * 40;
              cy = 100 + (Math.random()-0.5) * 40;
          } else {
              // Spread out
              cx = (tick + i * 30) % 180 + 10;
              cy = (tick + i * 20) % 180 + 10;
          }
          particles.push(<circle key={i} cx={cx} cy={cy} r="8" fill="white" stroke="black" />);
      }

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-lg">
              <rect x="0" y="0" width="200" height="200" fill={isSolid ? '#eeeeee' : '#ffffff'} opacity="0.5" />
              {particles}
              <text x="100" y="190" textAnchor="middle" fontSize="12" fill="black" className="dark:fill-white">
                  {sub === 1 ? 'Coagulated (Solid)' : 'Liquid Latex'}
              </text>
          </svg>
      )
  }
  
  // -- NEW BIOLOGY FORM 4 RENDERERS --

  const renderOsmosis = () => {
    const conc = values.concentration || 0.5; // 0=hypo, 0.5=iso, 1=hyper
    
    // Calculate cell wall bounds (static)
    const cwX = 60, cwY = 60, cwW = 80, cwH = 80;
    
    // Calculate protoplasm (cytoplasm+vacuole) size
    // Hypo: Expands (Turgid) -> fills cell
    // Iso: Normal -> fills cell but not tight
    // Hyper: Shrinks (Plasmolysis) -> pulls away
    
    let shrink = 0;
    if (conc > 0.5) {
        shrink = (conc - 0.5) * 30; // Max shrink 15px per side
    }
    
    return (
        <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
            {/* Cell Wall */}
            <rect x={cwX} y={cwY} width={cwW} height={cwH} stroke="green" strokeWidth="5" fill="#e0f2f1" rx="5" />
            
            {/* Plasma Membrane & Cytoplasm */}
            <rect 
                x={cwX + 5 + shrink} 
                y={cwY + 5 + shrink} 
                width={cwW - 10 - shrink*2} 
                height={cwH - 10 - shrink*2} 
                stroke="green" 
                strokeWidth="1" 
                fill="#b9f6ca" 
                className="transition-all duration-1000"
            />
            
            {/* Vacuole */}
            <rect 
                x={cwX + 15 + shrink} 
                y={cwY + 15 + shrink} 
                width={cwW - 30 - shrink*2} 
                height={cwH - 30 - shrink*2} 
                fill="#4db6ac" 
                className="transition-all duration-1000"
            />
            
            <text x="100" y="180" textAnchor="middle" fontSize="12">
                {conc < 0.4 ? 'Turgid (Hypo)' : conc > 0.6 ? 'Plasmolysed (Hyper)' : 'Flaccid (Iso)'}
            </text>
        </svg>
    )
  }

  const renderEnzyme = () => {
      const temp = values.temp || 30;
      // Activity: Bell curve peaking at 37
      const activity = Math.max(0, 1 - Math.abs(temp - 37) / 37);
      const speed = activity * 5 + 0.5; 
      const isDenatured = temp > 55;
      
      const enzymes = [];
      for(let i=0; i<5; i++) {
          const x = (tick * speed + i * 40) % 200;
          const y = 50 + i * 20;
          
          enzymes.push(
            <g key={i} transform={`translate(${x}, ${y})`}>
                {/* Pacman shape Enzyme */}
                {isDenatured ? (
                    <path d="M 0 0 L 10 -5 L 10 5 Z" fill="gray" /> // Broken shape
                ) : (
                    <path d="M 0 0 A 10 10 0 1 1 0 10 L 5 5 Z" fill="purple" />
                )}
                {/* Substrate */}
                {!isDenatured && <circle cx="15" cy="5" r="3" fill="orange" />}
            </g>
          );
      }
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              {enzymes}
              <text x="100" y="180" textAnchor="middle" fontSize="12" fill={isDenatured ? 'red' : 'black'} className="dark:fill-slate-200">
                  {isDenatured ? 'Denatured (Inactive)' : `Activity: ${(activity*100).toFixed(0)}%`}
              </text>
          </svg>
      )
  }

  const renderYeast = () => {
      const glucose = values.glucose || 0;
      // More glucose = bigger balloon, more bubbles
      const bubbleCount = Math.floor(glucose * 2);
      const balloonScale = 1 + glucose * 0.2;
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              {/* Bottle */}
              <path d="M 80 180 L 80 120 L 90 100 L 90 80 L 110 80 L 110 100 L 120 120 L 120 180 Z" stroke="black" fill="#fff9c4" />
              
              {/* Bubbles */}
              <clipPath id="bottleClip">
                 <path d="M 80 180 L 80 120 L 90 100 L 90 80 L 110 80 L 110 100 L 120 120 L 120 180 Z" />
              </clipPath>
              <g clipPath="url(#bottleClip)">
                  {Array.from({length: bubbleCount}).map((_, i) => (
                      <circle key={i} cx={85 + Math.random()*30} cy={120 + (tick*2 + i*20)%60} r="2" fill="white" stroke="gray" />
                  ))}
              </g>

              {/* Balloon */}
              <g transform={`translate(100, 80) scale(${balloonScale}) translate(-100, -80)`}>
                 <path d="M 90 80 C 70 50 70 20 100 10 C 130 20 130 50 110 80 Z" fill="orange" opacity="0.8" />
              </g>
              
              <text x="100" y="195" textAnchor="middle" fontSize="12">CO₂ Production</text>
          </svg>
      )
  }

  const renderCalorimetry = () => {
      const food = values.foodType || 0; // 0:Peanut, 1:Bread, 2:Anchovy
      // Energy: Peanut (High), Anchovy (Med), Bread (Low)
      const energyMap = [3, 1, 2]; 
      const energy = energyMap[Math.round(food)];
      
      const tempRise = Math.min(100, tick * 0.5 * energy); // simulate heating
      const flameSize = energy * 5;

      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              {/* Stand */}
              <rect x="50" y="150" width="100" height="10" fill="gray" />
              <line x1="100" y1="150" x2="100" y2="50" stroke="black" />
              
              {/* Boiling Tube */}
              <rect x="90" y="50" width="20" height="60" stroke="black" fill="none" />
              <rect x="90" y="90" width="20" height="20" fill="blue" opacity="0.3" /> {/* Water */}
              
              {/* Thermometer */}
              <rect x="98" y="30" width="4" height="80" fill="white" stroke="black" />
              <rect x="99" y={110 - tempRise/2} width="2" height={tempRise/2} fill="red" />
              
              {/* Food & Flame */}
              <circle cx="100" cy="140" r="5" fill="brown" />
              {tick % 20 < 10 && (
                   <path d={`M 100 135 L ${100-flameSize/2} 125 Q 100 110 ${100+flameSize/2} 125 Z`} fill="orange" />
              )}
              
              <text x="150" y="50" fontSize="12">{tempRise.toFixed(0)}°C Rise</text>
              <text x="100" y="190" textAnchor="middle" fontSize="12">Burning: {['Peanut', 'Bread', 'Anchovy'][Math.round(food)]}</text>
          </svg>
      )
  }
  
  // -- NEW FORM 5 RENDERERS --
  
  const renderInheritance = () => {
      const p1 = Math.round(values.p1 || 0);
      const p2 = Math.round(values.p2 || 0);
      
      const getGeno = (v: number) => v === 0 ? ['T','T'] : v === 1 ? ['T','t'] : ['t','t'];
      const g1 = getGeno(p1);
      const g2 = getGeno(p2);
      
      const offspring = [
          [g1[0], g2[0]], [g1[1], g2[0]],
          [g1[0], g2[1]], [g1[1], g2[1]]
      ];
      
      const isTall = (g: string[]) => g.includes('T');
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
             {/* Punnett Square */}
             <rect x="50" y="50" width="100" height="100" stroke="black" fill="none" />
             <line x1="100" y1="50" x2="100" y2="150" stroke="black" />
             <line x1="50" y1="100" x2="150" y2="100" stroke="black" />
             
             {/* Parents Labels */}
             <text x="75" y="40" textAnchor="middle">{g1[0]}</text>
             <text x="125" y="40" textAnchor="middle">{g1[1]}</text>
             <text x="40" y="75" textAnchor="middle">{g2[0]}</text>
             <text x="40" y="125" textAnchor="middle">{g2[1]}</text>
             
             {/* Offspring Visuals */}
             {offspring.map((o, i) => {
                 const x = i % 2 === 0 ? 75 : 125;
                 const y = i < 2 ? 75 : 125;
                 const tall = isTall(o);
                 return (
                     <g key={i} transform={`translate(${x}, ${y})`}>
                         <text y="5" textAnchor="middle" fontSize="10">{o.join('')}</text>
                         <rect x="-5" y="10" width="10" height={tall ? 30 : 15} fill="green" />
                         <circle cx="0" cy={10} r="5" fill="green" />
                     </g>
                 )
             })}
          </svg>
      );
  }

  const renderTranslocation = () => {
      const time = values.time || 0;
      const bulgeSize = Math.min(15, time * 4);
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <defs>
                  <pattern id="bark" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 0 0 L 0 10 M 5 0 L 5 10" stroke="#795548" strokeWidth="1" />
                  </pattern>
              </defs>
              
              {/* Tree Trunk Upper */}
              <path d={`M 80 20 L 120 20 L ${120+bulgeSize} 90 L ${80-bulgeSize} 90 Z`} fill="url(#bark)" stroke="brown" />
              
              {/* Ring Area (Exposed Xylem) */}
              <rect x="85" y="90" width="30" height="20" fill="#fff3e0" stroke="none" />
              <line x1="85" y1="90" x2="85" y2="110" stroke="brown" />
              <line x1="115" y1="90" x2="115" y2="110" stroke="brown" />
              
              {/* Tree Trunk Lower */}
              <rect x="80" y="110" width="40" height="80" fill="url(#bark)" stroke="brown" />
              
              <text x="150" y="90" fontSize="10" fill="red">{bulgeSize > 5 ? 'Swelling' : ''}</text>
              <text x="30" y="100" fontSize="10" fill="gray">Ring</text>
              <text x="100" y="195" textAnchor="middle" fontSize="12">Week: {time}</text>
          </svg>
      );
  }
  
  const renderPollution = () => {
      const sewage = values.sewage || 0;
      const algaeCount = Math.floor(sewage * 5);
      const fishCount = Math.max(0, 5 - Math.floor(sewage / 2));
      const oxy = Math.max(0, 100 - sewage * 10);
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-sky-100 dark:bg-slate-800 rounded-lg">
              {/* Water */}
              <rect x="0" y="50" width="200" height="150" fill={sewage > 5 ? '#aed581' : '#4fc3f7'} opacity="0.6" />
              
              {/* Algae */}
              {Array.from({length: algaeCount}).map((_, i) => (
                  <circle key={i} cx={Math.random()*200} cy={50 + Math.random()*20} r="3" fill="green" />
              ))}
              
              {/* Fish */}
              {Array.from({length: fishCount}).map((_, i) => (
                  <path key={`f${i}`} d="M 0 0 L 15 5 L 0 10 L 5 5 Z" fill="orange" transform={`translate(${20 + i*30}, ${100 + Math.sin(tick/20 + i)*20})`} />
              ))}
              
              {fishCount === 0 && (
                 <path d="M 100 150 L 115 155 L 100 160 L 105 155 Z" fill="gray" transform="rotate(180 100 150)" />
              )}
              
              <text x="100" y="30" textAnchor="middle" fontSize="12" fontWeight="bold">Dissolved Oxygen: {oxy}%</text>
          </svg>
      )
  }

  const renderElasticity = () => {
      const mass = values.mass || 0;
      const k = values.k || 5;
      const ext = (mass * 9.8) / k;
      const length = 50 + ext * 2;
      
      return (
          <svg viewBox="0 0 200 250" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <rect x="80" y="10" width="40" height="10" fill="gray" />
              {/* Spring */}
              <path d={`M 100 20 L 100 ${20+length}`} stroke="black" strokeWidth="2" strokeDasharray="5,5" fill="none" />
              
              {/* Mass */}
              <rect x="90" y={20+length} width="20" height="20" fill="blue" />
              <text x="100" y={35+length} textAnchor="middle" fill="white" fontSize="10">{mass}kg</text>
              
              {/* Ruler */}
              <g transform="translate(140, 20)">
                  <line x1="0" y1="0" x2="0" y2="200" stroke="black" />
                  {Array.from({length: 11}).map((_, i) => (
                      <line key={i} x1="0" y1={i*20} x2="10" y2={i*20} stroke="black" />
                  ))}
                  <text x="15" y={length} fill="red" fontSize="12">{ext.toFixed(1)}m</text>
              </g>
          </svg>
      )
  }
  
  const renderPressure = () => {
      const depth = values.depth || 10;
      const maxDepth = 100;
      const pressure = depth * 0.5; // dummy multiplier
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              <rect x="50" y="20" width="60" height="160" stroke="black" fill="none" />
              <rect x="50" y="40" width="60" height="140" fill="#4fc3f7" opacity="0.5" />
              
              {/* Spurt */}
              <path d={`M 110 ${40 + depth} Q ${110 + pressure*2} ${40 + depth + 10} ${110 + pressure*3} 180`} stroke="blue" strokeWidth="2" fill="none" />
              
              <circle cx="110" cy={40+depth} r="3" fill="black" />
              <text x="10" y={45+depth} fontSize="10">h={depth}</text>
          </svg>
      )
  }
  
  const renderDecay = () => {
      const halfLife = values.halfLife || 5;
      const t = tick / 60; // seconds approx
      const remaining = Math.pow(0.5, t / halfLife);
      const atomCount = 100;
      const activeCount = Math.floor(atomCount * remaining);
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-slate-900 rounded-lg">
              {Array.from({length: atomCount}).map((_, i) => {
                  const isActive = i < activeCount;
                  const x = (i % 10) * 18 + 20;
                  const y = Math.floor(i / 10) * 18 + 20;
                  return (
                      <circle key={i} cx={x} cy={y} r="5" fill={isActive ? 'yellow' : 'gray'} className={isActive ? 'animate-pulse' : ''} />
                  )
              })}
              <text x="100" y="190" fill="white" textAnchor="middle">Remaining: {(remaining*100).toFixed(0)}%</text>
          </svg>
      )
  }
  
  const renderRusting = () => {
      const cond = values.condition; // 0=Tap, 1=Dry, 2=Boiled, 3=Salt
      const speed = cond === 3 ? 2 : cond === 1 || cond === 2 ? 0 : 0.5;
      const rustAmount = Math.min(60, tick * speed * 0.1);
      
      const waterColor = cond === 3 ? '#b3e5fc' : '#e1f5fe';
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              {/* Test Tube */}
              <path d="M 80 20 L 80 160 Q 80 180 100 180 Q 120 180 120 160 L 120 20" stroke="black" fill="none" />
              
              {/* Contents */}
              {cond !== 1 && (
                  <path d="M 80 60 L 80 160 Q 80 180 100 180 Q 120 180 120 160 L 120 60" fill={waterColor} opacity="0.6" />
              )}
              {cond === 2 && ( // Oil layer
                  <rect x="80" y="55" width="40" height="5" fill="yellow" opacity="0.8" />
              )}
              {cond === 1 && ( // Calcium Chloride
                   <rect x="80" y="160" width="40" height="15" fill="white" stroke="gray" />
              )}
              
              {/* Nail */}
              <rect x="95" y="70" width="10" height="80" fill="gray" />
              <polygon points="95,150 105,150 100,160" fill="gray" />
              
              {/* Rust */}
              {rustAmount > 0 && (
                  <g>
                      {Array.from({length: Math.floor(rustAmount)}).map((_, i) => (
                          <circle key={i} cx={95 + Math.random()*10} cy={70 + Math.random()*80} r="2" fill="brown" />
                      ))}
                  </g>
              )}
              
              <text x="100" y="195" textAnchor="middle" fontSize="12">
                  {cond === 1 ? 'No Rust' : cond === 2 ? 'No Rust' : 'Rusting'}
              </text>
          </svg>
      )
  }
  
  const renderSoap = () => {
      const soap = values.soap > 0.5;
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
              {/* Water */}
              <rect x="0" y="50" width="200" height="150" fill="#e1f5fe" />
              
              {/* Fabric */}
              <rect x="20" y="150" width="160" height="10" fill="gray" />
              
              {/* Grease */}
              <path d="M 80 150 Q 100 120 120 150 Z" fill="#795548" className={soap ? "animate-bounce" : ""} />
              
              {soap && (
                  <g>
                      {/* Soap Molecules */}
                      {Array.from({length: 10}).map((_, i) => {
                          const angle = (i / 10) * Math.PI;
                          const x = 100 + Math.cos(angle) * 30;
                          const y = 140 - Math.sin(angle) * 30;
                          return (
                              <line key={i} x1={x} y1={y} x2="100" y2="140" stroke="blue" strokeWidth="2" />
                          )
                      })}
                      <circle cx="100" cy="140" r="15" fill="#795548" opacity="0.5" />
                  </g>
              )}
              <text x="100" y="30" textAnchor="middle">{soap ? 'Micelle Formation' : 'Grease Stuck'}</text>
          </svg>
      )
  }
  
  const renderEster = () => {
      const heat = values.heat || 0;
      const progress = Math.min(100, tick * heat * 0.05);
      
      return (
          <svg viewBox="0 0 200 200" className="w-full h-full bg-white dark:bg-slate-800 rounded-lg">
               {/* Beaker */}
               <path d="M 60 60 L 60 160 L 140 160 L 140 60" stroke="black" fill="none" strokeWidth="2" />
               <rect x="60" y="100" width="80" height="60" fill={progress > 50 ? '#f8bbd0' : '#e1f5fe'} opacity="0.5" />
               
               {/* Heat Source */}
               {heat > 0 && (
                   <polygon points="90,180 100,165 110,180" fill="orange" className="animate-pulse" />
               )}
               
               {/* Vapour/Smell */}
               {progress > 80 && (
                   <g>
                       <text x="100" y="40" textAnchor="middle" fontSize="14" fill="purple">Sweet Smell!</text>
                       <path d="M 80 50 Q 90 30 100 50 T 120 50" stroke="purple" fill="none" opacity="0.5" />
                   </g>
               )}
               
               <text x="100" y="190" textAnchor="middle" fontSize="12">Temp: {heat * 10}°C</text>
          </svg>
      )
  }

  const renderGeneric = () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400">
          Simulation Not Available
      </div>
  );

  switch (type) {
    case 'shadow': return renderShadow();
    case 'ph': return renderPH();
    case 'growth': return renderGrowth();
    case 'cell': return renderCell();
    case 'states': return renderStates();
    case 'density': return renderDensity();
    case 'circuit': return renderCircuit();
    case 'lens': return renderLens();
    case 'foodTest': return renderFoodTest();
    case 'diffusion': return renderDiffusion();
    case 'solubility': return renderSolubility();
    case 'electromagnet': return renderElectromagnet();
    case 'tropism': return renderTropism();
    case 'respiration': return renderRespiration();
    case 'transpiration': return renderTranspiration();
    case 'exoEndo': return renderExoEndo();
    case 'circuitSP': return renderCircuitSP();
    case 'heart': return renderHeart();
    case 'transformer': return renderTransformer();
    case 'titration': return renderTitration();
    case 'electrolysis': return renderElectrolysis();
    case 'rateConc': return renderRateConc();
    case 'latex': return renderLatex();
    case 'osmosis': return renderOsmosis();
    case 'enzyme': return renderEnzyme();
    case 'yeast': return renderYeast();
    case 'calorimetry': return renderCalorimetry();
    // New
    case 'inheritance': return renderInheritance();
    case 'translocation': return renderTranslocation();
    case 'pollution': return renderPollution();
    case 'elasticity': return renderElasticity();
    case 'pressure': return renderPressure();
    case 'decay': return renderDecay();
    case 'rusting': return renderRusting();
    case 'soap': return renderSoap();
    case 'ester': return renderEster();
    default: return renderGeneric();
  }
};
