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

    const progress = Math.round(((currentTime.getTime() - startTime.getTime()) / fullRoundDuration) * 100000) / 100 * 3;

    console.log(progress);
    return (
        <div className="flex justify-center items-center rounded-full relative border-4 border-black w-96 aspect-square">
            <div className="w-4 flex h-4 bg-black rounded-full justify-center items-center">
                <div
                    className=" w-0 h-40 border-2 border-transparent relative"
                    style={{
                        translate: "0 -5rem",
                    }}
                >
                    <div
                        className="absolute w-0 h-full border-2 border-red"
                        style={{
                            rotate: `${progress * 360 / 100}deg`,
                            transformOrigin: "2px 100%",
                            transition: "rotate ease-in-out 1s",
                        }}
                    />
                </div>
            </div>
            {new Array(subdivisions).fill(0).map((_, index) => (
                <div
                    key={index}
                    className={`absolute w-0 h-6 border-2 border-black -translate-y-8`}
                    style={{
                        bottom: "20rem",
                        rotate: `${index * 360 / subdivisions}deg`,
                        transformOrigin: "2px 9.8rem",
                    }}
                />
            ))}

        </div>
    );
}
