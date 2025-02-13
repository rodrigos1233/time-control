
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
    // Detect user language (e.g., via headers or cookies)
    const locale = "en"; // Set default locale (change if needed)

    return {
        locale,
        messages: (await import(`@/messages/${locale}.json`)).default,
    };
});