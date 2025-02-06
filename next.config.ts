import { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {

    webpack(config) {
        const rules = config.module.rules as RuleSetRule[];

        const fileLoaderRule = rules.find(
            (rule): rule is RuleSetRule =>
                rule.test instanceof RegExp && rule.test.test('.svg')
        );

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/i;
        }

        rules.push({
            test: /\.svg$/i,
            issuer: /\.(js|ts)x?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },

    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ['en-gb', 'fr'],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: 'en-gb',
    },
};

export default nextConfig;