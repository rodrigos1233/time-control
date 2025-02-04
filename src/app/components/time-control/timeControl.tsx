"use client";
import {useState, useEffect} from "react";
import Selector from "@/app/components/selector/selector";
import {lengthText} from "@/app/utils/lengthText";
import Clock from "@/app/components/clock/clock";
import Image from 'next/image';
import Button from "@/app/components/button/button";
import Play from "@/app/assets/svg/play.svg";

export default function TimeControl() {
    const [selectedLengthOption, setSelectedLengthOption] = useState(0)
    const [selectedSubdivisionsOption, setSelectedSubdivisionsOption] = useState(0)
    const [isInProgress, setIsInProgress] = useState(false)
    const [currentSubdivision, setCurrentSubdivision] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isFinished, setIsFinished] = useState(false);

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

    const colorsOptions = [
        "003844",
        "006C67",
        "F194B4",
        "FFB100",
        "FFEBC6",
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
        },
        {
            label: "15 Minutes",
            value: 15
        }
    ]

    function handleStart() {
        setIsInProgress(true);
        setIsFinished(false);
        setCurrentTime(new Date());

        setCurrentSubdivision(0);

        let current = 0;
        const interval = setInterval(() => {
            current += 1;

            if (current < subdivisionOptions[selectedSubdivisionsOption].value) {
                const cricketSound = document.getElementById("cricket_sound") as HTMLAudioElement;
                if (cricketSound) {
                    cricketSound.currentTime = 0;
                    cricketSound.play();
                }
            }

            setCurrentSubdivision(current);

            if (current >= subdivisionOptions[selectedSubdivisionsOption].value) {
                clearInterval(interval);
                setIsFinished(true);

                const bellSound = document.getElementById("bell_sound") as HTMLAudioElement;
                if (bellSound) {
                    bellSound.currentTime = 0;
                    bellSound.play();
                }
            }
        }, lengthOptions[selectedLengthOption].value * 1000 * 60 / subdivisionOptions[selectedSubdivisionsOption].value);
    }


    const subdivisionOptions = [
        {
            label:
                <div className="flex flex-col items-center gap-1 justify-center">
                    <span className="flex gap-2">
                        <Image src={'/circle-2.svg'} alt={"2 subdivisions"} width={22} height={22} />
                        {`2`}
                    </span>
                    <span>{`${lengthText(lengthOptions[selectedLengthOption].value / 2)}`}</span>
                </div>,
            value: 2,
        },
        {
            label:
                <div className="flex flex-col items-center gap-1 justify-center">
                    <span className="flex gap-2">
                        <Image src={'/circle-3.svg'} alt={'3 subdivisions'}  width={22} height={22} />
                        {`3`}
                    </span>
                    <span>{`${lengthText(lengthOptions[selectedLengthOption].value / 3)}`}</span>
                </div>,
            value: 3,
        },
        {
            label:
                <div className="flex flex-col items-center gap-1 justify-center">
                    <span className="flex gap-2">
                        <Image src={'/circle-4.svg'} alt={"4 subdivisions"} width={22} height={22}/>
                        {`4`}
                    </span>
                    <span>{`${lengthText(lengthOptions[selectedLengthOption].value / 4)}`}</span>
                </div>,
            value: 4,
        },
    ]

    return (
        <div className="flex flex-col gap-4 w-full justify-center">
            {!isInProgress && (
                <>
                    <Selector options={lengthOptions} selectedIndex={selectedLengthOption} setSelectedIndex={setSelectedLengthOption}/>
                    <Selector options={subdivisionOptions} selectedIndex={selectedSubdivisionsOption} setSelectedIndex={setSelectedSubdivisionsOption}/>
                    <Button onClick={handleStart} className={`flex items-center gap-3 justify-center`}>
                        <Play width={25} height={25}/>
                        Start
                    </Button>
                </>
            )}
            {isInProgress && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 transition-colors"
                    style={{ backgroundColor: `${!isFinished ? `#${colorsOptions[currentSubdivision]}` : 'var(--background)'}` }}
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
                )
            }
            <audio id="bell_sound" src="/bell.mp3"/>
            <audio id="cricket_sound" src="/cricket.mp3"/>
        </div>
    );
}
