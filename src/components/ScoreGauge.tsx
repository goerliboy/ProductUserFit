import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = React.memo(({ score }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const renderGauge = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const size = canvas.width;
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size * 0.4;
      const thickness = size * 0.04;
      
      ctx.clearRect(0, 0, size, size);
      
      // Draw background arc (gray)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 2.25, false);
      ctx.lineWidth = thickness;
      ctx.strokeStyle = isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)';
      ctx.stroke();
      
      // Calculate score percentage and angle
      const scorePercentage = (score - 1) / 9;
      const scoreAngle = (Math.PI * 1.5) * scorePercentage;
      
      // Create gradient for the score arc
      const gradient = ctx.createLinearGradient(
        centerX - radius,
        centerY - radius,
        centerX + radius,
        centerY + radius
      );
      
      // Add color stops for gradient (green to red)
      gradient.addColorStop(0, 'rgb(34, 197, 94)');  // Green
      gradient.addColorStop(1, 'rgb(239, 68, 68)');  // Red
      
      // Draw score arc with gradient
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 0.75 + scoreAngle, false);
      ctx.lineWidth = thickness;
      ctx.strokeStyle = gradient;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Draw score text
      ctx.font = `bold ${size * 0.2}px sans-serif`;
      ctx.fillStyle = isDarkMode ? 'white' : '#111827';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(score.toString(), centerX, centerY - 10);
      
      // Draw "out of 10" text
      ctx.font = `${size * 0.08}px sans-serif`;
      ctx.fillStyle = isDarkMode ? '#9CA3AF' : '#6B7280';
      ctx.fillText('out of 10', centerX, centerY + 20);
    };

    renderGauge();
    
    // Debounce the re-render on theme changes
    const debounceRender = setTimeout(renderGauge, 100);
    return () => clearTimeout(debounceRender);
  }, [score, isDarkMode]);
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <canvas 
        ref={canvasRef} 
        width={200} 
        height={200}
        className="w-full h-full"
      />
    </div>
  );
});

export default ScoreGauge;