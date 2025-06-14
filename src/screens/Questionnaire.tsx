import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalyzer } from '../context/AnalyzerContext';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import { getScoreRangeString } from '../utils/scoreUtils';

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    getQuestionByIndex, 
    totalQuestions,
    answers,
    setAnswers,
    calculateScore,
  } = useAnalyzer();
  
  const [error, setError] = useState<string>('');
  const currentQuestion = getQuestionByIndex(currentQuestionIndex);

  const handleNext = () => {
    if (!answers[currentQuestionIndex]) {
      setError('Please select an answer before proceeding.');
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score and navigate to static results page
      const finalScore = calculateScore();
      const scoreRange = getScoreRangeString(finalScore);
      navigate(`/results/${scoreRange}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/');
    }
  };

  const handleSelectAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer,
    });
    setError('');
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Diagnostic Questions
        </h1>
        <p className="text-lg italic text-indigo-600 dark:text-indigo-300">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
      </div>

      <div className="w-full max-w-3xl mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700/30 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg w-full max-w-3xl">
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestionIndex] || ''}
            onSelectAnswer={handleSelectAnswer}
          />
        )}

        {error && <p className="mt-4 text-red-500 dark:text-red-400 text-sm">{error}</p>}

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-700/30 hover:bg-gray-200 dark:hover:bg-gray-600/40 text-gray-700 dark:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 font-medium text-white"
          >
            {isLastQuestion ? (
              <>
                Calculate Score
                <Check size={18} />
              </>
            ) : (
              <>
                Next
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-lg text-gray-500 dark:text-gray-400">
        vibe coded with sweat, teardrops and zero coding skills by <a href="https://x.com/zeroXserdar" target="_blank" className="font-bold hover:text-indigo-500 transition-colors">@zeroXserdar</a>
      </div>
    </div>
  );
};

export default Questionnaire;