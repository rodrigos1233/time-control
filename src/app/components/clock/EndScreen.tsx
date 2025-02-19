"use client";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import CheckMark from "@/app/assets/svg/checkMark.svg"
import CricketBlue from "@/app/assets/images/cricket-blue.png"
import CricketYellow from "@/app/assets/images/cricket-yellow.png"
import Image from "next/image";

export default function EndScreen() {
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowImage(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full">
            {!showImage && (
                <motion.div
                    initial={{opacity: 1, scale: 1}}
                    animate={{opacity: 0, scale: 1.2}}
                    transition={{duration: 1.5, ease: "easeInOut"}}
                    className="absolute flex justify-center items-center h-full w-full"
                >
                    <CheckMark width={200} height={200}/>
                </motion.div>
            )}
            {showImage && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.5, ease: "easeInOut"}}
                    className="absolute w-full h-full"
                >
                    <Image
                        src={CricketYellow}
                        alt="Cricket Image"
                        fill
                        className="object-cover dark:hidden"
                        priority
                    />
                    <Image
                        src={CricketBlue}
                        alt="Cricket Image"
                        fill
                        className="object-cover hidden dark:block"
                        priority
                    />
                </motion.div>
            )}
        </ div>
    );
}
