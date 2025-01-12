"use client";
import {useEffect, useRef, useState} from "react";

type Option = {
    label: React.ReactNode;
}


type selectorProps = {
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    options: Option[];
}

export default function Selector({selectedIndex, setSelectedIndex, options}: selectorProps) {
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [optionStyles, setOptionStyles] = useState({ left: 0, width: 0 });

    function handleClick(index: number) {
        setSelectedIndex(index);
    }

    useEffect(() => {
        function updateOptionStyles() {
            const selectedElement = optionRefs.current[selectedIndex];
            if (selectedElement) {
                const { offsetLeft, offsetWidth } = selectedElement;
                setOptionStyles({ left: offsetLeft, width: offsetWidth });
            }
        }

        updateOptionStyles(); // Initial calculation
        window.addEventListener("resize", updateOptionStyles);

        return () => {
            window.removeEventListener("resize", updateOptionStyles);
        };
    }, [selectedIndex, options]);


    return (
        <div className="flex bg-black/[.05] rounded-xl p-1 relative border-4 border-black/[.10] gap-1 w-full">
            <div className="z-10 absolute bg-amber-500 rounded-lg transition-all" style={{ left: `${optionStyles.left}px`, width: `${optionStyles.width}px`, height: 'calc(100% - 0.5rem)' }}></div>
            {options.map((option, index) => (
                <div
                    key={index}
                    ref={el => { optionRefs.current[index] = el; }}
                    className={`${selectedIndex === index ? "hover:bg-transparent cursor-default" : "hover:bg-amber-200 bg-transparent"} relative z-20 rounded-lg px-6 py-4 text-sm sm:text-base text-center flex-grow cursor-pointer`}
                    onClick={() => handleClick(index)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    );
}
