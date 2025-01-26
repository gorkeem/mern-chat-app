import { create } from "zustand";

export const useThemeStore = create((set) => ({
    lightTheme: true,
    setLightTheme: (lightTheme) => {
        set({ lightTheme });
        document.documentElement.setAttribute(
            "data-theme",
            lightTheme ? "retro" : "dark"
        );
    },
}));
