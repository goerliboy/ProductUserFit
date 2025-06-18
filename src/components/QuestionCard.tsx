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
        <span className="inline-block text-xs font-bold text-win98-blue bg-win98-gray-light win98-inset px-2 py-1 mb-2 font-win98">
          {question.category}
        </span>
        <h2 className="text-base font-bold text-win98-black font-win98">{question.text}</h2>
      </div>

      <div className="space-y-3 mt-5">
        {question.options.map((option) => (
          <div
            key={option.label}
            className={`p-3 cursor-pointer transition-all duration-200 font-win98 text-sm ${
              selectedAnswer === option.label
                ? 'win98-inset bg-win98-blue-light text-win98-black'
                : 'win98-outset bg-win98-gray hover:bg-win98-gray-light'
            }`}
            onClick={() => onSelectAnswer(option.label)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div
                  className={`win98-radio ${
                    selectedAnswer === option.label ? 'selected' : ''
                  }`}
                >
                </div>
              </div>
              <div className="flex-1">
                <span className="font-bold mr-2">{option.label}.</span>
                <span className="text-win98-black">
                  {option.text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;