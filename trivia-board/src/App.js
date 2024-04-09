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
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [passedQuestions, setPassedQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [resetTimerFlag, setResetTimerFlag] = useState(false);

  useEffect(()=> {
    setShuffledQuestions(shuffleArray([...triviaData]).slice(0, TOTAL_QUESTIONS_PER_ROUND));
  }, []);

  const onCardSelect = (index) => {
    if (!passedQuestions.includes(index)) {
      setSelectedQuestionIndex(index);
      setResetTimerFlag(true);
    }
  };

  const handleAnswerSelection = (isCorrect, questionScore, idx) => {
    const answeredQsLength = answeredQuestions.length + 1 + (hasPassed ? 1 : 0);
    setAnsweredQuestions((prev) => [...prev, idx]);

    if (isCorrect) {
      setScore((score) => score + questionScore);
      setFeedback('Correct!');
    } else {
      setScore((score) => score - questionScore);
      setFeedback('Wrong!');
    }

    setResetTimerFlag(false);
    setSelectedQuestionIndex(null);
    if (answeredQsLength < TOTAL_QUESTIONS_PER_ROUND) {
      const timeoutId = setTimeout(() => {
        setFeedback('');
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
      setResetTimerFlag(false);
    }
  };

  const handleTimeUp = () => {
    setScore(score - shuffledQuestions[selectedQuestionIndex].score);
    setResetTimerFlag(false);
    if (selectedQuestionIndex < shuffledQuestions.length - 1) {
      setSelectedQuestionIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setShuffledQuestions(shuffleArray([...triviaData]).slice(0, TOTAL_QUESTIONS_PER_ROUND));
    setAnsweredQuestions([]);
    setScore(0);
    setGameOver(false);
    setHasPassed(false);
  };

  return (
      <div className={"app"}>
        <Legend categories={categories} />
        <ScoreDisplay score={score}/>
        {gameOver ? (
            <div className="end-game">
              <div className="message">
                {score > 0 ? 'Congratulations! You won!' : 'You could do better. Try again!'}
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
                    isPassed={passedQuestions.includes(index) || answeredQuestions.includes(index)}
                    feedback={feedback}
                    idx={index}
                    />
            ))}
              {selectedQuestionIndex !== null && (
                  <>
                    <Timer seconds={60} onTimeUp={handleTimeUp} resetTimer={resetTimerFlag}/>
                    {!hasPassed && <button onClick={() => handlePass(selectedQuestionIndex)} className="button"> PASS </button>}
                  </>
              )}
                    {feedback && <div className="feedback">{feedback}</div>}
              </div>
            )}
      </div>
  );
};

export default App;