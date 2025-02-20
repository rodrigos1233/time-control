import Clock from "@/app/components/clock/Clock";
import { subdivisionOptions } from "@/app/components/time-control/SubdivisionSelector";
import { lengthOptions } from "@/app/components/time-control/LengthSelector";
import PauseStopButtons from "@/app/components/time-control/PauseStopButtons";

type TimerDisplayProps = {
    isFinished: boolean;
    currentColor: string;
    selectedLengthOption: number;
    selectedSubdivisionsOption: number;
    startTime: Date;
    handleStart: () => void;
    setIsInProgress: (isInProgress: boolean) => void;
    isPaused: boolean;
    handlePause: () => void;
    handleResume: () => void;
    handleStop: () => void;
    finishTime: Date;
}

export default function TimerDisplay({ finishTime, isFinished, currentColor, selectedLengthOption, selectedSubdivisionsOption, startTime, handleStart, setIsInProgress, handlePause, handleResume, handleStop, isPaused }: TimerDisplayProps) {
    const subdivisions = subdivisionOptions[selectedSubdivisionsOption]
    const lengthInMinutes = lengthOptions[selectedLengthOption]

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 transition-colors"
            style={{ backgroundColor: `${!isFinished ? `${currentColor}` : 'var(--background)'}` }}
        >
            <Clock
                fullRoundDuration={lengthInMinutes * 1000 * 60}
                subdivisions={subdivisions}
                startTime={startTime}
                isFinished={isFinished}
                handleRestart={handleStart}
                setIsInProgress={setIsInProgress}
                isPaused={isPaused}
                finishTime={finishTime}
            />
            {!isFinished && (
                <PauseStopButtons isPaused={isPaused} handlePause={handlePause} handleResume={handleResume} handleStop={handleStop} />
            )}
        </div>
    );
}