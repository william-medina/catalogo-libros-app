import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useState, useEffect } from 'react';

function Header() {
        
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; // Detectar preferencia de modo oscuro del sistema
    
    const [darkMode, setDarkMode] = useState(prefersDarkMode);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
        if (darkMode) {
            document.documentElement.classList.add('dark');
            link.href = '/icons/favicon-dark.svg'; 
        } else {
            document.documentElement.classList.remove('dark');
            link.href = '/icons/favicon-light.svg'; 
        }
    }, [darkMode]);

    return (
        <header className={`bg-n1 dark:bg-gray-800 py-5 shadow-md`}>
            <div className="max-w-screen-lg mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-0">
                <h1 className="text-white text-center text-2xl xxs:text-3xl sm:text-4xl font-extrabold">- Catálogo de Libros -</h1>
                <nav className="flex space-x-2 sm:space-x-4 text-sm sm:text-base">
                    <button onClick={() => handleScroll('searchSection')} className="text-white dark:text-gray-200 hover:underline">Buscar</button>
                    <button onClick={() => handleScroll('listSection')} className="text-white dark:text-gray-200 hover:underline">Lista</button>
                    <button onClick={() => handleScroll('statisticsSection')} className="text-white dark:text-gray-200 hover:underline">Estadísticas</button>
                    <button
                        onClick={toggleDarkMode}
                        className='pl-4 sm:pl-0'
                    >
                        {darkMode ? (
                            <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-1 text-gray-200" />
                        ) : (
                            <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-1 text-white" /> 
                        )}
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header;
