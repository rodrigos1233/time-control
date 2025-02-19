type digitalClockProps = {
    minutes: number;
    seconds: number;
    size: 'big' | 'small';
}

export default function DigitalClock({minutes, seconds, size}: digitalClockProps) {
    const displayedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    function renderDigits(value: string) {
        return (
            value.split('').map((digit, index) => (
                <div key={index} className={`${size === 'big' ? 'w-4' : 'w-3'}`}>{digit}</div>
            ))
        )
    }

    return (
        <div className={`text-center ${size === 'big' ? 'text-4xl' : 'text-2xl'} font-[family-name:var(--font-clock)] shadow-xl pt-3 pr-4 pl-4 pb-3 rounded-full flex bg-background`}>
            {renderDigits(minutes.toString())}
            <div>:</div>
            {renderDigits(displayedSeconds)}
        </div>
    );
}
