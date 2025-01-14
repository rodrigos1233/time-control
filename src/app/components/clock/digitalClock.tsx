type digitalClockProps = {
    minutes: number;
    seconds: number;
    size: 'big' | 'small';
}

export default function DigitalClock({minutes, seconds, size}: digitalClockProps) {
    const displayedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    return (
        <div className={`text-center ${size === 'big' ? 'text-4xl' : 'text-2xl'} font-[family-name:var(--font-clock)] flex`}>
            {minutes.toString().split('').map((digit, index) => (
                <div key={index} className={`${size === 'big' ? 'w-4' : 'w-3'}`}>{digit}</div>
            ))}
            <div>:</div>
            {displayedSeconds.split('').map((digit, index) => (
                <div key={index} className={`${size === 'big' ? 'w-4' : 'w-3'}`}>{digit}</div>
            ))}
        </div>
    );
}
