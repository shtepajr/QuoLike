import { useLoaderData } from 'react-router-dom';
import { fetchArchived } from '../quotes.js';
import Quote from './quote.jsx';

export async function loader({ request }) {
    const favoriteQuotes = await fetchArchived();
    return { results: favoriteQuotes, totalPages: favoriteQuotes.totalPages };
}

export default function Archived() {
    const quotesData = useLoaderData();

    let quotes = quotesData?.results?.results.map(
        (quote) => {
            return (
                <Quote
                    id={quote._id}
                    key={quote._id}
                    title={quote.title}
                    content={quote.content}
                    author={quote.author}
                    tags={quote.tags}
                    isFavorite={quote.isFavorite}
                    isArchived={quote.isArchived}
                />
            );
        }
    );

    return (
        <>
            <div className="quotes">
                {quotes}
            </div>
        </>
    );
}