import { MutableRefObject, useImperativeHandle, useRef, useState } from "react";

interface dialogRef {
    open: () => void;
}
type ResultModalProps = {
    targetTime: number
    ref: MutableRefObject<dialogRef>
    timediff: number;
    timerExpired: boolean;
    resetValues: () => void
}

const ResultModal = ({ targetTime, ref, timediff, timerExpired, resetValues }: ResultModalProps) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const [timeDiffrence, setTimeDiffrence] = useState<number>(100);
    useImperativeHandle(ref, () => {
        return {
            open() {
                setTimeDiffrence((targetTime * 1000 - timediff) / 1000);
                dialog.current?.showModal();

            }

        }

    })
    return (
        <dialog className="result-modal" ref={dialog}>
            <h2>You {timerExpired ? "lost" : "won !!"}</h2>
            <p>the target time was <strong>{targetTime} seconds.</strong></p>
            {
                timerExpired
                    ?
                    <p>your time has expired</p>
                    :
                    <p>you stopped the timer with <strong>{timeDiffrence ?? "X"} seconds left.</strong></p>
            }
            <form method="dialog">
                <button onClick={resetValues}>close</button>
            </form>
        </dialog>
    )
}
export default ResultModal;