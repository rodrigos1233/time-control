import Selector from "@/app/components/selector/Selector";
import { useLengthText } from "@/app/hooks/useLengthText";

export const lengthOptions: number[] = [45, 30, 60, 15];

type LengthSelectorProps = {
    selectedLengthOption: number;
    setSelectedLengthOption: (index: number) => void;
}

export default function LengthSelector({ selectedLengthOption, setSelectedLengthOption }: LengthSelectorProps) {
    const lengthText = useLengthText();

    const options = lengthOptions.map((length) => {
        return {
            label: `${lengthText(length)}`,
        }
    });

    return (
        <Selector options={options} selectedIndex={selectedLengthOption} setSelectedIndex={setSelectedLengthOption} />
    );
}