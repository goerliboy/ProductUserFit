import React from 'react';
import { QuestionType } from '../data/questions';

interface QuestionCardProps {
  question: QuestionType;
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer
}) => {
  return (
    <div className="py-2">
      <div className="mb-4">
        <span className="inline-block text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full mb-2">
          {question.category}
        </span>
        <h2 className="text-xl font-semibold text-text-primary dark:text-white">{question.text}</h2>
      </div>

      <div className="space-y-3 mt-5">
        {question.options.map((option) => (
          <div
            key={option.label}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedAnswer === option.label
                ? 'bg-indigo-50 dark:bg-indigo-700/40 border border-indigo-200 dark:border-indigo-500'
                : 'bg-white dark:bg-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-transparent'
            }`}
            onClick={() => onSelectAnswer(option.label)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full font-medium text-sm ${
                    selectedAnswer === option.label
                      ? 'bg-indigo-100 dark:bg-indigo-500 text-indigo-700 dark:text-white'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {option.label}
                </div>
              </div>
              <div className="flex-1">
                <p className={`${
                  selectedAnswer === option.label
                    ? 'text-indigo-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-200'
                }`}>
                  {option.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;