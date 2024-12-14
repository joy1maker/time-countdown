import { useRef, useState } from "react";
import "./timer-challenge.styles.css"
import ResultModal from "../../modals/result.modal";
import { flushSync } from "react-dom";

type TimerChallengeProps = {
    title: string;
    targetTime: number;
}
const TimerChallenge = ({ title, targetTime }: TimerChallengeProps) => {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const [lastClickTime, setLastClickTime] = useState<number | null>(null);
    const [timeDifference, setTimeDifference] = useState<number>(0);
    const timer = useRef<number>(0);
    const currentTime = useRef<number>(0);
    const modal = useRef<{ open: () => void; }>(null);

    const handelStart = () => {
        currentTime.current = Date.now();
        setLastClickTime(Date.now());
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            modal.current?.open();
            handelStop();
        }, targetTime * 1000);
        setTimerStarted(true);
    }
    const handelStop = () => {
        if (lastClickTime) {
            console.log(lastClickTime)
            currentTime.current = Date.now();
            const diff = Date.now() - lastClickTime;
            flushSync(() => {
                setTimeDifference(diff);
            })
            modal.current?.open();
            console.log("setTimeDifference", diff);

            console.log("open", diff);
        }
        clearTimeout(timer.current);

    }
    const resetValues = () => {
        setTimerStarted(false);
        setTimerExpired(false);
        setLastClickTime(null);
        setTimeDifference(0);
    }

    return (
        <>

            <ResultModal targetTime={targetTime} ref={modal} timediff={timeDifference} timerExpired={timerExpired} resetValues={resetValues} />
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired && <p>you lost</p>}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 'S' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handelStop : handelStart}>
                        {timerStarted ? "stop" : "start"} challenge
                    </button>
                </p>
                <p className={timerStarted ? "active" : ""}>
                    {timerStarted ? "time runing ......" : "time inactive"}
                </p>
            </section>
        </>

    )
}
export default TimerChallenge