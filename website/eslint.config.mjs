import nextConfig from "eslint-config-next";

const eslintConfig = [
    ...nextConfig,
    {
        languageOptions: {
            globals: {
                browser: true,
            },
        },
    },
];

export default eslintConfig;
