import React, {useEffect, useState} from "react";

const Timer = ({ seconds, onTimeUp, resetTimer }) => {
    const [time, setTime] = useState(seconds);

    useEffect(() => {
        setTime(seconds);
    }, [resetTimer, seconds]);

    useEffect(() =>{
        if (time > 0) {
            const timerId = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timerId);
        } else{
            onTimeUp();
        }
    }, [time, onTimeUp]);

    return <div className="timer">{time}</div>;
};

export default Timer;