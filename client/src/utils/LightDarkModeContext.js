import { createContext, useState, useContext } from "react";

const LightDarkModeContext = createContext();

export const LightDarkModeProvider = ({children}) => {
    const [isLightMode, setIsLightMode] = useState(true);

    const toggleMode = () => {
        setIsLightMode(prevMode => !prevMode);
    };

    return (
        <LightDarkModeContext.Provider value={{ isLightMode, toggleMode }}>
            {children}
        </LightDarkModeContext.Provider>
    );
};

export const useLightDarkMode = () => useContext(LightDarkModeContext);