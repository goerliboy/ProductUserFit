import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAnalyzer, useAnalyzerResults } from '../context/AnalyzerContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Rotate3D as Rotate, Users, MessageSquare, Target, BookOpen, Shield, MessageSquareHeart, TrendingUp, BarChart3, ThumbsUp, ThumbsDown, Download, ChevronDown } from 'lucide-react';
import { toPng } from 'html-to-image';
import ReactMarkdown from 'react-markdown';
import ScoreGauge from '../components/ScoreGauge';
import RadarChart from '../components/RadarChart';
import { parseScoreRangeString, isValidScoreRange, getScoreRangeString } from '../utils/scoreUtils';
import { supabase, FeedbackEntry } from '../lib/supabase';
import { questions } from '../data/questions';
import { exportToPdf, exportToCsv, ExportData } from '../utils/exportUtils';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { scoreRange } = useParams<{ scoreRange: string }>();
  const { resetAnalyzer, answers, totalQuestions, calculateScore } = useAnalyzer();
  const { theme, toggleTheme } = useTheme();
  
  // Determine if this is a static page (accessed via URL) or dynamic (after questionnaire)
  const isStaticPage = !!scoreRange;
  const scoreFromUrl = isStaticPage && scoreRange ? parseScoreRangeString(scoreRange) : undefined;
  
  // Use the original score calculation logic
  const effectiveScore = scoreFromUrl !== undefined ? scoreFromUrl : calculateScore();
  
  const { 
    score: originalScore, 
    interpretation, 
    idealUserProfile,
    recommendations 
  } = useAnalyzerResults(effectiveScore);

  // Refs for PDF export - Only visual elements that should be captured as images
  const scoreRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  
  // These refs are for text sections that will be rendered as native PDF text
  const userProfileRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const onboardingRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);

  // Feedback state
  const [userFeedback, setUserFeedback] = useState<Record<string, 'like' | 'dislike' | null>>({});
  const [userId, setUserId] = useState<string>('');

  // Export state
  const [isExporting, setIsExporting] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Generate sample answers for static pages based on the score
  const generateSampleAnswers = (targetScore: number): Record<number, string> => {
    const sampleAnswers: Record<number, string> = {};
    
    questions.forEach((question, index) => {
      // Add some variation around the target score for more realistic radar chart
      const variation = (Math.random() - 0.5) * 2; // -1 to +1 variation
      const adjustedTarget = Math.max(1, Math.min(10, targetScore + variation));
      
      // Find the option that gets us closest to the adjusted target score
      let bestOption = question.options[0];
      let bestDiff = Math.abs(question.options[0].weight - adjustedTarget);
      
      question.options.forEach(option => {
        const diff = Math.abs(option.weight - adjustedTarget);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestOption = option;
        }
      });
      
      sampleAnswers[index] = bestOption.label;
    });
    
    return sampleAnswers;
  };

  // Use actual answers if available, otherwise generate sample answers based on effective score
  const displayAnswers = isStaticPage && Object.keys(answers).length === 0 
    ? generateSampleAnswers(effectiveScore) 
    : answers;

  useEffect(() => {
    // Only redirect if this is NOT a static page and user hasn't completed questionnaire
    if (!isStaticPage) {
      const hasAnsweredAllQuestions = Object.keys(answers).length === totalQuestions;
      if (!hasAnsweredAllQuestions) {
        navigate('/questions');
      }
    }
  }, [answers, navigate, totalQuestions, isStaticPage]);

  useEffect(() => {
    // Validate score range if this is a static page
    if (isStaticPage && scoreRange && !isValidScoreRange(scoreRange)) {
      navigate('/');
    }
  }, [isStaticPage, scoreRange, navigate]);

  useEffect(() => {
    // Generate or retrieve user ID
    let storedUserId = localStorage.getItem('feedback-user-id');
    if (!storedUserId) {
      storedUserId = 'user-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
      localStorage.setItem('feedback-user-id', storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  const handleFeedback = async (category: string, index: number, feedbackType: 'like' | 'dislike', itemText: string) => {
    const feedbackKey = `${category}-${index}`;
    
    // Update local state
    setUserFeedback(prev => ({
      ...prev,
      [feedbackKey]: prev[feedbackKey] === feedbackType ? null : feedbackType
    }));

    try {
      // Insert feedback into Supabase
      const feedbackEntry: FeedbackEntry = {
        user_id: userId,
        item_category: category,
        item_index: index,
        item_text: itemText,
        feedback_type: feedbackType
      };

      const { error } = await supabase
        .from('feedback')
        .insert([feedbackEntry]);

      if (error) {
        console.error('Error saving feedback:', error);
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  const handleReset = () => {
    resetAnalyzer();
    navigate('/');
  };

  const currentScoreRange = getScoreRangeString(effectiveScore);

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    // Store the original theme
    const originalTheme = theme;
    let themeWasChanged = false;
    
    try {
      // Switch to light mode if currently in dark mode
      if (theme === 'dark') {
        toggleTheme();
        themeWasChanged = true;
        // Wait for theme change to take effect
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Wait for DOM to update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Only include visual sections (Score Gauge and Radar Chart) for image capture
      const visualSectionRefs = [
        scoreRef,
        radarRef
      ];
      
      const exportData: ExportData = {
        score: effectiveScore,
        scoreRange: currentScoreRange,
        interpretation,
        idealUserProfile,
        recommendations,
        similarProducts: [] // Empty array since we're not including similar products
      };
      
      await exportToPdf(visualSectionRefs, exportData);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      // Always restore the original theme if it was changed
      if (themeWasChanged && theme !== originalTheme) {
        toggleTheme();
      }
      setIsExporting(false);
      setShowExportOptions(false);
    }
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    
    try {
      const exportData: ExportData = {
        score: effectiveScore,
        scoreRange: currentScoreRange,
        interpretation,
        idealUserProfile,
        recommendations,
        similarProducts: [] // Empty array since we're not including similar products
      };
      
      exportToCsv(exportData);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setShowExportOptions(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 win98-gradient-text font-win98">
          Score Analysis and Insights
        </h1>
      </div>

      <div className="max-w-4xl w-full space-y-8">
        {/* Score and Interpretation Section - Will be captured as image */}
        <div className="win98-window p-6" ref={scoreRef}>
          <div className="win98-title-bar mb-4 -mx-6 -mt-6">
            <span>Friction Index Score</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-8">
            <div className="w-48 h-48 mb-6 md:mb-0 flex-shrink-0">
              <ScoreGauge score={effectiveScore} />
            </div>
            <div className="flex-1">
              <p className="text-win98-black text-center md:text-left font-win98 text-sm leading-relaxed">{interpretation}</p>
            </div>
          </div>
        </div>

        {/* Radar Chart Section - Will be captured as image */}
        <div className="win98-window p-8" ref={radarRef}>
          <div className="win98-title-bar mb-4 -mx-8 -mt-8">
            <span>Category Analysis</span>
          </div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="win98-outset p-2 bg-win98-gray">
                <BarChart3 size={20} className="text-win98-black" />
              </div>
              <h2 className="text-xl font-bold text-win98-black font-win98">Category Analysis</h2>
            </div>
            <p className="text-win98-gray-dark text-xs max-w-2xl mx-auto font-win98">
              {isStaticPage && Object.keys(answers).length === 0 
                ? `Sample breakdown showing typical complexity patterns for products in the ${currentScoreRange} range`
                : 'Visual breakdown of your product\'s complexity across different crypto knowledge domains'
              }
            </p>
          </div>
          
          <div className="relative">
            {/* Chart container */}
            <div className="w-full max-w-2xl mx-auto aspect-square">
              <RadarChart answers={displayAnswers} />
            </div>
          </div>
          
          {/* Chart legend/description */}
          <div className="mt-6 text-center">
            <p className="text-xs text-win98-gray-dark font-win98">
              Higher values indicate greater crypto expertise required from users
              {isStaticPage && Object.keys(answers).length === 0 && (
                <span className="block mt-1">Sample data shown for demonstration purposes</span>
              )}
            </p>
          </div>
        </div>

        {/* Ideal User Profile Section - Will be rendered as text in PDF */}
        <div className="win98-window p-6" ref={userProfileRef}>
          <div className="win98-title-bar mb-4 -mx-6 -mt-6">
            <span>Ideal User Profile</span>
          </div>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-win98-black font-win98">
            <Users size={16} className="text-win98-teal" />
            Ideal User Profile
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="win98-inset bg-win98-gray-light p-4">
              <h3 className="font-bold text-win98-teal mb-2 font-win98 text-sm">Experience Level</h3>
              <p className="text-sm text-win98-black font-win98">{idealUserProfile.experienceLevel}</p>
            </div>
            <div className="win98-inset bg-win98-gray-light p-4">
              <h3 className="font-bold text-win98-teal mb-2 font-win98 text-sm">Knowledge Base</h3>
              <p className="text-sm text-win98-black font-win98">{idealUserProfile.knowledgeBase}</p>
            </div>
            <div className="win98-inset bg-win98-gray-light p-4">
              <h3 className="font-bold text-win98-teal mb-2 font-win98 text-sm">Behavior</h3>
              <p className="text-sm text-win98-black font-win98">{idealUserProfile.behavior}</p>
            </div>
            <div className="win98-inset bg-win98-gray-light p-4">
              <h3 className="font-bold text-win98-teal mb-2 font-win98 text-sm">Expectations</h3>
              <p className="text-sm text-win98-black font-win98">{idealUserProfile.expectations}</p>
            </div>
          </div>
        </div>

        {/* Marketing Strategy Section - Will be rendered as text in PDF */}
        <div className="win98-window p-6" ref={marketingRef}>
          <div className="win98-title-bar mb-4 -mx-6 -mt-6">
            <span>Marketing Strategy</span>
          </div>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-win98-black font-win98">
            <MessageSquare size={16} className="text-win98-teal" />
            Marketing Strategy
          </h2>
          
          <div className="space-y-6">
            <div className="win98-inset win98-gradient-bg p-4">
              <p className="text-white leading-relaxed font-win98 text-sm">{recommendations.marketing.main}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-win98-teal font-win98 flex items-center gap-2">
                  <Target size={14} />
                  Key Focus Areas
                </h4>
                <div className="win98-inset bg-white">
                  {recommendations.marketing.keyAreas.map((area, index) => {
                    const feedbackKey = `marketing.keyAreas-${index}`;
                    const currentFeedback = userFeedback[feedbackKey];
                    
                    return (
                      <div 
                        key={index} 
                        className={`py-2 px-3 text-sm text-win98-black border-b border-win98-gray-dark last:border-b-0 ${
                          index % 2 === 0 
                            ? 'bg-win98-gray-light' 
                            : 'bg-white'
                        } font-win98`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="w-1.5 h-1.5 win98-gradient-bg flex-shrink-0"></span>
                            <span className="leading-relaxed">{area}</span>
                          </div>
                          
                          {/* Feedback buttons */}
                          <div className="flex items-center gap-1 flex-shrink-0 no-print">
                            <button
                              onClick={() => handleFeedback('marketing.keyAreas', index, 'like', area)}
                              className={`win98-button p-1 ${
                                currentFeedback === 'like'
                                  ? 'win98-pressed'
                                  : ''
                              }`}
                              title="This is helpful"
                            >
                              <ThumbsUp size={12} />
                            </button>
                            <button
                              onClick={() => handleFeedback('marketing.keyAreas', index, 'dislike', area)}
                              className={`win98-button p-1 ${
                                currentFeedback === 'dislike'
                                  ? 'win98-pressed'
                                  : ''
                              }`}
                              title="This is not helpful"
                            >
                              <ThumbsDown size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-win98-teal font-win98 flex items-center gap-2">
                  <BookOpen size={14} />
                  Content Strategy
                </h4>
                <div className="win98-inset bg-white">
                  {recommendations.marketing.contentGuide.map((guide, index) => {
                    const feedbackKey = `marketing.contentGuide-${index}`;
                    const currentFeedback = userFeedback[feedbackKey];
                    
                    return (
                      <div 
                        key={index} 
                        className={`py-2 px-3 text-sm text-win98-black border-b border-win98-gray-dark last:border-b-0 ${
                          index % 2 === 0 
                            ? 'bg-win98-gray-light' 
                            : 'bg-white'
                        } font-win98`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="w-1.5 h-1.5 win98-gradient-bg flex-shrink-0"></span>
                            <span className="leading-relaxed">{guide}</span>
                          </div>
                          
                          {/* Feedback buttons */}
                          <div className="flex items-center gap-1 flex-shrink-0 no-print">
                            <button
                              onClick={() => handleFeedback('marketing.contentGuide', index, 'like', guide)}
                              className={`win98-button p-1 ${
                                currentFeedback === 'like'
                                  ? 'win98-pressed'
                                  : ''
                              }`}
                              title="This is helpful"
                            >
                              <ThumbsUp size={12} />
                            </button>
                            <button
                              onClick={() => handleFeedback('marketing.contentGuide', index, 'dislike', guide)}
                              className={`win98-button p-1 ${
                                currentFeedback === 'dislike'
                                  ? 'win98-pressed'
                                  : ''
                              }`}
                              title="This is not helpful"
                            >
                              <ThumbsDown size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding Principles Section - Will be rendered as text in PDF */}
        <div className="win98-window p-6" ref={onboardingRef}>
          <div className="win98-title-bar mb-4 -mx-6 -mt-6">
            <span>Onboarding Principles</span>
          </div>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-win98-black font-win98">
            <Shield size={16} className="text-win98-teal" />
            Onboarding Principles
          </h2>
          
          <div className="space-y-6">
            <div className="win98-inset win98-gradient-bg p-4">
              <p className="text-white leading-relaxed font-win98 text-sm">{recommendations.onboarding.main}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-win98-teal font-win98 flex items-center gap-2">
                <Shield size={14} />
                Core Principles
              </h4>
              <div className="win98-inset bg-white">
                {recommendations.onboarding.principles.map((principle, index) => {
                  const feedbackKey = `onboarding.principles-${index}`;
                  const currentFeedback = userFeedback[feedbackKey];
                  
                  return (
                    <div 
                      key={index} 
                      className={`py-2 px-3 text-sm text-win98-black border-b border-win98-gray-dark last:border-b-0 ${
                        index % 2 === 0 
                          ? 'bg-win98-gray-light' 
                          : 'bg-white'
                      } font-win98`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="w-1.5 h-1.5 win98-gradient-bg flex-shrink-0"></span>
                          <span className="leading-relaxed">{principle}</span>
                        </div>
                        
                        {/* Feedback buttons */}
                        <div className="flex items-center gap-1 flex-shrink-0 no-print">
                          <button
                            onClick={() => handleFeedback('onboarding.principles', index, 'like', principle)}
                            className={`win98-button p-1 ${
                              currentFeedback === 'like'
                                ? 'win98-pressed'
                                : ''
                            }`}
                            title="This is helpful"
                          >
                            <ThumbsUp size={12} />
                          </button>
                          <button
                            onClick={() => handleFeedback('onboarding.principles', index, 'dislike', principle)}
                            className={`win98-button p-1 ${
                              currentFeedback === 'dislike'
                                ? 'win98-pressed'
                                : ''
                            }`}
                            title="This is not helpful"
                          >
                            <ThumbsDown size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Growth Tactics Section - Will be rendered as text in PDF */}
        <div className="win98-window p-6" ref={growthRef}>
          <div className="win98-title-bar mb-4 -mx-6 -mt-6">
            <span>Growth Tactics</span>
          </div>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-win98-black font-win98">
            <TrendingUp size={16} className="text-win98-teal" />
            Growth Tactics
          </h2>
          
          <div className="space-y-3">
            <div className="win98-inset bg-white">
              {recommendations.growthTactics.map((tactic, index) => {
                const feedbackKey = `growthTactics-${index}`;
                const currentFeedback = userFeedback[feedbackKey];
                
                return (
                  <div 
                    key={index} 
                    className={`py-3 px-4 border-b border-win98-gray-dark last:border-b-0 ${
                      index % 2 === 0 
                        ? 'bg-win98-gray-light' 
                        : 'bg-white'
                    } font-win98`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0 w-5 h-5 win98-outset win98-gradient-bg flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm text-win98-black leading-relaxed">{tactic}</span>
                      </div>
                      
                      {/* Feedback buttons */}
                      <div className="flex items-center gap-1 flex-shrink-0 no-print">
                        <button
                          onClick={() => handleFeedback('growthTactics', index, 'like', tactic)}
                          className={`win98-button p-1 ${
                            currentFeedback === 'like'
                              ? 'win98-pressed'
                              : ''
                          }`}
                          title="This is helpful"
                        >
                          <ThumbsUp size={12} />
                        </button>
                        <button
                          onClick={() => handleFeedback('growthTactics', index, 'dislike', tactic)}
                          className={`win98-button p-1 ${
                            currentFeedback === 'dislike'
                              ? 'win98-pressed'
                              : ''
                          }`}
                          title="This is not helpful"
                        >
                          <ThumbsDown size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Only show "Back to Questions" for dynamic results */}
          {!isStaticPage && (
            <button
              onClick={() => navigate('/questions')}
              className="win98-button flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft size={16} />
              Back to Questions
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="win98-button flex items-center justify-center gap-2 text-sm font-bold"
          >
            <Rotate size={16} />
            Start New Analysis
          </button>

          {/* Export Report Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={isExporting}
              className="win98-button flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-50"
            >
              <Download size={16} />
              {isExporting ? 'Exporting...' : 'Export Report'}
              <ChevronDown size={14} className={`transition-transform ${showExportOptions ? 'rotate-180' : ''}`} />
            </button>
            
            {showExportOptions && (
              <div className="absolute top-full mt-2 right-0 win98-window min-w-[160px] z-10">
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="w-full win98-button text-left text-sm disabled:opacity-50"
                >
                  Export as PDF
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting}
                  className="w-full win98-button text-left text-sm disabled:opacity-50"
                >
                  Export as CSV
                </button>
              </div>
            )}
          </div>

          <a
            href="https://x.com/messages/compose?recipient_id=1327720803044093955"
            target="_blank"
            rel="noopener noreferrer"
            className="win98-button flex items-center justify-center gap-2 text-sm font-bold"
          >
            <MessageSquareHeart size={16} />
            Send Feedback
          </a>
        </div>

        {/* Footer Credit */}
        <div className="text-center text-sm text-win98-gray-dark font-win98">
          vibe coded with sweat, teardrops and zero coding skills by <a href="https://x.com/zeroXserdar" target="_blank" className="font-bold text-win98-teal hover:underline">@zeroXserdar</a>
        </div>
      </div>
    </div>
  );
};

export default Results;