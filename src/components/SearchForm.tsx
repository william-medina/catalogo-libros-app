import { ChangeEvent, useState } from "react";
import { Author, Book } from "../types";
import { searchBookByTitle } from "../api/BookAPI";
import Loader from "./Loader";
import { searchAuthorByName } from "../api/AuthorAPI";
import { formatYear } from "../utils";


type SearchFormProps = {
    loadCatalogData: () => Promise<void>;
}

function SearchForm({loadCatalogData} : SearchFormProps) {
    
    const [searchType, setSearchType] = useState("Libro");
    const [searchText, setSearchText] = useState("");
    const [searchBookResults, setSearchBookResults] = useState<Book | null>(null);
    const [searchAuthorResults, setSearchAuthorResults] = useState<Author | null>(null);
    const [isSearching, setIsSearching] = useState(false); 

    const handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value);
    };
    
    const handleSearch = async () => {
        setIsSearching(true);
        setSearchBookResults(null);
        setSearchAuthorResults(null);

        try {
            if (searchType === "Libro") {
                const response = await searchBookByTitle(searchText);
                setSearchBookResults(response || null);
                await loadCatalogData(); 
            } else if (searchType === "Autor") {
                const response = await searchAuthorByName(searchText);
                setSearchAuthorResults(response || null);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <section className="rounded-lg bg-white dark:bg-gray-800 gap-5 md:gap-0 shadow-lg w-full min-h-[25rem] sm:min-h-[16rem] md:h-auto md:w-2/5 p-6 flex flex-col sm:flex-row md:flex-col items-center" id="searchSection">
            <form
                className="w-full flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
                <h2 className="text-center text-n1 dark:text-white text-xl font-semibold mb-5">- Buscar -</h2>
                <div className="flex gap-2 mb-4">
                    <select
                        value={searchType}
                        name="searchType"
                        onChange={handleSearchTypeChange}
                        className="w-[6rem] p-2 rounded-md border text-sm border-gray-300 dark:border-gray-600 focus:outline-none focus:border-n1 dark:focus:ring-gray-500 focus:ring-1 focus:ring-n1 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        disabled={isSearching}
                    >
                        <option value="Libro">Libro</option>
                        <option value="Autor">Autor</option>
                    </select>
                    <input
                        type="text"
                        value={searchText}
                        name="searchText"
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder={`Buscar por ${searchType.toLowerCase()}...`}
                        className="w-full p-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-n1 focus:ring-1 dark:focus:ring-gray-500 focus:ring-n1 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        disabled={isSearching}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`${isSearching ? 'cursor-wait bg-gray-500 dark:bg-gray-700' : 'cursor-pointer bg-n1 dark:bg-gray-500'} w-full  text-white text-sm py-2 rounded-md hover:brightness-90 font-medium duration-300`}
                    disabled={isSearching}
                >
                    Buscar {searchType}
                </button>
            </form>
            <div className="flex justify-center items-center w-full h-full mt-4">
                {isSearching && <Loader />}
                {!isSearching && searchBookResults && (
                    <div className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 shadow-md">
                        <h3 className="font-bold text-n1 dark:text-white border-b-2 mb-2 leading-4 sm:leading-5 text-[0.9rem] sm:text-base">{searchBookResults.title}</h3>
                        <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><strong className="text-n1 dark:text-white">Autor:</strong> {searchBookResults.author}</p>
                        <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><strong className="text-n1 dark:text-white">Idioma:</strong> {searchBookResults.language}</p>
                        <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><strong className="text-n1 dark:text-white">Descargas:</strong> {searchBookResults.downloadCount.toLocaleString()}</p>
                    </div>
                )}
                {!isSearching && searchAuthorResults && (
                    <div className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 shadow-md">
                        <h3 className="font-bold text-n1 dark:text-white border-b-2 mb-2 leading-4 sm:leading-5 text-[0.9rem] sm:text-base">{searchAuthorResults.name}</h3>
                        <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><strong className="text-n1 dark:text-white">Año de Nacimiento:</strong> {formatYear(searchAuthorResults.birthYear)}</p>
                        <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><strong className="text-n1 dark:text-white">Año de Fallecimiento:</strong> {formatYear(searchAuthorResults.deathYear)}</p>
                        <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><strong className="text-n1 dark:text-white">Libros:</strong></p>
                        <div className="max-h-20 overflow-y-auto">
                            <ul className="list-disc pl-5">
                                {searchAuthorResults.books.map((book, index) => (
                                    <li key={index} className="text-xs text-gray-700 dark:text-gray-300">{book}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {!isSearching && !searchBookResults && !searchAuthorResults && (
                    <div className="text-gray-500 text-center mt-0 md:mt-4 h-[10rem] sm:h-auto flex items-center">
                        <p>No se encontraron resultados.</p>
                    </div>
                )}
            </div>
            
        </section>
    )
}

export default SearchForm