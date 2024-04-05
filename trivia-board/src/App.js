import React, { useState, useEffect } from 'react';
import './App.css';

const triviaData = [
  // Category 1: Sports
  { category: 'Sports', question: 'What’s the diameter of a basketball hoop in inches?', answers: ['14 inches', '16 inches', '18 inches'], correctAnswer: '18 inches', score: 100 },
  { category: 'Sports', question: 'How big is an Olympic sized swimming pool in meters?', answers: ['50m x 30m', '50m x 25m', '60m x 30m'], correctAnswer: '50m x 25m', score: 100 },
  { category: 'Sports', question: 'In professional basketball, how high is the basketball hoop from the ground?', answers: ['10ft', '11ft', '12ft'], correctAnswer: '10ft', score: 100 },
  { category: 'Sports', question: 'The Summer Olympics are held every how many years?', answers: ['2 years', '4 years', '6 years'], correctAnswer: '4 years', score: 100 },
  { category: 'Sports', question: 'What sport is dubbed the ‘king of sports’?', answers: ['Hockey', 'Football', 'Soccer'], correctAnswer: 'Soccer', score: 100 },
  { category: 'Sports', question: 'In American Football, a touchdown is worth how many points?', answers: ['3 points', '6 points', '9 points'], correctAnswer: '6 points', score: 100 },
  { category: 'Sports', question: 'What is Canada’s national sport?', answers: ['Hockey', 'Lacrosse', 'Cross country skiing'], correctAnswer: 'Lacrosse', score: 100 },
  { category: 'Sports', question: 'How many players are on a baseball team?', answers: ['9 players', '15 players', '20 players'], correctAnswer: '9 players', score: 100 },
  { category: 'Sports', question: 'What team gets the advantage of first bat in baseball', answers: ['Home team', 'Visiting team'], correctAnswer: 'Visiting team', score: 100 },
  { category: 'Sports', question: 'How many dimples does an average golf ball have?', answers: ['128', '260', '336'], correctAnswer: '336', score: 100 },

  // Category 2: Science
  { category: 'Science', question: 'This essential gas is important so that we can breathe', answers: ['Oxygen', 'Nitrogen', 'Helium'], correctAnswer: 'Oxygen', score: 100 },
  { category: 'Science', question: 'What is the nearest planet to the sun?', answers: ['Mars', 'Pluto', 'Mercury'], correctAnswer: 'Mercury', score: 100 },
  { category: 'Science', question: 'What is the largest planet in the solar system?', answers: ['Earth', 'Saturn', 'Jupiter'], correctAnswer: 'Jupiter', score: 100 },
  { category: 'Science', question: 'What is the rarest blood type?', answers: ['O positive', 'AB negative', 'B negative'], correctAnswer: 'AB negative', score: 100 },
  { category: 'Science', question: 'On what part of your body would you find the pinna?', answers: ['Ear', 'Eye', 'Nose'], correctAnswer: 'Ear', score: 100 },
  { category: 'Science', question: 'What tissue connects muscles to bones?', answers: ['Tendons', 'Fibres', 'Ligaments'], correctAnswer: 'Tendons', score: 100 },
  { category: 'Science', question: 'Sounds travels faster in air than in water', answers: ['True', 'False'], correctAnswer: 'False', score: 100 },
  { category: 'Science', question: 'How long does a human red blood cell survive?', answers: ['10 days', '120 days', '2 years'], correctAnswer: '120 days', score: 100 },
  { category: 'Science', question: 'Can you hear anything in outer space?', answers: ['Yes', 'No'], correctAnswer: 'No', score: 100 },
  { category: 'Science', question: 'An egg’s shell is what percentage of its total weight?', answers: ['2%', '8%', '12%'], correctAnswer: '12%', score: 100 },

  // Category 3: Music
  { category: 'Music', question: 'Who was the very first American Idol winner?', answers: ['Kelly Clarkson', 'Ryan Starr', 'Hilary Duff'], correctAnswer: 'Kelly Clarkson', score: 100 },
  { category: 'Music', question: 'Before Miley Cyrus recorded “Wrecking Ball,” it was offered to which singer?', answers: ['Alicia Keys', 'Beyoncé', 'Leona Lewis'], correctAnswer: 'Beyoncé', score: 100 },
  { category: 'Music', question: 'What rock icon was the founder of The Society for the Prevention of Cruelty to Long-haired Men?', answers: ['David Bowie', 'Peter Frampton', 'Mick Jagger'], correctAnswer: 'David Bowie', score: 100 },
  { category: 'Music', question: 'Eminem‘s 8 Mile is named after a road in which city?', answers: ['Chicago', 'San Fran', 'Detroit'], correctAnswer: 'Detroit', score: 100 },
  { category: 'Music', question: 'Who was the first woman ever inducted into the Rock and Roll Hall of Fame?', answers: ['Janice Joplin', 'Aretha Franklin', 'Pat Benatar'], correctAnswer: 'Aretha Franklin', score: 100 },
  { category: 'Music', question: 'Paul McCartney and John Lennon wrote which Rolling Stones song?', answers: ['I Wanna Be Your Man', 'Let’s spend the night together', 'Ruby Tuesday'], correctAnswer: 'I Wanna Be Your Man', score: 100 },
  { category: 'Music', question: 'Which classical composer was deaf?', answers: ['Wolfgang Amadeux Mozart', 'Ludwig van Beethoven', 'Johann Sebastian Bach'], correctAnswer: 'Ludwig van Beethoven', score: 100 },
  { category: 'Music', question: 'Prince introduced his iconic symbol on the cover of which single?', answers: ['Purple Rain', 'Little red corvette', '1999'], correctAnswer: '1999', score: 100 },
  { category: 'Music', question: 'What does Lady Gaga affectionately call her fans?', answers: ['Superheroes', 'Little Monsters', 'Gaga fans'], correctAnswer: 'Little Monsters', score: 100 },
  { category: 'Music', question: 'Who sang the Spongebob Squarepants theme song for the movie?', answers: ['Avril Lavigne', 'Hilary Duff', 'Miley Cyrus'], correctAnswer: 'Avril Lavigne', score: 100 },

  // Category 4: Nature
  { category: 'Nature', question: 'What part of the plant conducts photosynthesis?', answers: ['Stem', 'Flower', 'Leaf'], correctAnswer: 'Leaf', score: 100 },
  { category: 'Nature', question: 'What is the largest known land animal?', answers: ['Hippopotamus', 'Elephant', 'Giraffe'], correctAnswer: 'Elephant', score: 100 },
  { category: 'Nature', question: 'How many bones do sharks have in total?', answers: ['0 bones', '3 bones', '12 bones'], correctAnswer: '0 bones', score: 100 },
  { category: 'Nature', question: 'Dolly was the first ever living creature to be cloned. What type of animal was she?', answers: ['Sheep', 'Mouse', 'Worm'], correctAnswer: 'Sheep', score: 100 },
  { category: 'Nature', question: 'What is the tallest type of grass?', answers: ['Northwind switch grass', 'Pampas grass', 'Bamboo'], correctAnswer: 'Bamboo', score: 100 },
  { category: 'Nature', question: 'What type of tree do acorns come from?', answers: ['Oak', 'Red maple', 'Sugar maple'], correctAnswer: 'Oak', score: 100 },
  { category: 'Nature', question: 'What is the hardest known material in nature?', answers: ['Topaz', 'Corundum', 'Diamond'], correctAnswer: 'Diamond', score: 100 },
  { category: 'Nature', question: 'How old is the oldest living tree?', answers: ['4800 years', '8100 years', '1300 years'], correctAnswer: '4800 years', score: 100 },
  { category: 'Nature', question: 'Where is the oldest living tree located?', answers: ['California, USA', 'British Columbia, CA', 'Canterbury, NZ'], correctAnswer: 'California, USA', score: 100 },
  { category: 'Nature', question: 'How many hearts does an octopus have?', answers: ['1', '2', '3'], correctAnswer: '3', score: 100 },
];

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const Timer = ({ seconds, onTimeUp }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timerId);
    } else{
      onTimeUp();
    }
  }, [time, onTimeUp]);

  return <div className="timer">{time}</div>;
};

const QuestionCard = ({ data, onAnswerSelected }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelected(answer === data.correctAnswer, data.score);
  };

  return (
      <div className={`question-card ${data.category}`}>
        <div className="question">{data.question}</div>
        <div className="answers">
          {data.answers.map((answer, index) => (
              <button
                  key={index}
                  className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={selectedAnswer !== ''}>
                {answer}
              </button>
          ))}
        </div>
      </div>
  );
};

const ScoreDisplay = ({ score }) => {
  const scoreClass = score >= 0 ? 'positive' : 'negative';
  return (
      <div className={`score-display ${scoreClass}`}>
        Score: {score}
      </div>
  );
};

const App = () => {
  const [questions, setQuestions] = useState(shuffleArray(triviaData));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  const handleAnswerSelection = (isCorrect, questionScore) => {
    if (isCorrect) {
      setScore(score + questionScore);
    } else {
      setScore(score - questionScore);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const handlePass = () => {
    if (!hasPassed) {
      setHasPassed(true);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      goToNextQuestion();
    }
  };

  const handleTimeUp = () => {
    setScore(score - questions[currentQuestionIndex].score);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
    goToNextQuestion();
  };

  const restartGame = () => {
    setQuestions(shuffleArray(triviaData));
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
            <div className="game-area">
              <QuestionCard
                  data={questions[currentQuestionIndex]}
                  onAnswerSelected={handleAnswerSelection}
              />
              <Timer seconds={60} onTimeUp={handleTimeUp}/>
              {!hasPassed && <button onClick={handlePass}>PASS</button>} {/* PASS button */}
            </div>
        )}
      </div>
  );
};

export default App;