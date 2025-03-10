export default {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust the paths as necessary for your project
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                hindi: ["Noto Sans Devanagari", "Arial", "sans-serif"], // Added Hindi font support
            },
        },
    },
    plugins: [],
};
