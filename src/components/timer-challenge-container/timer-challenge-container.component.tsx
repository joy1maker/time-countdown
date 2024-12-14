import TimerChallenge from "../timer-challenge/timer-challenge.component"
import "./timer-challenge-container.styles.css"
import challengeData from "../../assets/challenge-data"
const TimerChallengeContainer = () => {

    return (
        <div id="challenges">
            {challengeData.map((challenge, idx) => {
                const { targetTime, title } = challenge;
                return (<TimerChallenge key={idx} targetTime={targetTime} title={title} />)
            })}
        </div>
    )
}
export default TimerChallengeContainer