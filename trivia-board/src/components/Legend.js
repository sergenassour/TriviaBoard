import React from 'react';

const Legend = ({ categories }) => {
    return (
        <div className="legend">
            {Object.entries(categories).map(([category, color]) => (
                <div key={category} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: color }}></span>
                    <span className="legend-text">{category}</span>
                </div>
            ))}
        </div>
    );
};

export default Legend;