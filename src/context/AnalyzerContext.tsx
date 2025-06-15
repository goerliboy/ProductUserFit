import React, { createContext, useContext, useState } from 'react';
import { QuestionType, questions } from '../data/questions';
import { getInterpretation, getIdealUserProfile, getRecommendations } from '../data/interpretations';

interface AnalyzerContextType {
  answers: Record<number, string>;
  setAnswers: (answers: Record<number, string>) => void;
  calculateScore: () => number;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  getQuestionByIndex: (index: number) => QuestionType | undefined;
  totalQuestions: number;
  resetAnalyzer: () => void;
}

const AnalyzerContext = createContext<AnalyzerContextType | undefined>(undefined);

export const AnalyzerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const totalQuestions = questions.length;

  const getQuestionByIndex = (index: number): QuestionType | undefined => {
    return questions[index];
  };

  const calculateScore = (): number => {
    let totalWeight = 0;
    let answeredQuestions = 0;

    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer) {
        const option = question.options.find(opt => opt.label === answer);
        if (option) {
          totalWeight += option.weight;
          answeredQuestions++;
        }
      }
    });

    // Return 0 if no questions answered to avoid division by zero
    if (answeredQuestions === 0) return 0;
    
    // Calculate average score (1-10 scale)
    const score = totalWeight / answeredQuestions;
    return Math.min(10, Math.max(1, parseFloat(score.toFixed(1)))); // Ensure score is between 1 and 10
  };

  const resetAnalyzer = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  return (
    <AnalyzerContext.Provider
      value={{
        answers,
        setAnswers,
        calculateScore,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        getQuestionByIndex,
        totalQuestions,
        resetAnalyzer,
      }}
    >
      {children}
    </AnalyzerContext.Provider>
  );
};

export const useAnalyzer = (): AnalyzerContextType => {
  const context = useContext(AnalyzerContext);
  if (!context) {
    throw new Error('useAnalyzer must be used within an AnalyzerProvider');
  }
  return context;
};

export const useAnalyzerResults = (scoreFromUrl?: number) => {
  const { calculateScore } = useAnalyzer();
  
  // Use the provided score from URL if available, otherwise calculate from answers
  const score = scoreFromUrl !== undefined ? scoreFromUrl : calculateScore();
  
  return {
    score,
    interpretation: getInterpretation(score),
    idealUserProfile: getIdealUserProfile(score),
    recommendations: getRecommendations(score),
  };
};