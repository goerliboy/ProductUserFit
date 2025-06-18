import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalyzer } from '../context/AnalyzerContext';
import { Search } from 'lucide-react';

const Introduction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-win98-black font-win98">
          Product-User Fit Framework
        </h1>
        <p className="text-base text-win98-blue font-win98">
          Find out who actually gets your crypto product.
        </p>
      </div>

      <div className="win98-window p-6 md:p-8 max-w-2xl">
        <div className="win98-title-bar mb-4 -mx-6 -mt-6">
          <span>Product-User Fit Framework - Introduction</span>
        </div>
        
        <p className="text-sm mb-6 leading-relaxed text-win98-black font-win98">
          Introducing <span className="font-bold">Product-User Fit Framework</span>, a tool that helps you understand how crypto-savvy your users must be to understand and use your crypto product.
          <br /><br />
          <span className="font-bold">1</span> means that anyone without crypto experience can use your product.<br />
          <span className="font-bold">10</span> means that only users with deep crypto expertise can use your product.
          <br /><br />
          It helps you:
          <br />
          • Understand your true user profile (not who you <em>hope</em> will use it, but who <em>can</em>).<br />
          • Match your messaging to your users' crypto literacy level.
          <br /><br />
          <span className="font-bold">Spoiler Alert:</span> No, you're not onboarding the next billion users. Yet.
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-xs mb-8">
          <div className="win98-inset bg-win98-gray p-3">
            <h3 className="font-bold text-win98-blue mb-2 font-win98">18 Questions</h3>
            <p className="text-win98-black font-win98">Measuring your score on Friction Index.</p>
          </div>
          <div className="win98-inset bg-win98-gray p-3">
            <h3 className="font-bold text-win98-blue mb-2 font-win98">Detailed Analysis</h3>
            <p className="text-win98-black font-win98">Get insights on your ideal user profile</p>
          </div>
          <div className="win98-inset bg-win98-gray p-3">
            <h3 className="font-bold text-win98-blue mb-2 font-win98">Strategic Advice</h3>
            <p className="text-win98-black font-win98">Recommendations for UX, marketing & growth</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/questions')}
            className="w-full win98-button text-sm font-bold py-3"
          >
            Start Analysis
          </button>
          
          <button
            onClick={() => navigate('/explore')}
            className="w-full win98-button text-sm font-bold py-3 flex items-center justify-center gap-2"
          >
            <Search size={16} />
            I want to explore without analysis
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-win98-gray-dark font-win98">
        vibe coded with sweat, teardrops and zero coding skills by <a href="https://x.com/zeroXserdar" target="_blank" className="font-bold text-win98-blue hover:underline">@zeroXserdar</a>
      </div>
    </div>
  );
};

export default Introduction;