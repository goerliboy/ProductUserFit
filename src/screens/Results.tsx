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
  
  const { 
    score, 
    interpretation, 
    idealUserProfile,
    recommendations 
  } = useAnalyzerResults(scoreFromUrl);

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
      // Find the option that gets us closest to the target score
      let bestOption = question.options[0];
      let bestDiff = Math.abs(question.options[0].weight - targetScore);
      
      question.options.forEach(option => {
        const diff = Math.abs(option.weight - targetScore);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestOption = option;
        }
      });
      
      sampleAnswers[index] = bestOption.label;
    });
    
    return sampleAnswers;
  };

  // Use actual answers if available, otherwise generate sample answers for static pages
  const displayAnswers = isStaticPage && Object.keys(answers).length === 0 
    ? generateSampleAnswers(score) 
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

  const currentScoreRange = getScoreRangeString(score);

  // Export handlers
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
        score,
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
        score,
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Analysis Results
        </h1>
        <p className="text-lg italic text-indigo-600 dark:text-indigo-300">
          Product-User Fit Score: {currentScoreRange}
        </p>
      </div>

      <div className="max-w-4xl w-full space-y-8">
        {/* Score and Interpretation Section - Will be captured as image */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg" ref={scoreRef}>
          <div className="flex flex-col md:flex-row md:items-center md:gap-8">
            <div className="w-48 h-48 mb-6 md:mb-0 flex-shrink-0">
              <ScoreGauge score={score} />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-gray-200 text-center md:text-left">{interpretation}</p>
            </div>
          </div>
        </div>

        {/* Radar Chart Section - Will be captured as image */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm shadow-lg border border-gray-100 dark:border-gray-700/50" ref={radarRef}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
                <BarChart3 size={24} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-white">Category Analysis</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">
              {isStaticPage && Object.keys(answers).length === 0 
                ? `Sample breakdown showing typical complexity patterns for products in the ${currentScoreRange} range`
                : 'Visual breakdown of your product\'s complexity across different crypto knowledge domains'
              }
            </p>
          </div>
          
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-2xl"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 dark:from-indigo-700/20 dark:to-purple-700/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 dark:from-purple-700/20 dark:to-indigo-700/20 rounded-full blur-xl"></div>
            
            {/* Chart container */}
            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-600/50 shadow-inner">
              <div className="w-full max-w-2xl mx-auto aspect-square">
                <RadarChart answers={displayAnswers} />
              </div>
            </div>
          </div>
          
          {/* Chart legend/description */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Higher values indicate greater crypto expertise required from users
              {isStaticPage && Object.keys(answers).length === 0 && (
                <span className="block mt-1">Sample data shown for demonstration purposes</span>
              )}
            </p>
          </div>
        </div>

        {/* Ideal User Profile Section - Will be rendered as text in PDF */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg" ref={userProfileRef}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-primary dark:text-white">
            <Users size={20} className="text-indigo-500 dark:text-indigo-400" />
            Ideal User Profile
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200">
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Experience Level</h3>
              <p className="text-base text-gray-600 dark:text-gray-200">{idealUserProfile.experienceLevel}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200">
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Knowledge Base</h3>
              <p className="text-base text-gray-600 dark:text-gray-200">{idealUserProfile.knowledgeBase}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200">
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Behavior</h3>
              <p className="text-base text-gray-600 dark:text-gray-200">{idealUserProfile.behavior}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200">
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Expectations</h3>
              <p className="text-base text-gray-600 dark:text-gray-200">{idealUserProfile.expectations}</p>
            </div>
          </div>
        </div>

        {/* Marketing Strategy Section - Will be rendered as text in PDF */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg" ref={marketingRef}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-primary dark:text-white">
            <MessageSquare size={20} className="text-indigo-500 dark:text-indigo-400" />
            Marketing Strategy
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{recommendations.marketing.main}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-base font-semibold text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                  <Target size={16} />
                  Key Focus Areas
                </h4>
                <div className="bg-white dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                  {recommendations.marketing.keyAreas.map((area, index) => {
                    const feedbackKey = `marketing.keyAreas-${index}`;
                    const currentFeedback = userFeedback[feedbackKey];
                    
                    return (
                      <div 
                        key={index} 
                        className={`py-3 px-4 text-base text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                          index % 2 === 0 
                            ? 'bg-gray-50/50 dark:bg-gray-700/20' 
                            : 'bg-white dark:bg-gray-800/20'
                        } hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0"></span>
                            <span className="leading-relaxed">{area}</span>
                          </div>
                          
                          {/* Feedback buttons */}
                          <div className="flex items-center gap-2 flex-shrink-0 no-print">
                            <button
                              onClick={() => handleFeedback('marketing.keyAreas', index, 'like', area)}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                currentFeedback === 'like'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400'
                              }`}
                              title="This is helpful"
                            >
                              <ThumbsUp size={16} />
                            </button>
                            <button
                              onClick={() => handleFeedback('marketing.keyAreas', index, 'dislike', area)}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                currentFeedback === 'dislike'
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                              }`}
                              title="This is not helpful"
                            >
                              <ThumbsDown size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-base font-semibold text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                  <BookOpen size={16} />
                  Content Strategy
                </h4>
                <div className="bg-white dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                  {recommendations.marketing.contentGuide.map((guide, index) => {
                    const feedbackKey = `marketing.contentGuide-${index}`;
                    const currentFeedback = userFeedback[feedbackKey];
                    
                    return (
                      <div 
                        key={index} 
                        className={`py-3 px-4 text-base text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                          index % 2 === 0 
                            ? 'bg-gray-50/50 dark:bg-gray-700/20' 
                            : 'bg-white dark:bg-gray-800/20'
                        } hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0"></span>
                            <span className="leading-relaxed">{guide}</span>
                          </div>
                          
                          {/* Feedback buttons */}
                          <div className="flex items-center gap-2 flex-shrink-0 no-print">
                            <button
                              onClick={() => handleFeedback('marketing.contentGuide', index, 'like', guide)}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                currentFeedback === 'like'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400'
                              }`}
                              title="This is helpful"
                            >
                              <ThumbsUp size={16} />
                            </button>
                            <button
                              onClick={() => handleFeedback('marketing.contentGuide', index, 'dislike', guide)}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                currentFeedback === 'dislike'
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                              }`}
                              title="This is not helpful"
                            >
                              <ThumbsDown size={16} />
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
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg" ref={onboardingRef}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-primary dark:text-white">
            <Shield size={20} className="text-indigo-500 dark:text-indigo-400" />
            Onboarding Principles
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{recommendations.onboarding.main}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                <Shield size={16} />
                Core Principles
              </h4>
              <div className="bg-white dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                {recommendations.onboarding.principles.map((principle, index) => {
                  const feedbackKey = `onboarding.principles-${index}`;
                  const currentFeedback = userFeedback[feedbackKey];
                  
                  return (
                    <div 
                      key={index} 
                      className={`py-3 px-4 text-base text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                        index % 2 === 0 
                          ? 'bg-gray-50/50 dark:bg-gray-700/20' 
                          : 'bg-white dark:bg-gray-800/20'
                      } hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0"></span>
                          <span className="leading-relaxed">{principle}</span>
                        </div>
                        
                        {/* Feedback buttons */}
                        <div className="flex items-center gap-2 flex-shrink-0 no-print">
                          <button
                            onClick={() => handleFeedback('onboarding.principles', index, 'like', principle)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              currentFeedback === 'like'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400'
                            }`}
                            title="This is helpful"
                          >
                            <ThumbsUp size={16} />
                          </button>
                          <button
                            onClick={() => handleFeedback('onboarding.principles', index, 'dislike', principle)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              currentFeedback === 'dislike'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                            }`}
                            title="This is not helpful"
                          >
                            <ThumbsDown size={16} />
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
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg" ref={growthRef}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-primary dark:text-white">
            <TrendingUp size={20} className="text-indigo-500 dark:text-indigo-400" />
            Growth Tactics
          </h2>
          
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {recommendations.growthTactics.map((tactic, index) => {
                const feedbackKey = `growthTactics-${index}`;
                const currentFeedback = userFeedback[feedbackKey];
                
                return (
                  <div 
                    key={index} 
                    className={`py-4 px-5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                      index % 2 === 0 
                        ? 'bg-gray-50/50 dark:bg-gray-700/20' 
                        : 'bg-white dark:bg-gray-800/20'
                    } hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">{tactic}</span>
                      </div>
                      
                      {/* Feedback buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0 no-print">
                        <button
                          onClick={() => handleFeedback('growthTactics', index, 'like', tactic)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            currentFeedback === 'like'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400'
                          }`}
                          title="This is helpful"
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <button
                          onClick={() => handleFeedback('growthTactics', index, 'dislike', tactic)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            currentFeedback === 'dislike'
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                          }`}
                          title="This is not helpful"
                        >
                          <ThumbsDown size={16} />
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
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-700/30 hover:bg-gray-200 dark:hover:bg-gray-600/40 text-gray-700 dark:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Questions
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-white font-medium"
          >
            <Rotate size={18} />
            Start New Analysis
          </button>

          {/* Export Report Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 text-white font-medium"
            >
              <Download size={18} />
              {isExporting ? 'Exporting...' : 'Export Report'}
              <ChevronDown size={16} className={`transition-transform ${showExportOptions ? 'rotate-180' : ''}`} />
            </button>
            
            {showExportOptions && (
              <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 min-w-[160px] z-10">
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg transition-colors text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Export as PDF
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg transition-colors text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-blue-500 dark:bg-blue-500/40 hover:bg-blue-400 dark:hover:bg-blue-400/50 text-gray-100 dark:text-gray-100 transition-colors font-medium"
          >
            <MessageSquareHeart size={18} />
            Send Feedback
          </a>
        </div>

        {/* Footer Credit */}
        <div className="text-center text-lg text-gray-500 dark:text-gray-400">
          vibe coded with sweat, teardrops and zero coding skills by <a href="https://x.com/zeroXserdar" target="_blank" className="font-bold hover:text-indigo-500 transition-colors">@zeroXserdar</a>
        </div>
      </div>
    </div>
  );
};

export default Results;