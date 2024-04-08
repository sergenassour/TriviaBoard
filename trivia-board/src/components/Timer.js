import React, {useEffect, useState} from "react";

const Timer = ({ seconds, onTimeUp, resetTimer }) => {
    const [time, setTime] = useState(seconds);

    useEffect(() => {
        if (!resetTimer) return;
        setTime(seconds);
        const timerId = setInterval(() => {
            setTime((t) => {
                if (t === 1) {
                    clearInterval(timerId);
                    onTimeUp();
                }
                return t-1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [resetTimer, onTimeUp, seconds]);

    return <div className="timer">{time}</div>;
};

export default Timer;