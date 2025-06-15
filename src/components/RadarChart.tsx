import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { questions } from '../data/questions';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  answers: Record<number, string>;
}

const RadarChart: React.FC<RadarChartProps> = ({ answers }) => {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Group questions by category and calculate average scores
  const categoryScores = Object.entries(answers).reduce((acc, [questionId, answer]) => {
    const question = questions[parseInt(questionId)];
    if (!question) return acc;
    
    const option = question.options.find(opt => opt.label === answer);
    const score = option ? option.weight : 0;
    
    if (!acc[question.category]) {
      acc[question.category] = {
        total: 0,
        count: 0
      };
    }
    
    acc[question.category].total += score;
    acc[question.category].count += 1;
    
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  // Calculate averages and prepare data
  const categories = Object.keys(categoryScores);
  const averages = categories.map(category => 
    categoryScores[category].total / categoryScores[category].count
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Category Scores',
        data: averages,
        backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.1)',
        borderColor: isDarkMode ? 'rgba(99, 102, 241, 1)' : 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        pointBackgroundColor: isDarkMode ? 'rgba(99, 102, 241, 1)' : 'rgba(79, 70, 229, 1)',
        pointBorderColor: isDarkMode ? '#1f2937' : '#ffffff',
        pointHoverBackgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        pointHoverBorderColor: isDarkMode ? 'rgba(99, 102, 241, 1)' : 'rgba(79, 70, 229, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            size: 12,
            weight: '500',
          },
        },
        ticks: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
          backdropColor: 'transparent',
          font: {
            size: 10,
          },
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#ffffff' : '#000000',
        bodyColor: isDarkMode ? '#ffffff' : '#000000',
        padding: 12,
        displayColors: false,
        borderColor: isDarkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(79, 70, 229, 0.3)',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;