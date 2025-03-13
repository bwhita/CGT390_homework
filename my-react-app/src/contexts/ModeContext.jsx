import { createContext, useState } from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");

    return (
        <ModeContext.Provider value = {{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    )
};

export default ModeContext;

//export const useMode = () => useContext(ModeContext);