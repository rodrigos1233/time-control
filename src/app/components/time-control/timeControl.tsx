"use client";
import {useState} from "react";
import Selector from "@/app/components/selector/selector";
import {lengthText} from "@/app/utils/lengthText";

export default function TimeControl() {
    const [selectedLengthOption, setSelectedLengthOption] = useState(0)
    const [selectedSubdivisionsOption, setSelectedSubdivisionsOption] = useState(0)

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
        <div className="flex flex-col gap-4">
            <Selector options={lengthOptions} selectedIndex={selectedLengthOption} setSelectedIndex={setSelectedLengthOption}/>
            <Selector options={subdivisionOptions} selectedIndex={selectedSubdivisionsOption} setSelectedIndex={setSelectedSubdivisionsOption}/>
        </div>
    );
}
