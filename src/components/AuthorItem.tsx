import { Author } from "../types"
import { formatYear } from "../utils"

type AuthorItemProps = {
    author: Author
    index: number
}

function AuthorItem({author, index} : AuthorItemProps) {
    return (
        <div className="m-2 ml-1 sm:ml-2 p-2 pl-0 sm:pl-2 mb-0 pb-0 w-full flex border-t-2 dark:border-gray-600">
            <div className="w-5">
                <p className="text-n1 dark:text-white font-bold leading-4 sm:leading-5 text-[0.9rem] sm:text-base mb-1">{index + 1}.</p>
            </div>
            <div>
                <h3 className="text-n1 dark:text-white font-bold underline leading-4 sm:leading-5 text-[0.9rem] sm:text-base mb-1">{author.name}</h3>
                <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><span className="text-n1 dark:text-white font-bold">Año de Nacimiento: </span>{formatYear(author.birthYear)}</p>
                <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><span className="text-n1 dark:text-white font-bold">Año de Fallecimiento: </span>{formatYear(author.deathYear)}</p>
                <p className="leading-4 text-[0.8rem] sm:text-sm dark:text-gray-300"><span className="text-n1 dark:text-white font-bold">Libros: </span></p>
                <div className="max-h-20 overflow-y-auto">
                    <ul className="list-disc pl-5">
                        {author.books.map((book, index) => (
                            <li key={index} className="text-xs text-gray-700 dark:text-gray-300">{book}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AuthorItem