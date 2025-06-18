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
        color: "text-win98-teal"
      };
    } else if (score <= 4) {
      return {
        level: "Crypto Curious",
        description: "Basic crypto familiarity required",
        color: "text-win98-teal"
      };
    } else if (score <= 6) {
      return {
        level: "Crypto Experienced",
        description: "Moderate crypto expertise needed",
        color: "text-win98-teal"
      };
    } else if (score <= 8) {
      return {
        level: "Crypto Native",
        description: "Advanced crypto knowledge required",
        color: "text-win98-teal"
      };
    } else {
      return {
        level: "Crypto Expert",
        description: "Deep technical expertise essential",
        color: "text-win98-teal"
      };
    }
  };

  const scoreInfo = getScoreDescription(selectedScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="win98-outset p-2 bg-win98-gray">
            <Slider size={20} className="text-win98-black" />
          </div>
          <h2 className="text-xl font-bold text-win98-black font-win98">Interactive Score Explorer</h2>
        </div>
        <p className="text-win98-gray-dark max-w-2xl mx-auto font-win98 text-sm">
          Use the slider to explore how the analysis changes for each score in real-time.
        </p>
      </div>

      {/* Score Slider */}
      <div className="win98-window p-6">
        <div className="win98-title-bar mb-4 -mx-6 -mt-6">
          <span>Score Explorer</span>
        </div>
        
        <div className="space-y-6">
          {/* Current Score Display */}
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 win98-inset bg-white ${isAnimating ? 'animate-pulse' : ''}`}>
              <span className="text-xl font-bold win98-gradient-text font-win98">
                {selectedScore.toFixed(1)}
              </span>
              <span className="text-sm text-win98-gray-dark font-win98">/ 10</span>
            </div>
            <div className="mt-2">
              <span className={`text-base font-bold ${scoreInfo.color} font-win98`}>
                {scoreInfo.level}
              </span>
              <p className="text-sm text-win98-gray-dark mt-1 font-win98">
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
              className="win98-slider w-full"
            />
            
            {/* Score markers */}
            <div className="flex justify-between mt-2 text-xs text-win98-gray-dark font-win98">
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
          <div className="win98-inset bg-win98-gray-light p-4">
            <div className="flex items-start gap-3">
              <Info size={16} className="text-win98-teal flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-win98-black mb-1 font-win98 text-sm">
                  Score Range: {currentScoreRange}
                </p>
                <p className="text-xs text-win98-gray-dark font-win98">
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