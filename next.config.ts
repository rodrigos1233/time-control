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
};

export default nextConfig;