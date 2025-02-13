import { useTranslations } from "next-intl";

export function useLengthText() {
    const t = useTranslations();

    return (lengthMinutes: number) => {
        const minutes = Math.floor(lengthMinutes);
        const secondsDecimal = lengthMinutes - minutes;
        const seconds = Math.round(secondsDecimal * 60);

        if (minutes > 0 && seconds > 0) {
            return t("length.both", { minutes, seconds });
        } else if (minutes > 0) {
            return t("length.minutes", { minutes });
        } else {
            return t("length.seconds", { seconds });
        }
    };
}