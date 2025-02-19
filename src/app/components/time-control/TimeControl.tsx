"use client";
import { useState, useEffect, JSX } from "react";
import TimerDisplay from "@/app/components/time-control/TimerDisplay";
import StartButton from "@/app/components/time-control/StartButton";
import SubdivisionSelector, {subdivisionOptions} from "@/app/components/time-control/SubdivisionSelector";
import LengthSelector, {lengthOptions} from "@/app/components/time-control/LengthSelector";

export default function TimeControl() {
    const [selectedLengthOption, setSelectedLengthOption] = useState(0)
    const [selectedSubdivisionsOption, setSelectedSubdivisionsOption] = useState(0)
    const [isInProgress, setIsInProgress] = useState(false)
    const [currentSubdivision, setCurrentSubdivision] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isFinished, setIsFinished] = useState(false);
    const [selectedColors, setSelectedColors] = useState([0,1,2,3,4]);

    useEffect(() => {
        let wakeLock: WakeLockSentinel | null = null;

        const requestWakeLock = async () => {
            try {
                if ("wakeLock" in navigator) {
                    wakeLock = await navigator.wakeLock.request("screen");
                    console.log("Wake Lock is active");
                } else {
                    console.warn("Wake Lock API is not supported on this browser.");
                }
            } catch (err) {
                console.error("Wake Lock request failed:", err);
            }
        };

        if (isInProgress) {
            requestWakeLock();
        }

        return () => {
            if (wakeLock) {
                wakeLock.release().then(() => {
                    console.log("Wake Lock has been released");
                });
            }
        };
    }, [isInProgress]);

    const colors = [
        { dark: "003844", light: "70E5FF" },
        { dark: "006C67", light: "85FFF9" },
        { dark: "7E1037", light: "F194B4" },
        { dark: "664700", light: "FFB100" },
        { dark: "A36A00", light: "FFEBC6" },
        { dark: "05614F", light: "0FF4C6" },
        { dark: "1F32BE", light: "96A0EE" }
    ];

    function selectRandomColors(subdivisions: number): number[] {
        const indexes = new Set<number>();
        while (indexes.size < subdivisions + 2) {
            indexes.add(Math.floor(Math.random() * colors.length));
        }
        return Array.from(indexes);
    }

    useEffect(() => {
        const randomColors = selectRandomColors(selectedSubdivisionsOption)
        setSelectedColors(randomColors);

    }, [selectedSubdivisionsOption, isFinished])

    const currentColor = `#${window.matchMedia('(prefers-color-scheme: dark)').matches ? colors[selectedColors[currentSubdivision]].dark : colors[selectedColors[currentSubdivision]].light}`;

    const subdivisions = subdivisionOptions[selectedSubdivisionsOption];
    const length = lengthOptions[selectedLengthOption];

    function handleStart() {
        setIsInProgress(true);
        setIsFinished(false);
        setCurrentTime(new Date());

        setCurrentSubdivision(0);

        let current = 0;
        const interval = setInterval(() => {
            current += 1;

            if (current < subdivisions) {
                const cricketSound = document.getElementById("cricket_sound") as HTMLAudioElement;
                if (cricketSound) {
                    cricketSound.currentTime = 0;
                    cricketSound.play();
                }
            }

            setCurrentSubdivision(current);

            if (current >= subdivisions) {
                clearInterval(interval);
                setCurrentSubdivision(0);
                setIsFinished(true);

                const bellSound = document.getElementById("bell_sound") as HTMLAudioElement;
                if (bellSound) {
                    bellSound.currentTime = 0;
                    bellSound.play();
                }
            }
        }, length * 1000 * 60 / subdivisions);
    }

    return (
        <div className="flex flex-col gap-4 w-full justify-center">
            {!isInProgress && (
                <>
                    <LengthSelector selectedLengthOption={selectedLengthOption} setSelectedLengthOption={setSelectedLengthOption} />
                    <SubdivisionSelector selectedSubdivisionsOption={selectedSubdivisionsOption} setSelectedSubdivisionsOption={setSelectedSubdivisionsOption} selectedLengthOption={selectedLengthOption} />
                    <StartButton handleStart={handleStart}/>
                </>
            )}
            {isInProgress && (
                <TimerDisplay
                    isFinished={isFinished}
                    currentColor={currentColor}
                    selectedLengthOption={selectedLengthOption}
                    selectedSubdivisionsOption={selectedSubdivisionsOption}
                    currentTime={currentTime}
                    handleStart={handleStart}
                    setIsInProgress={setIsInProgress}
                />
                )
            }
            <audio id="bell_sound" src="/bell.mp3"/>
            <audio id="cricket_sound" src="/cricket.mp3"/>
        </div>
    );
}
