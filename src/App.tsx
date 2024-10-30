import { useEffect, useState } from "react";
import { fetchAllBooks, fetchStatisticsBooks, fetchTop10Books } from "./api/BookAPI";
import { AuthorsArray, BooksArray, Statistic } from "./types";
import TopBookList from "./components/TopBookList";
import { fetchAllAuthors } from "./api/AuthorAPI";
import SearchForm from "./components/SearchForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListSection from "./components/ListSection";
import StatisticsSection from "./components/StatisticsSection";

function App() {

    const [top10Books, setTop10Books] = useState<BooksArray>([]);
    const [books, setBooks] = useState<BooksArray>([]);
    const [authors, setAuthors] = useState<AuthorsArray>([]);
    const [selectedListType, setSelectedListType] = useState<"books" | "authors">("books");
    const [statistics, setStatistics] = useState<Statistic>();

    useEffect(() => {
        loadCatalogData();
    }, [selectedListType]);

    const loadCatalogData  = async () => {
        try {
            const top10BooksResponse = await fetchTop10Books();
            const allBooksResponse = await fetchAllBooks();
            const allAuthorsResponse = await fetchAllAuthors();
            const statisticsBooks = await fetchStatisticsBooks();
            setTop10Books(top10BooksResponse ?? []);
            setBooks(allBooksResponse ?? []);
            setAuthors(allAuthorsResponse ?? []);
            setStatistics(statisticsBooks);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Header />

            <main className="w-full flex flex-col items-center mt-8">
                <div className="w-full max-w-screen-lg px-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Top 10 Books Section */}
                        <TopBookList 
                            books={top10Books} 
                        />

                        {/* Search Section */}
                        <SearchForm 
                            loadCatalogData={loadCatalogData} 
                        />
                    </div>

                    {/* List Section */}
                    <ListSection
                        selectedListType={selectedListType}
                        setSelectedListType={setSelectedListType}
                        books={books}
                        authors={authors}
                        setBooks={setBooks}
                        setAuthors={setAuthors}
                    />

                    {/* Statistics Section */}
                    <StatisticsSection
                        statistics={statistics}
                    />

                </div>
            </main>

            <Footer />
        </>
    );
}

export default App;
