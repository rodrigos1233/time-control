"use client";
import {useEffect, useState} from "react";
import DigitalClock from "@/app/components/clock/DigitalClock";
import Button from "@/app/components/button/Button";
import EndScreen from "@/app/components/clock/EndScreen";
import Rewind from "@/app/assets/svg/rewind.svg";
import Close from "@/app/assets/svg/close.svg";
import {useTranslations} from "next-intl";

type selectorProps = {
    fullRoundDuration: number;
    subdivisions: number;
    startTime: Date;
    isFinished: boolean;
    handleRestart: () => void;
    setIsInProgress: (isInProgress: boolean) => void;
    isPaused: boolean;
    finishTime: Date;
}

export default function Clock({fullRoundDuration, subdivisions, startTime, isFinished, handleRestart, setIsInProgress, isPaused, finishTime}: selectorProps) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [pausedDuration, setPausedDuration] = useState(0);
    const [pausedAt, setPausedAt] = useState<number | null>(null);
    const t = useTranslations();

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isPaused) {
            setPausedAt(new Date().getTime());
        }

        if (!isPaused) {
            interval = setInterval(() => {
                setCurrentTime(new Date());
            }, 1000);

            if (pausedAt) {
                setPausedDuration(pausedDuration + new Date().getTime() - pausedAt);
                setPausedAt(null);
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPaused]);

    useEffect(() => {
        setPausedAt(null);
        setPausedDuration(0);
    }, [isFinished])


    const timePassed = currentTime.getTime() - startTime.getTime() - pausedDuration;
    const timeRemaining = finishTime.getTime() - currentTime.getTime();
    const timePerSubdivision = fullRoundDuration / subdivisions;
    const remainingTimePerSubdivision = timePerSubdivision - (timePassed % timePerSubdivision);

    const progress = (timePassed / fullRoundDuration) * 100;
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);

    const subdivisionMinutes = Math.floor(remainingTimePerSubdivision / 60000);
    const subdivisionSeconds = Math.floor((remainingTimePerSubdivision % 60000) / 1000);

    return (
        <>
            <div
                className={`flex justify-center items-center border-4 ${isFinished ? `border-greenButtonBackground bg-greenButtonBackground` : `border-foreground`} transition-all rounded-full relative w-96 aspect-square max-w-[90vw] overflow-hidden`}
            >
                {
                    !isFinished && (
                        <>
                            <div
                                className="w-4 flex h-4 bg-foreground rounded-full justify-center items-center"
                                style={{
                                    rotate: `${progress * 360 / 100}deg`,
                                    transition: "rotate ease-in-out 1s",
                                }}
                            >
                                <div
                                    className=" w-0 h-[135px] border-2 border-foreground relative"
                                    style={{
                                        translate: "0 -3.5rem",
                                    }}
                                >
                                </div>
                            </div>
                            {new Array(subdivisions).fill(0).map((_, index) => (
                                <div
                                    key={index}
                                    className={`absolute w-full h-full flex justify-center`}
                                    style={{
                                        rotate: `${index * 360 / subdivisions}deg`,
                                    }}
                                >
                                    <div
                                        className={`absolute w-0 h-6 border-2 border-foreground `}
                                    />
                                </div>
                            ))}
                        </>
                    )
                }
                {
                    isFinished && (
                        <EndScreen />
                    )
                }

            </div>
            <div className="h-32 flex flex-col justify-center items-center">
                {isFinished && (
                    <div className="flex gap-3">
                        <Button onClick={handleRestart} className={`flex items-center gap-3`}>
                            <Rewind width={25} height={25}/>
                            {t("restartButton")}
                        </Button>
                        <Button onClick={()=>setIsInProgress(false)} color={"red"} className={`flex items-center gap-3`}>
                            <Close width={25} height={25}/>
                            {t("backButton")}
                        </Button>
                    </div>
                )}
                {!isFinished && (
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <DigitalClock minutes={minutes} seconds={seconds} size="big"/>
                        <DigitalClock minutes={subdivisionMinutes} seconds={subdivisionSeconds} size="small"/>
                    </div>
                )}
            </div>

        </>

    );
}
