"use client";
import {useState} from "react";
import Selector from "@/app/components/selector/selector";
import {lengthText} from "@/app/utils/lengthText";
import Clock from "@/app/components/clock/clock";

export default function TimeControl() {
    const [selectedLengthOption, setSelectedLengthOption] = useState(0)
    const [selectedSubdivisionsOption, setSelectedSubdivisionsOption] = useState(0)
    const [isInProgress, setIsInProgress] = useState(false)
    const [currentSubdivision, setCurrentSubdivision] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    const colorsOptions = [
        "003844",
        "006C67",
        "F194B4",
        "FFB100",
        "FFEBC6"
    ]

    const lengthOptions = [
        {
            label: "45 Minutes",
            value: 45
        },
        {
            label: "30 Minutes",
            value: 30
        },
        {
            label: "60 Minutes",
            value: 60
        }
    ]

    function handleStart() {
        setIsInProgress(true)
        let current = 0;
        setCurrentTime(new Date());

        const interval = setInterval(() => {
            setCurrentSubdivision(current);
            current += 1;

            if (current >= subdivisionOptions[selectedSubdivisionsOption].value) {
                clearInterval(interval);
                setIsInProgress(false);
            }
        }, lengthOptions[selectedLengthOption].value * 1000 * 60 / subdivisionOptions[selectedSubdivisionsOption].value);
    }

    const subdivisionOptions = [
        {
            label:
                <div className="flex flex-col items-center gap-1 justify-center">
                    <span>{`2 subdivisions`}</span>
                    <span>{`${lengthText(lengthOptions[selectedLengthOption].value / 2)} each`}</span>
                </div>,
            value: 2,
        },
        {
            label:
                <div className="flex flex-col items-center gap-1 justify-center">
                    <span>{`3 subdivisions`}</span>
                    <span>{`${lengthText(lengthOptions[selectedLengthOption].value / 3)} each`}</span>
                </div>,
            value: 3,
        },
        {
            label:
                <div className="flex flex-col items-center gap-1 justify-center">
                    <span>{`4 subdivisions`}</span>
                    <span>{`${lengthText(lengthOptions[selectedLengthOption].value / 4)} each`}</span>
                </div>,
            value: 4,
        },
    ]

    return (
        <div className="flex flex-col gap-4 w-full">
            {!isInProgress && (
                <>
                    <Selector options={lengthOptions} selectedIndex={selectedLengthOption} setSelectedIndex={setSelectedLengthOption}/>
                    <Selector options={subdivisionOptions} selectedIndex={selectedSubdivisionsOption} setSelectedIndex={setSelectedSubdivisionsOption}/>
                    <button onClick={handleStart} className="bg-lime-600 rounded-lg px-6 py-4 text-sm sm:text-base text-center flex-grow cursor-pointer">Start</button>
                </>
            )}
            {isInProgress && (
                <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 transition-colors" style={{ backgroundColor: `#${colorsOptions[currentSubdivision]}` }}>
                    <Clock
                        fullRoundDuration={lengthOptions[selectedLengthOption].value * 1000 * 60}
                        subdivisions={subdivisionOptions[selectedSubdivisionsOption].value}
                        startTime={currentTime}
                    />
                </div>
                )
            }
        </div>
    );
}
