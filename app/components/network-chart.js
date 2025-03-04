'use client';

import { useEffect, useRef } from 'react';

export default function NetworkChart({ connections }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!connections || connections.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up the center node (user)
    const centerX = width / 2;
    const centerY = height / 2;
    const nodeRadius = 20;
    const connectionRadius = 10;

    // Draw center node
    ctx.beginPath();
    ctx.arc(centerX, centerY, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#3b82f6'; // blue-500
    ctx.fill();
    ctx.strokeStyle = '#1d4ed8'; // blue-700
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw connections
    const connectionCount = Math.min(connections.length, 15); // Limit to 15 connections for visualization
    const angleStep = (2 * Math.PI) / connectionCount;

    for (let i = 0; i < connectionCount; i++) {
      const angle = i * angleStep;
      const distance = 120; // Distance from center
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Draw connection node
      ctx.beginPath();
      ctx.arc(x, y, connectionRadius, 0, 2 * Math.PI);
      
      // Color by industry
      const industry = connections[i].industry || '';
      let color = '#9ca3af'; // gray-400 default
      
      if (industry.includes('Technology')) color = '#3b82f6'; // blue-500
      else if (industry.includes('Marketing')) color = '#ef4444'; // red-500
      else if (industry.includes('Design')) color = '#8b5cf6'; // purple-500
      else if (industry.includes('Finance')) color = '#10b981'; // emerald-500
      else if (industry.includes('Healthcare')) color = '#f59e0b'; // amber-500
      
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw connection line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#d1d5db'; // gray-300
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [connections]);

  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={400} 
      className="w-full h-auto max-w-md mx-auto"
    />
  );
}
