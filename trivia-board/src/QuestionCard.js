import {useEffect, useState} from "react";

const QuestionCard = ({ data, onAnswerSelected }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isFaceDown, setIsFaceDown] = useState(true);

    useEffect(() => {
        // Reset selected answer when the question changes
        setSelectedAnswer('');
        setIsFaceDown(true);
    }, [data]);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        onAnswerSelected(answer === data.correctAnswer, data.score);
    };

    const handleCardClick = () => {
        setIsFaceDown(false);
    }

    return (
        <div className={`question-card ${data.category}`} onClick={handleCardClick}>
            {isFaceDown ? (
                <div className="card-face-down">
                    <div className="category">{data.category}</div>
                    <div className="points">{data.score} Points</div>
                </div>
            ) : (
                <div className="card-face-up">
                    <div className="question">{data.question}</div>
                    <div className="answers">
                        {data.answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`answer $(selectedAnswer === answer ? 'selected' : ''}`}
                                onClick={() => handleAnswerClick(answer)}
                                disabled={selectedAnswer !== ''}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;