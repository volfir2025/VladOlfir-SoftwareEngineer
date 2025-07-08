import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

/* COMPONENTS: */
import Layout from "./components/Layout"

/* PAGES: */
import Home from "./pages/Home"
import Resume from "./pages/Resume"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"

/* STYLES: */
import './App.css'

export type ResumeContextType = {
    visibleResumeSections: FormDataEntryValue[] | string;
    setVisibleResumeSections: React.Dispatch<React.SetStateAction<FormDataEntryValue[] | string>>;
};

interface ThemeContextType {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context for managing resume sections visibility:
const ResumeContext = React.createContext<ResumeContextType | undefined>(undefined);
export { ResumeContext }

//Create a context for managing theme (light/dark mode):
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
export { ThemeContext }

function App() {
    //Display all resume sections by default:
    const [visibleResumeSections, setVisibleResumeSections] = React.useState<string | FormDataEntryValue[]>("all")

    //Dark mode state:
    const [darkMode, setDarkMode] = React.useState<boolean>(false);

    React.useEffect((): void => {
        document.body.className = darkMode ? "dark-theme" : "light-theme";
    }, [darkMode]);


    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <ResumeContext.Provider value={{ visibleResumeSections, setVisibleResumeSections }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="resume" element={<Resume />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ResumeContext.Provider>
        </ThemeContext.Provider>
    )
}

export default App
