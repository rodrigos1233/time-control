import Clock from "@/app/components/clock/Clock";
import { JSX } from "react";

type TimerDisplayProps = {
    isFinished: boolean;
    currentColor: string;
    lengthOptions: { label: string; value: number }[];
    selectedLengthOption: number;
    subdivisionOptions: { label: JSX.Element; value: number }[];
    selectedSubdivisionsOption: number;
    currentTime: Date;
    handleStart: () => void;
    setIsInProgress: (isInProgress: boolean) => void;
}

export default function TimerDisplay({ isFinished, currentColor, lengthOptions, selectedLengthOption, subdivisionOptions, selectedSubdivisionsOption, currentTime, handleStart, setIsInProgress }: TimerDisplayProps) {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 transition-colors"
            style={{ backgroundColor: `${!isFinished ? `${currentColor}` : 'var(--background)'}` }}
        >
            <Clock
                fullRoundDuration={lengthOptions[selectedLengthOption].value * 1000 * 60}
                subdivisions={subdivisionOptions[selectedSubdivisionsOption].value}
                startTime={currentTime}
                isFinished={isFinished}
                handleRestart={handleStart}
                setIsInProgress={setIsInProgress}
            />
        </div>
    );
}