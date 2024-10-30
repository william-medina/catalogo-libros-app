
function Footer() {

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-n1 dark:bg-gray-800 mt-10">
            <nav className="flex justify-center space-x-2 sm:space-x-4 h-14 pt-3 text-sm sm:text-base">
                <button onClick={() => handleScroll('top10Section')} className="text-white dark:text-gray-200 hover:underline">Top 10</button>
                <button onClick={() => handleScroll('searchSection')} className="text-white dark:text-gray-200 hover:underline">Buscar</button>
                <button onClick={() => handleScroll('listSection')} className="text-white dark:text-gray-200 hover:underline">Lista</button>
                <button onClick={() => handleScroll('statisticsSection')} className="text-white dark:text-gray-200 hover:underline">Estadísticas</button>
            </nav>
            <div className='flex justify-center py-5' translate="no">
                <img className='w-5 h-5 sm:w-6 sm:h-6 invert mx-1 sm:mx-2' src="/icons/laptop-code.svg" alt="Laptop Code Icon" />
                <p className='text-white text-[0.92rem] sm:text-[1.1rem] leading-[1.4]'>Developed by William Medina</p>
            </div>
        </footer>
    )
}

export default Footer