export function lengthText(lengthMinutes: number) {
    if (Number.isInteger(lengthMinutes)) {
        return `${lengthMinutes} minutes`
    }

    const minutes = Math.floor(lengthMinutes);
    const secondsDecimal = lengthMinutes - minutes;
    const seconds = secondsDecimal * 60;
    return `${minutes} min ${seconds < 10 ? "0" : ""}${Math.round(seconds)}s`
}