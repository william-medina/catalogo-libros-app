import { Statistic } from "../types";
import { formatYear } from "../utils";

type StatisticsSectionProps = {
    statistics: Statistic | undefined;
};

function StatisticCard({ title, value, subtext }: { title: string; value: string | number; subtext?: string }) {
    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow text-center">
            <h3 className="font-semibold text-n1 dark:text-white text-base border-b-2 mb-2 dark:border-gray-400">{title}</h3>
            <p className={`${subtext ? 'text-sm' : 'text-base'} font-bold leading-4 mb-1 dark:text-gray-300`}>
                {value}
            </p>
            {subtext && <p className="text-sm text-gray-600 dark:text-gray-400">{subtext}</p>}
        </div>
    );
}

function StatisticsSection({ statistics }: StatisticsSectionProps) {
    return (
        <section className="rounded-lg bg-white dark:bg-gray-800 shadow-lg p-6 mt-8 min-h-[25rem]" id="statisticsSection">
            <h2 className="text-n1 dark:text-white text-xl font-bold mb-5 text-center">- Estadísticas -</h2>
            {statistics && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 text-sm">
                    <StatisticCard 
                        title="Total de Libros" 
                        value={statistics.totalBooksCount} 
                    />
                    <StatisticCard 
                        title="Total de Descargas" 
                        value={statistics.totalDownloadsCount.toLocaleString()} 
                    />
                    <StatisticCard 
                        title="Libro Más Descargado" 
                        value={statistics.highestDownloadedBook.name} 
                        subtext={`( ${statistics.highestDownloadedBook.value.toLocaleString()} descargas )`} 
                    />
                    <StatisticCard 
                        title="Libro Menos Descargado" 
                        value={statistics.lowestDownloadedBook.name} 
                        subtext={`( ${statistics.lowestDownloadedBook.value.toLocaleString()} descargas )`} 
                    />
                    <StatisticCard 
                        title="Autor Más Reciente" 
                        value={statistics.mostRecentlyBornAuthor.name} 
                        subtext={`( Nació en ${formatYear(statistics.mostRecentlyBornAuthor.value)} )`} 
                    />
                    <StatisticCard 
                        title="Autor Más Antiguo" 
                        value={statistics.oldestBornAuthor.name} 
                        subtext={`( Nació en ${formatYear(statistics.oldestBornAuthor.value)} )`} 
                    />
                </div>
            )}
        </section>
    );
}

export default StatisticsSection;
