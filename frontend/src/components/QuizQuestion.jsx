import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const QuizQuestion = ({ question, onAnswer, loading, selectedAnswer }) => (
  <div className="space-y-6">
    <div className="p-2 pt-0 bg-white/30 border border-white/20 rounded-3xl shadow-xl backdrop-blur-lg fade-in">
      <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-4 p-2 pt-0 leading-tight">
        {question.question || question.text}
      </h3>
      {question.explanation && (
        <div className="mb-4 p-2 bg-blue-50/80 border border-blue-200/50 rounded-2xl backdrop-blur-md">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-blue-800 leading-relaxed font-medium">{question.explanation}</p>
          </div>
        </div>
      )}
      <div className="grid gap-2">
        {question.answers?.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={loading || selectedAnswer !== null}
            className={`answer-btn ${selectedAnswer === index ? 'answer-selected' : ''}`}
          >
            <div className="flex items-center gap-1">
              <div className={`w-4 h-4 rounded-full border-1 flex items-center justify-center transition-all duration-300 ${
                selectedAnswer === index ? 'border-purple-500 bg-purple-500' : 'border-gray-300 group-hover:border-purple-400'
              }`}>
                {selectedAnswer === index && <Check className="w-5 h-5 text-white" />}
              </div>
              <span className="text-gray-800 font-medium leading-relaxed flex-1">
                {answer.text || answer.answer}
              </span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            {selectedAnswer === index && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default QuizQuestion;