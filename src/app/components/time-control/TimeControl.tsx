"use client";
import { useState, useEffect } from "react";
import TimerDisplay from "@/app/components/time-control/TimerDisplay";
import StartButton from "@/app/components/time-control/StartButton";
import SubdivisionSelector, { subdivisionOptions } from "@/app/components/time-control/SubdivisionSelector";
import LengthSelector, { lengthOptions } from "@/app/components/time-control/LengthSelector";

export default function TimeControl() {
    const [selectedLengthOption, setSelectedLengthOption] = useState(0);
    const [selectedSubdivisionsOption, setSelectedSubdivisionsOption] = useState(0);
    const [isInProgress, setIsInProgress] = useState(false);
    const [currentSubdivision, setCurrentSubdivision] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isFinished, setIsFinished] = useState(false);
    const [selectedColors, setSelectedColors] = useState([0,1,2,3,4]);
    const [subdivisionTimes, setSubdivisionTimes] = useState<number[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [pausedAt, setPausedAt] = useState<number | null>(null);

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
        if (isInProgress) requestWakeLock();
        return () => {
            if (wakeLock) wakeLock.release().then(() => console.log("Wake Lock has been released"));
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
        setSelectedColors(selectRandomColors(selectedSubdivisionsOption));
    }, [selectedSubdivisionsOption, isFinished]);

    const safeIndex = Math.min(currentSubdivision, selectedColors.length - 1);
    const currentColor = `#${window.matchMedia('(prefers-color-scheme: dark)').matches ? colors[selectedColors[safeIndex]].dark : colors[selectedColors[safeIndex]].light}`;
    const subdivisions = subdivisionOptions[selectedSubdivisionsOption];
    const length = lengthOptions[selectedLengthOption];
    const subdivisionDuration = (length * 1000 * 60) / subdivisions;

    function handlePause() {
        setPausedAt(Date.now());
        setIsPaused(true);
    }

    function handleResume() {
        if (pausedAt === null) return;
        const now = Date.now();
        const timePaused = now - pausedAt;
        setSubdivisionTimes(prev => prev.map(time => time + timePaused));
        setPausedAt(null);
        setIsPaused(false);
    }

    function handleStop() {
        setIsInProgress(false);
        setIsFinished(false);
        setPausedAt(null);
        setCurrentSubdivision(0);
        setSubdivisionTimes([]);
    }

    function handleStart() {
        if (pausedAt !== null) {
            handleResume();
            return;
        }
        const now = Date.now();
        setIsInProgress(true);
        setIsFinished(false);
        setCurrentTime(new Date());
        setCurrentSubdivision(0);
        setSubdivisionTimes(Array.from({ length: subdivisions }, (_, i) => now + subdivisionDuration * (i + 1)));
    }

    let lastPlayedSubdivision = -1;

    function playCricketSound() {
        const cricketSound = document.getElementById("cricket_sound") as HTMLAudioElement | null;
        if (cricketSound) {
            cricketSound.pause();
            cricketSound.currentTime = 0;
            cricketSound.play().then(() => {
            }).catch(err => console.error("Error playing cricket sound:", err));
        } else {
            console.error("Cricket sound element not found");
        }
    }

    function playBellSound() {
        const bellSound = document.getElementById("bell_sound") as HTMLAudioElement | null;
        if (bellSound) {
            bellSound.currentTime = 0;
            bellSound.play();
        }
    }

    useEffect(() => {
        if (!isInProgress || subdivisionTimes.length === 0) return;
        if (isPaused) return;
        const interval = setInterval(() => {
            const now = Date.now();
            const newSubdivision = subdivisionTimes.findIndex(time => now < time);

            if (newSubdivision !== currentSubdivision && newSubdivision >= 0 && newSubdivision < subdivisions) {
                setCurrentSubdivision(newSubdivision); // Update state first
                if (newSubdivision !== lastPlayedSubdivision) {
                    playCricketSound(); // Play sound only when subdivision changes
                    lastPlayedSubdivision = newSubdivision;
                }
            }

            if (newSubdivision === subdivisions || newSubdivision === -1) {
                playBellSound();
                setCurrentSubdivision(0);
                setIsFinished(true);
                setSubdivisionTimes([]);
                clearInterval(interval);
            }
        }, 100);


        return () => clearInterval(interval);
    }, [isInProgress, subdivisionTimes, isPaused]);

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
                    startTime={currentTime}
                    isPaused={isPaused}
                    handlePause={handlePause}
                    handleResume={handleResume}
                    handleStop={handleStop}
                    isFinished={isFinished}
                    currentColor={currentColor}
                    selectedLengthOption={selectedLengthOption}
                    selectedSubdivisionsOption={selectedSubdivisionsOption}
                    handleStart={handleStart}
                    setIsInProgress={setIsInProgress}
                    finishTime={new Date(subdivisionTimes[subdivisions - 1])}
                />
            )}
            <audio id="bell_sound" src="/bell.mp3"/>
            <audio id="cricket_sound" src="/cricket.mp3"/>
        </div>
    );
}
