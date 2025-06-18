import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ScoreRangeData {
  range: string;
  label: string;
  description: string;
  examples: string[];
  color: string;
  bgColor: string;
  hoverColor: string;
}

const scoreRanges: ScoreRangeData[] = [
  {
    range: '1.0-1.9',
    label: 'Beginner-friendly',
    description: 'Anyone can use without crypto knowledge',
    examples: ['Revolut Crypto', 'Cash App Bitcoin', 'PayPal Crypto'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '2.0-2.9',
    label: 'Accessible',
    description: 'Basic crypto familiarity is useful',
    examples: ['Binance', 'Coinbase', 'Kraken', 'Gemini'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '3.0-3.9',
    label: 'Crypto-leaning',
    description: 'Basic crypto concepts required',
    examples: ['Argent', 'Phantom', 'Farcaster'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '4.0-4.9',
    label: 'Moderate',
    description: 'Moderate crypto experience needed',
    examples: ['MetaMask', 'OpenSea', 'ENS'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '5.0-5.9',
    label: 'DeFi-focused',
    description: 'DeFi knowledge required',
    examples: ['Uniswap', 'PancakeSwap', 'Jupiter', '1inch'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '6.0-6.9',
    label: 'High-friction',
    description: 'Advanced crypto expertise needed',
    examples: ['dYdX', 'Hyperliquid', 'Synthetix'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '7.0-7.9',
    label: 'Advanced',
    description: 'Deep DeFi/protocol knowledge',
    examples: ['Aave', 'Curve', 'MakerDAO', 'Lido'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '8.0-8.9',
    label: 'Infra-heavy',
    description: 'Technical infra focus',
    examples: ['Alchemy', 'Chainlink', 'Etherscan', 'Dune'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '9.0-9.9',
    label: 'Protocol-layer',
    description: 'Protocol development expertise',
    examples: ['Arbitrum', 'Solana', 'StarkNet', 'zkSync'],
    color: 'text-win98-teal',
    bgColor: 'bg-win98-gray-light',
    hoverColor: 'hover:bg-win98-gray-light'
  },
  {
    range: '10.0-10.0',
    label: 'Gigachad-layer',
    description: 'Cutting-edge research level',
    examples: ['Foundry', 'Hardhat', 'Aztec', 'Flashbots'],
    color: 'text-win98-black',
    bgColor: 'bg-win98-gray',
    hoverColor: 'hover:bg-win98-gray-light'
  }
];

const Explore: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (range: string) => {
    navigate(`/results/${range}`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 win98-gradient-text font-win98">
          Score Analysis & Insights
        </h1>
        <p className="text-base text-win98-gray-dark max-w-2xl mx-auto font-win98">
          Explore each Friction Index score to see its analysis. Click any card for details.
        </p>
      </div>

      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {scoreRanges.map((scoreRange) => (
            <div
              key={scoreRange.range}
              onClick={() => handleCardClick(scoreRange.range)}
              className={`win98-window p-6 cursor-pointer transition-all duration-300 ${scoreRange.hoverColor} hover:shadow-win98-window`}
            >
              <div className="win98-title-bar mb-4 -mx-6 -mt-6">
                <span>{scoreRange.range} - {scoreRange.label}</span>
              </div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-win98-black font-win98">
                    {scoreRange.range}
                  </span>
                  <div className="w-3 h-3 win98-gradient-bg"></div>
                </div>
                <ExternalLink size={14} className="text-win98-gray-dark" />
              </div>
              
              <h3 className={`text-base font-bold mb-2 ${scoreRange.color} font-win98`}>
                {scoreRange.label}
              </h3>
              
              <p className="text-win98-black text-sm mb-4 leading-relaxed font-win98">
                {scoreRange.description}
              </p>
              
              <div className="text-xs text-win98-gray-dark font-win98">
                <span className="font-bold">Examples: </span>
                {scoreRange.examples.join(', ')}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="win98-button inline-flex items-center gap-2 text-sm font-bold"
          >
            <ArrowLeft size={16} />
            Back to Introduction
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-win98-gray-dark font-win98">
        vibe coded with sweat, teardrops and zero coding skills by <a href="https://x.com/zeroXserdar" target="_blank" className="font-bold text-win98-teal hover:underline">@zeroXserdar</a>
      </div>
    </div>
  );
};

export default Explore;