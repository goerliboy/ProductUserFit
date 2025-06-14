import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Introduction from './screens/Introduction';
import Questionnaire from './screens/Questionnaire';
import Results from './screens/Results';
import { AnalyzerProvider } from './context/AnalyzerContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-gradient-to-br dark:from-gray-900 dark:to-indigo-950 text-text-primary dark:text-white transition-colors duration-200">
        <AnalyzerProvider>
          <ThemeToggle />
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Routes>
              <Route path="/" element={<Introduction />} />
              <Route path="/questions" element={<Questionnaire />} />
              <Route path="/results" element={<Results />} />
              <Route path="/results/:scoreRange" element={<Results />} />
            </Routes>
          </div>
        </AnalyzerProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;