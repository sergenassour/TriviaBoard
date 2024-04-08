import React, { useState, useEffect } from 'react';
import './App.css';
import triviaData from "./components/data";
import TOTAL_QUESTIONS_PER_ROUND from "./components/constants";
import QuestionCard from "./components/QuestionCard";
import ScoreDisplay from "./components/ScoreDisplay";
import Timer from "./components/Timer";
import shuffleArray from "./components/utils";
import categories from './components/categories';
import Legend from "./components/Legend";

const App = () => {
  const [theme, setTheme] = useState('light');
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [passedQuestions, setPassedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [resetTimerFlag, setResetTimerFlag] = useState(false);

  useEffect(()=> {
    setShuffledQuestions(shuffleArray([...triviaData]).slice(0, TOTAL_QUESTIONS_PER_ROUND));
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    handleChange(mediaQuery);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const onCardSelect = (index) => {
    if (!passedQuestions.includes(index)) {
      setSelectedQuestionIndex(index);
      setResetTimerFlag(true);
    }
  };

  const handleAnswerSelection = (isCorrect, questionScore) => {
    const nextIndex = currentQuestionIndex + 1;
    if (isCorrect) {
      setScore(score + questionScore);
      setFeedback('Correct!');
    } else {
      setScore(score - questionScore);
      setFeedback('Wrong!');
    }
    setResetTimerFlag(false);
    if (nextIndex < TOTAL_QUESTIONS_PER_ROUND) {
      const timeoutId = setTimeout(() => {
        setFeedback('');
        setCurrentQuestionIndex(nextIndex);
      }, 2000);

      return () => clearTimeout(timeoutId);
    } else {
      setGameOver(true);
      setTimeout(() => {
        setFeedback('');
      }, 2000);
    }
  };

  const handlePass = (index) => {
    if (!hasPassed && !passedQuestions.includes(index)) {
      setHasPassed(true);
      setPassedQuestions((prevPassed) =>[...prevPassed, index]);
      setFeedback('Question Passed');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleTimeUp = () => {
    setScore(score - shuffledQuestions[currentQuestionIndex].score);
    setResetTimerFlag(false);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setShuffledQuestions(shuffleArray([...triviaData]));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setHasPassed(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
      <div className={`app ${theme}-theme`}>
        <button onClick={toggleTheme} className="theme-toggle-button">
          Toggle Theme
        </button>
        <Legend categories={categories} />
        <ScoreDisplay score={score}/>
        {gameOver ? (
            <div className="end-game">
              <div className="message">
                {score > 0 ? 'Congratulations! You won!' : 'Game over. Try again!'}
              </div>
              <button onClick={restartGame}>Restart Game</button>
            </div>
        ) : (
            <div className="trivia-board">
              {shuffledQuestions.map((question, index) => (
                <QuestionCard
                    key={index}
                    data={question}
                    onCardSelect={() => onCardSelect(index)}
                    onAnswerSelected={handleAnswerSelection}
                    isSelected={selectedQuestionIndex === index}
                    isPassed={passedQuestions.includes(index)}
                    feedback={feedback}
                    />
            ))}
              {selectedQuestionIndex !== null && (
                  <>
                    <Timer seconds={60} onTimeUp={handleTimeUp} resetTimer={resetTimerFlag}/>
                    {!hasPassed && <button onClick={handlePass} className="button"> PASS </button>}
                  </>
              )}
                    {feedback && <div className="feedback">{feedback}</div>}
              </div>
            )}
      </div>
  );
};

export default App;