import { useEffect, useState } from "react";

const QuestionCard = ({ data, onAnswerSelected, isSelected, onCardSelect, isPassed }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        if (isPassed || !isSelected) {
            setSelectedAnswer('');
        }
    }, [data, isPassed, isSelected]);

    const handleAnswerClick = (answer) => {
        if (!isPassed) {
            setSelectedAnswer(answer);
            onAnswerSelected(answer === data.correctAnswer, data.score);
        }
    };

    const cardClasses = `question-card ${data.category} ${isPassed ? 'passed' : ''} ${isSelected ? 'selected' : ''}`;

    return (
        <div className={cardClasses} onClick={!isPassed ? () => onCardSelect() : undefined}>
            {isSelected && !isPassed ? (
                <div className="card-face-up">
                    <div className="question">{data.question}</div>
                    <div className="answers">
                        {data.answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}
                                onClick={() => handleAnswerClick(answer)}
                                disabled={selectedAnswer !== ''}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="card-face-down">
                    <div className="category">{data.category}</div>
                    <div className="points">{data.score} Points</div>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;