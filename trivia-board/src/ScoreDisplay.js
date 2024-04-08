import React from "react";

const ScoreDisplay = ({ score }) => {
    const scoreClass = score >= 0 ? 'positive' : 'negative';
    return (
        <div className={`score-display ${scoreClass}`}>
            Score: {score}
        </div>
    );
};

export default ScoreDisplay;