import { useLoaderData, useOutlet } from "react-router-dom";
import { ThemeProvider } from "../hooks/useTheme";

export const ThemeLayout = () => {
    const outlet = useOutlet();

    return (
        <ThemeProvider>{outlet}</ThemeProvider>
    );
};