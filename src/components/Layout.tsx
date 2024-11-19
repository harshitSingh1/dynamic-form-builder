// src\components\Layout.tsx
import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import Header from "./Header";

const Layout: React.FC<{ children: [React.ReactNode, React.ReactNode] }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    return (
        <div className={`flex flex-col h-screen dark:bg-black dark:text-white ${darkMode && "dark"}`}>
            <Header /> {/* Adding the Header component */}
            <div className="flex flex-col md:flex-row flex-grow">
                <div className="h-1/2 md:h-full md:w-1/2 p-4 border-r animate-fade-in">
                    <button
                        onClick={toggleDarkMode}
                        className="absolute top-4 right-4 px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
                    >
                        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
                    </button>
                    {children[0]}
                </div>
                <div className="h-1/2 md:h-full md:w-1/2 p-4 overflow-y-auto animate-fade-in">
                    {children[1]}
                </div>
            </div>
        </div>
    );
};

export default Layout;


