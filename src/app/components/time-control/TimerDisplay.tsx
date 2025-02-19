import Clock from "@/app/components/clock/Clock";
import { JSX } from "react";
import {subdivisionOptions} from "@/app/components/time-control/SubdivisionSelector";
import {lengthOptions} from "@/app/components/time-control/LengthSelector";

type TimerDisplayProps = {
    isFinished: boolean;
    currentColor: string;
    selectedLengthOption: number;
    selectedSubdivisionsOption: number;
    currentTime: Date;
    handleStart: () => void;
    setIsInProgress: (isInProgress: boolean) => void;
}

export default function TimerDisplay({ isFinished, currentColor, selectedLengthOption, selectedSubdivisionsOption, currentTime, handleStart, setIsInProgress }: TimerDisplayProps) {
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
                startTime={currentTime}
                isFinished={isFinished}
                handleRestart={handleStart}
                setIsInProgress={setIsInProgress}
            />
        </div>
    );
}