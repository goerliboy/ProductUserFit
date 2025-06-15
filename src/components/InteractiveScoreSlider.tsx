import React, { useState } from 'react';
import { Sliders as Slider, Info } from 'lucide-react';
import { getScoreRangeString } from '../utils/scoreUtils';

interface InteractiveScoreSliderProps {
  initialScore?: number;
  onScoreChange?: (score: number) => void;
}

const InteractiveScoreSlider: React.FC<InteractiveScoreSliderProps> = ({ 
  initialScore = 5.5, 
  onScoreChange 
}) => {
  const [selectedScore, setSelectedScore] = useState(initialScore);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentScoreRange = getScoreRangeString(selectedScore);

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = parseFloat(event.target.value);
    setSelectedScore(newScore);
    setIsAnimating(true);
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
    
    if (onScoreChange) {
      onScoreChange(newScore);
    }
  };

  // Score level descriptions
  const getScoreDescription = (score: number): { level: string; description: string; color: string } => {
    if (score <= 2) {
      return {
        level: "Mainstream Ready",
        description: "Anyone can use this product without crypto knowledge",
        color: "text-green-600 dark:text-green-400"
      };
    } else if (score <= 4) {
      return {
        level: "Crypto Curious",
        description: "Basic crypto familiarity required",
        color: "text-blue-600 dark:text-blue-400"
      };
    } else if (score <= 6) {
      return {
        level: "Crypto Experienced",
        description: "Moderate crypto expertise needed",
        color: "text-yellow-600 dark:text-yellow-400"
      };
    } else if (score <= 8) {
      return {
        level: "Crypto Native",
        description: "Advanced crypto knowledge required",
        color: "text-orange-600 dark:text-orange-400"
      };
    } else {
      return {
        level: "Crypto Expert",
        description: "Deep technical expertise essential",
        color: "text-red-600 dark:text-red-400"
      };
    }
  };

  const scoreInfo = getScoreDescription(selectedScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30">
            <Slider size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary dark:text-white">Interactive Score Explorer</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Use the slider to explore how the analysis changes for each score in real-time.
        </p>
      </div>

      {/* Score Slider */}
      <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg border border-gray-100 dark:border-gray-700/50">
        <div className="space-y-6">
          {/* Current Score Display */}
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700/50 ${isAnimating ? 'scale-105' : ''} transition-transform duration-300`}>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {selectedScore.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300">/ 10</span>
            </div>
            <div className="mt-2">
              <span className={`text-lg font-semibold ${scoreInfo.color}`}>
                {scoreInfo.level}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {scoreInfo.description}
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={selectedScore}
              onChange={handleScoreChange}
              className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 via-orange-200 to-red-200 dark:from-green-800 dark:via-yellow-800 dark:via-orange-800 dark:to-red-800 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, 
                  #10b981 0%, #10b981 20%, 
                  #3b82f6 20%, #3b82f6 40%, 
                  #eab308 40%, #eab308 60%, 
                  #f97316 60%, #f97316 80%, 
                  #ef4444 80%, #ef4444 100%)`
              }}
            />
            
            {/* Score markers */}
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
          </div>

          {/* Score Range Info */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                  Score Range: {currentScoreRange}
                </p>
                <p className="text-sm text-purple-700 dark:text-purple-200">
                  Use the slider above to see how all analysis sections below change based on different complexity levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveScoreSlider;