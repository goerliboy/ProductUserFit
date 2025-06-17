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
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/20'
  },
  {
    range: '2.0-2.9',
    label: 'Accessible',
    description: 'Basic crypto familiarity is useful',
    examples: ['Binance', 'Coinbase', 'Kraken', 'Gemini'],
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/20'
  },
  {
    range: '3.0-3.9',
    label: 'Crypto-leaning',
    description: 'Basic crypto concepts required',
    examples: ['Argent', 'Phantom', 'Farcaster'],
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    hoverColor: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
  },
  {
    range: '4.0-4.9',
    label: 'Moderate',
    description: 'Moderate crypto experience needed',
    examples: ['MetaMask', 'OpenSea', 'ENS'],
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
  },
  {
    range: '5.0-5.9',
    label: 'DeFi-focused',
    description: 'DeFi knowledge required',
    examples: ['Uniswap', 'PancakeSwap', 'Jupiter', '1inch'],
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    hoverColor: 'hover:bg-red-50 dark:hover:bg-red-900/20'
  },
  {
    range: '6.0-6.9',
    label: 'High-friction',
    description: 'Advanced crypto expertise needed',
    examples: ['dYdX', 'Hyperliquid', 'Synthetix'],
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    hoverColor: 'hover:bg-red-50 dark:hover:bg-red-900/20'
  },
  {
    range: '7.0-7.9',
    label: 'Advanced',
    description: 'Deep DeFi/protocol knowledge',
    examples: ['Aave', 'Curve', 'MakerDAO', 'Lido'],
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
  },
  {
    range: '8.0-8.9',
    label: 'Infra-heavy',
    description: 'Technical infra focus',
    examples: ['Alchemy', 'Chainlink', 'Etherscan', 'Dune'],
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
  },
  {
    range: '9.0-9.9',
    label: 'Protocol-layer',
    description: 'Protocol development expertise',
    examples: ['Arbitrum', 'Solana', 'StarkNet', 'zkSync'],
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    hoverColor: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
  },
  {
    range: '10.0-10.0',
    label: 'Gigachad-layer',
    description: 'Cutting-edge research level',
    examples: ['Foundry', 'Hardhat', 'Aztec', 'Flashbots'],
    color: 'text-gray-800 dark:text-gray-200',
    bgColor: 'bg-gray-100 dark:bg-gray-800/30',
    hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-700/20'
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Score Analysis For All
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore each Friction Index score to see its analysis. Click any card for details.
        </p>
      </div>

      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {scoreRanges.map((scoreRange) => (
            <div
              key={scoreRange.range}
              onClick={() => handleCardClick(scoreRange.range)}
              className={`bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700/50 cursor-pointer transition-all duration-300 ${scoreRange.hoverColor} hover:shadow-xl hover:scale-[1.02] backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-800 dark:text-white">
                    {scoreRange.range}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${scoreRange.bgColor.replace('bg-', 'bg-').replace('/30', '').replace('/20', '')}`}></div>
                </div>
                <ExternalLink size={16} className="text-gray-400 dark:text-gray-500" />
              </div>
              
              <h3 className={`text-lg font-semibold mb-2 ${scoreRange.color}`}>
                {scoreRange.label}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {scoreRange.description}
              </p>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Examples: </span>
                {scoreRange.examples.join(', ')}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-indigo-500/20"
          >
            <ArrowLeft size={18} />
            Back to Introduction
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-lg text-gray-500 dark:text-gray-400">
        vibe coded with sweat, teardrops and zero coding skills by <a href="https://x.com/zeroXserdar" target="_blank" className="font-bold hover:text-indigo-500 transition-colors">@zeroXserdar</a>
      </div>
    </div>
  );
};

export default Explore;