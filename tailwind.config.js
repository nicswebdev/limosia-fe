/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        screens: {
            xs: "390px",
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            xxl: "1300px",
        },
        colors: {
            transparent: "transparent",
            white: "#FFFFFF",
            black: "#000000",
            "black-2": "#1E1E1E",
            gray: {
                dark: "#868686", // For text
                light: "#F1F1F1", // For background
            },
            orange: {
                dark: "#FE5B02", // For text
                light: "#ED7A48", // For background
            },
            blue: {
                dark: "#285CA7", // For icons TODO Need to confirm whether to use #285CA7 (found in figma) or #77D0E5 (informed in WhatsApp)
                light: "#1BA0E2", // For button and text
            },
        },

        fontFamily: {
            karla: ["Karla", "sans-serif"],
            raleway: ["Raleway", "sans-serif"],
        },
    },
    plugins: [
        function ({addComponents}) {
            addComponents({
                ".main-container": {
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    width: "100%",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    marginLeft: "auto",
                    marginRight: "auto",

                    "@screen sm": {
                        maxWidth: "540px",
                        paddingLeft: "0",
                        paddingRight: "0",
                    },
                    "@screen md": {
                        maxWidth: "720px",
                    },
                    "@screen lg": {
                        maxWidth: "960px",
                        flexDirection: "row",
                    },
                    "@screen xl": {
                        maxWidth: "1152px",
                    },
                    "@screen xxl": {
                        maxWidth: "1278px",
                    },
                },

                ".sidebar": {
                    flex: "0 0 100%",
                    paddingBottom: "40px",

                    "@screen lg": {
                        flex: "0 0 calc((100% - 20px) * 25 / 100)",
                        paddingBottom: "0",
                    },
                    "@screen xxl": {
                        flexBasis: "304px",
                    },
                },
                ".main-content": {
                    flex: "0 0 100%",
                    "@screen lg": {
                        flex: "0 0 calc((100% - 20px) * 75 / 100)",
                    },
                    "@screen xxl": {
                        flexBasis: "954px",
                    },
                },
            });
        },
    ],
};
