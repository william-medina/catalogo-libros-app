import { BooksArray } from "../types";

type TopBookList = {
    books: BooksArray | undefined
}

function TopBookList({ books }: TopBookList) {
    return (
        <section className="rounded-lg bg-white dark:bg-gray-800 shadow-lg w-full md:w-3/5 p-4 sm:p-6" id="top10Section">
            <h2 className="text-center text-n1 dark:text-white text-lg sm:text-xl font-semibold mb-5 leading-5">
                - Top 10 Libros Más Descargados -
            </h2>
            <div className="overflow-y-auto h-[16rem] md:h-[20rem]">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-n1 dark:bg-gray-700 border-b text-sm sm:text-base dark:border-gray-700">
                            <th className="px-2 sm:px-4 py-2 text-center sticky top-0 text-white bg-n1 dark:bg-gray-700">#</th>
                            <th className="px-2 sm:px-4 py-2 text-left sticky top-0 text-white bg-n1 dark:bg-gray-700">Título</th>
                            <th className="px-2 sm:px-4 py-2 text-center sticky top-0 text-white bg-n1 dark:bg-gray-700">Descargas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books &&
                            books.map((book, index) => (
                                <tr className="border-t text-[0.8rem] sm:text-sm dark:border-gray-600" key={index}>
                                    <td className="px-2 sm:px-4 py-2 text-center font-bold text-n1 dark:text-gray-300">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 font-semibold text-n1 dark:text-gray-300 leading-4">
                                        {book.title}
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 text-center dark:text-gray-300">
                                        {book.downloadCount.toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {books && books.length === 0 && (
                    <div className="flex flex-col justify-center items-center h-[13.2rem] md:h-[17rem] w-full text-gray-500 dark:text-gray-400">
                        <p className="text-center text-base sm:text-lg font-semibold">Aún no hay libros almacenados.</p>
                        <p className="text-center">Busca un libro para almacenarlo.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default TopBookList;
