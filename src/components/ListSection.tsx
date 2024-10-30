import { Dispatch, useState } from "react";
import AuthorItem from "./AuthorItem";
import BookItem from "./BookItem";
import ListSelector from "./ListSelector";
import { AuthorsArray, BooksArray } from "../types";
import { fetchAuthorsByYear } from "../api/AuthorAPI";
import { fetchBooksByLanguage } from "../api/BookAPI";

type ListSectionProps = {
    selectedListType: "books" | "authors";
    setSelectedListType: Dispatch<React.SetStateAction<"books" | "authors">>;
    books?: BooksArray;
    authors?: AuthorsArray;
    setBooks?: Dispatch<React.SetStateAction<BooksArray>>;
    setAuthors?: Dispatch<React.SetStateAction<AuthorsArray>>;
}

function ListSection({ selectedListType, setSelectedListType, books, authors, setBooks, setAuthors }: ListSectionProps) {
    const [isFiltering, setIsFiltering] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("es");
    const [selectedYear, setSelectedYear] = useState<number | undefined>();

    const handleFilter = async () => {
        setIsFiltering(true);
        try {
            if (selectedListType === "books" && setBooks) {
                const response = await fetchBooksByLanguage(selectedLanguage);
                setBooks(response || []);
            } else if (selectedListType === "authors" && setAuthors && selectedYear) {
                const response = await fetchAuthorsByYear(selectedYear);
                setAuthors(response || []);
            }
        } catch (error) {
            console.error("Filter error:", error);
        } finally {
            setIsFiltering(false);
        }
    };

    return (
        <section className="rounded-lg bg-white dark:bg-gray-800 shadow-lg p-4 sm:p-6 mt-8" id="listSection">
            <div className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-0">
                <div className="flex flex-col items-center mb-5">
                    <h2 className="text-n1 dark:text-white text-xl font-semibold mb-2">- Lista -</h2>
                    <ListSelector 
                        selectedListType={selectedListType} 
                        setSelectedListType={setSelectedListType}
                    />
                </div>
                <div className="flex flex-col items-center mb-10 sm:mb-5 sm:w-52">
                    <h3 className="text-n1 dark:text-white font-bold mb-4">
                        Filtrar
                        {selectedListType === "books" ? " Libros Por Idioma" : " Autores Por Año"}
                    </h3>
                    <form 
                        className="flex gap-3 w-44"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleFilter();
                        }}
                    >
                        {selectedListType === 'books' ? (
                            <select
                                name="selectedLanguage"
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="w-[6rem] py-[0.32rem] rounded-md border text-sm border-gray-300 dark:border-gray-600 focus:outline-none focus:border-n1 focus:ring-1 focus:ring-n1 dark:focus:ring-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="es">Español</option>
                                <option value="en">Inglés</option>
                                <option value="fr">Francés</option>
                                <option value="pt">Portugués</option>
                                <option value="de">Alemán</option>
                            </select>
                        ) : (
                            <input
                                type="number"
                                name="selectedYear"
                                value={selectedYear || ""}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="w-[6rem] py-1 px-3 text-sm rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-n1 dark:focus:ring-gray-500 focus:ring-1 focus:ring-n1 dark:bg-gray-700 dark:text-white"
                                placeholder="Año"
                                required
                            />
                        )}

                        <button
                            type="submit"
                            className={`${isFiltering ? 'cursor-wait bg-gray-500 dark:bg-gray-700' : 'cursor-pointer bg-n1 dark:bg-gray-500'} w-auto text-white text-sm px-2 rounded-md hover:brightness-90 font-medium duration-300`}
                            disabled={isFiltering}
                        >
                            Filtrar
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="overflow-y-auto max-h-[29rem] rounded-md border border-gray-200 dark:border-gray-600">
                <div className="flex flex-col space-y-4 p-2 sm:p-4 min-h-[18rem]">
                    {selectedListType === "books" ? (
                        books && books.length > 0 ? (
                            books.map((book, index) => (
                                <BookItem key={index} book={book} index={index} />
                            ))
                        ) : (
                            <div className="w-full h-[16rem] flex flex-col justify-center items-center">
                                <p className="text-center text-base sm:text-lg text-gray-500 dark:text-gray-400">No se encontraron libros.</p>
                            </div>
                        )
                    ) : selectedListType === "authors" ? (
                        authors && authors.length > 0 ? (
                            authors.map((author, index) => (
                                <AuthorItem key={index} author={author} index={index} />
                            ))
                        ) : (
                            <div className="w-full h-[16rem] flex flex-col justify-center items-center">
                                <p className="text-center text-base sm:text-lg text-gray-500 dark:text-gray-400">No se encontraron autores.</p>
                            </div>
                        )
                    ) : null}
                </div>
            </div>
        </section>
    )
}

export default ListSection;
