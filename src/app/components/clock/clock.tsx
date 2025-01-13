"use client";
import {useEffect, useRef, useState} from "react";

type selectorProps = {
    fullRoundDuration: number;
    subdivisions: number;
    startTime: Date;
}

export default function Clock({fullRoundDuration, subdivisions, startTime}: selectorProps) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const timePassed = currentTime.getTime() - startTime.getTime();

    const progress = (timePassed / fullRoundDuration) * 100;

    return (
        <div className="flex justify-center items-center rounded-full relative border-4 border-black w-96 aspect-square max-w-[90vw]">
            <div
                className="w-4 flex h-4 bg-black rounded-full justify-center items-center"
                style={{
                    rotate: `${progress * 360 / 100}deg`,
                    transition: "rotate ease-in-out 1s",
                }}
            >
                <div
                    className=" w-0 h-[135px] border-2 border-black relative"
                    style={{
                        translate: "0 -3.5rem",
                    }}
                >
                </div>
            </div>
            {new Array(subdivisions).fill(0).map((_, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full`}
                    style={{
                        rotate: `${index * 360 / subdivisions}deg`,
                    }}
                >
                    <div
                        className={`absolute w-0 h-6 border-2 border-black `}
                        style={{
                            left: `50%`,
                        }}
                    />
                </div>
            ))}

        </div>
    );
}
