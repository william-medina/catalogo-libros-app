import { z } from 'zod'

export const bookSchema = z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    language: z.string(),
    downloadCount: z.number()
})

export const authorSchema = z.object({
    id: z.number(),
    name: z.string(),
    birthYear: z.number().nullable(),
    deathYear: z.number().nullable(),
    books: z.array(z.string())
})

const statisticEntrySchema = z.object({
    name: z.string(),
    value: z.number()
})

export const statisticSchema = z.object({
    totalBooksCount: z.number(),
    totalDownloadsCount: z.number(),
    highestDownloadedBook: statisticEntrySchema,
    lowestDownloadedBook: statisticEntrySchema,
    mostRecentlyBornAuthor: statisticEntrySchema,
    oldestBornAuthor: statisticEntrySchema
})

export const booksArraySchema = z.array(bookSchema);
export const authorsArraySchema = z.array(authorSchema);


export type Book = z.infer<typeof bookSchema>;
export type Author = z.infer<typeof authorSchema>;
export type Statistic = z.infer<typeof statisticSchema>;
export type BooksArray = z.infer<typeof booksArraySchema>;
export type AuthorsArray = z.infer<typeof authorsArraySchema>;

