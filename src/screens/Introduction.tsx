import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalyzer } from '../context/AnalyzerContext';

const Introduction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Product-User Fit Framework
        </h1>
        <p className="text-lg italic text-indigo-600 dark:text-indigo-300">
          Find out who actually gets your crypto product.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 md:p-8 shadow-lg dark:backdrop-blur-sm max-w-2xl">
        <p className="text-base mb-6 leading-relaxed text-gray-600 dark:text-white">
          Introducing <span className="font-semibold">Product-User Fit Framework</span>, a tool that helps you understand how crypto-savvy your users must be to understand and use your crypto product.
          <br /><br />
          <span className="font-bold">1</span> means that anyone without crypto experience can use your product.<br />
          <span className="font-bold">10</span> means that only users with deep crypto expertise can use your product.
          <br /><br />
          It helps you:
          <br />
          • Understand your true user profile (not who you <em>hope</em> will use it, but who <em>can</em>).<br />
          • Match your messaging to your users' crypto literacy level.
          <br /><br />
          <span className="font-semibold">Spoiler Alert:</span> No, you're not onboarding the next billion users. Yet.
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-sm mb-8">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-2">18 Questions</h3>
            <p className="text-gray-600 dark:text-white">Measuring your score on Friction Index.</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Detailed Analysis</h3>
            <p className="text-gray-600 dark:text-white">Get insights on your ideal user profile</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Strategic Advice</h3>
            <p className="text-gray-600 dark:text-white">Recommendations for UX, marketing & growth</p>
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate('/questions')}
            className="w-full px-8 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 text-white"
          >
            Start Analysis
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-lg text-gray-500 dark:text-gray-400">
        vibe coded with sweat, teardrops and zero coding skills by <a href="https://x.com/zeroXserdar" target="_blank" className="font-bold hover:text-indigo-500 transition-colors">@zeroXserdar</a>
      </div>
    </div>
  );
};

export default Introduction;