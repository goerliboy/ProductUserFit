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
    saveSubmission,
  } = useAnalyzer();
  
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const currentQuestion = getQuestionByIndex(currentQuestionIndex);

  const handleNext = async () => {
    if (!answers[currentQuestionIndex]) {
      setError('Please select an answer before proceeding.');
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score and save submission
      setIsSubmitting(true);
      const finalScore = calculateScore();
      
      try {
        // Save the submission to database
        await saveSubmission(finalScore, answers);
      } catch (error) {
        console.error('Failed to save submission:', error);
        // Continue with navigation even if save fails
      }
      
      const scoreRange = getScoreRangeString(finalScore);
      navigate(`/results/${scoreRange}`);
      setIsSubmitting(false);
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
        <h1 className="text-2xl md:text-3xl font-bold mb-2 win98-gradient-text font-win98">
          Diagnostic Questions
        </h1>
        <p className="text-base text-win98-teal font-win98">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
      </div>

      <div className="w-full max-w-3xl mb-4">
        <div className="win98-progress-bar h-6">
          <div 
            className="win98-progress-fill transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="win98-window p-6 w-full max-w-3xl">
        <div className="win98-title-bar mb-4 -mx-6 -mt-6">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        </div>
        
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestionIndex] || ''}
            onSelectAnswer={handleSelectAnswer}
          />
        )}

        {error && <p className="mt-4 text-red-600 text-sm font-win98">{error}</p>}

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={isSubmitting}
            className="win98-button flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="win98-button flex items-center justify-center gap-2 text-sm font-bold px-6"
          >
            {isLastQuestion ? (
              <>
                {isSubmitting ? 'Calculating...' : 'Calculate Score'}
                <Check size={16} />
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-win98-gray-dark font-win98">
        vibe coded with sweat, teardrops and zero coding skills by <a href="https://x.com/zeroXserdar" target="_blank" className="font-bold text-win98-teal hover:underline">@zeroXserdar</a>
      </div>
    </div>
  );
};

export default Questionnaire;