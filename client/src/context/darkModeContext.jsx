import { createContext, useEffect, useState } from "react";

export const DarkModeContext=createContext();

export const DarkModeContextProvider=({children})=>{
    const [darkMode, setDarkMode]=useState(JSON.parse(localStorage.getItem("darkMode"))||false); //parsing coz browser return string

    const toggle=()=>{
        setDarkMode((prev)=>!prev);
    }

    useEffect(()=>{
        localStorage.setItem("darkMode", darkMode);
    },[darkMode]);

    return(
        <DarkModeContext.Provider value={{darkMode, toggle}}>
            {children}
        </DarkModeContext.Provider>
    )

}