import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers' // Import Next.js headers

const supportedLocales = ['en', 'fr']
const defaultLocale = 'en'

export default getRequestConfig(async () => {
  const requestHeaders = await headers()
  const acceptLanguage = requestHeaders.get('accept-language') || ''

  // Extract preferred language (e.g., "fr-CH" → "fr")
  const userPreferredLocale = acceptLanguage.split(',')[0].split('-')[0]

  // Use detected language if supported, otherwise fallback to default
  const locale = supportedLocales.includes(userPreferredLocale)
    ? userPreferredLocale
    : defaultLocale

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
