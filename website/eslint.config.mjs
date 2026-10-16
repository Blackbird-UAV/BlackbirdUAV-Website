import nextConfig from "eslint-config-next";
import globals from "globals";

const eslintConfig = [
    ...nextConfig,
    {
        // eslint-config-next leaves no-undef off, so a misspelled or
        // missing identifier only showed up as a ReferenceError in the
        // browser. Pages run in the browser; configs and scripts in Node.
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-undef": "error",
        },
    },
];

export default eslintConfig;
