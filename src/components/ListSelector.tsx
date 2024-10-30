import { Dispatch } from "react";

type ListSelectorProps = {
    selectedListType: "books" | "authors";
    setSelectedListType: Dispatch<React.SetStateAction<"books" | "authors">>;
};

function ListSelector({ selectedListType, setSelectedListType }: ListSelectorProps) {
    return (
        <div className="flex flex-wrap relative text-sm text-center h-10 w-36 rounded-md p-1.5 leading-none shadow-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700">
            <label className="flex text-center justify-center shrink grow basis-auto w-1/2" htmlFor="books">
                <input defaultChecked type="radio" name="books" id="books" className="hidden" />
                <button
                    onClick={() => { setSelectedListType('books') }}
                    className={`flex justify-center items-center rounded w-full  duration-300 ${selectedListType === 'books' ? 'bg-n1 dark:bg-gray-500 text-white font-bold' : 'bg-gray-50 text-black dark:bg-gray-700 dark:text-white'}`}>
                    Libros
                </button>
            </label>
            <label className="flex text-center justify-center shrink grow basis-auto w-1/2" htmlFor="authors">
                <input defaultChecked type="radio" name="authors" id="authors" className="hidden" />
                <button
                    onClick={() => { setSelectedListType('authors') }}
                    className={`flex justify-center items-center rounded w-full  duration-300 ${selectedListType === 'authors' ? 'bg-n1 dark:bg-gray-500 text-white font-bold' : 'bg-gray-50 text-black dark:bg-gray-700 dark:text-white'}`}>
                    Autores
                </button>
            </label>
        </div>
    )
}

export default ListSelector;
