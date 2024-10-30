import { Book } from "../types"

type BookItemProps = {
    book: Book
    index: number
}

function BookItem({book, index} : BookItemProps) {
    return (
        <div className="m-2 ml-1 sm:ml-2 p-2 pl-0 sm:pl-2 mb-0 pb-0 w-full flex border-t-2 dark:border-gray-600">
            <div className="w-5">
                <p className="text-n1 dark:text-white font-bold leading-4 sm:leading-5 text-[0.9rem] sm:text-base mb-1">{index + 1}.</p>
            </div>
            <div>
                <h3 className="text-n1 dark:text-white font-bold underline leading-4 sm:leading-5 text-[0.9rem] sm:text-base mb-1">{book.title}</h3>
                <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><span className="text-n1 dark:text-white font-bold">Autor: </span>{book.author}</p>
                <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><span className="text-n1 dark:text-white font-bold">Idioma: </span>{book.language}</p>
                <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><span className="text-n1 dark:text-white font-bold">Descargas: </span>{book.downloadCount.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default BookItem