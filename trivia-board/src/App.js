import React, { useState, useEffect } from 'react';
import './App.css';
import triviaData from "./data";
import TOTAL_QUESTIONS_PER_ROUND from "./constants";
import QuestionCard from "./QuestionCard";
import ScoreDisplay from "./ScoreDisplay";
import Timer from "./Timer";
import shuffleArray from "./utils"

const App = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [resetTimerFlag, setResetTimerFlag] = useState(false);

  useEffect(()=> {
    setShuffledQuestions(shuffleArray([...triviaData]).slice(0, TOTAL_QUESTIONS_PER_ROUND));
  }, []);

  const handleAnswerSelection = (isCorrect, questionScore) => {
    const nextIndex = currentQuestionIndex + 1;
    if (isCorrect) {
      setScore(score + questionScore);
      setFeedback('Correct!');
    } else {
      setScore(score - questionScore);
      setFeedback('Wrong!');
    }
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

  const goToNextQuestion = () => {
    const nextIndex = currentQuestionIndex +1;
    if (nextIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setResetTimerFlag(!resetTimerFlag);
    } else {
      setGameOver(true);
    }
  };

  const handlePass = () => {
    if (!hasPassed) {
      setHasPassed(true);
      goToNextQuestion();
    }
  };

  const handleTimeUp = () => {
    setScore(score - shuffledQuestions[currentQuestionIndex].score);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
    goToNextQuestion();
  };

  const restartGame = () => {
    setShuffledQuestions(shuffleArray([...triviaData]));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setHasPassed(false);
  };

  return (
      <div className="app">
        <ScoreDisplay score={score}/>
        {gameOver ? (
            <div className="end-game">
              <div className="message">
                {score > 0 ? 'Congratulations! You won!' : 'Game over. Try again!'}
              </div>
              <button onClick={restartGame}>Restart Game</button>
            </div>
        ) : (
            <>
              {shuffledQuestions.length > 0 && (
                  <div className="game-area">
                    <QuestionCard
                        data={shuffledQuestions[currentQuestionIndex]}
                        onAnswerSelected={handleAnswerSelection}
                        feedback={feedback}
                    />
                    <Timer seconds={60} onTimeUp={handleTimeUp} resetTimer={resetTimerFlag}/>
                    {!hasPassed && (
                        <button onClick={handlePass} className="button">
                          PASS
                        </button>
                    )}
                    {feedback && <div className="feedback">{feedback}</div>}
              </div>
            )}
          </>
        )}
      </div>
  );
};

export default App;