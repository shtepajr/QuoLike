import { useFetcher } from "react-router-dom";

export default function Quote(quote) {
    const fetcher = useFetcher();

    const handleFavorite = () => {
        fetcher.submit({ ...quote, isFavorite: !quote.isFavorite }, { method: 'post', action: 'toggle' });
    };

    const handleArchive = () => {
        fetcher.submit({ ...quote, isArchived: !quote.isArchived }, { method: 'post', action: 'toggle' });
    };

    return (
        <div className="quote">
            <div className="quote--content">{quote.content}</div>
            <div className="quote--author">{quote.author}</div>
            {quote.tags && <div className="quote--tags">{quote.tags}</div>}
            <button onClick={handleFavorite} aria-label={quote.isFavorite ? "Remove from favorites" : "Add to favorites"} >
                {quote.isFavorite ? "★" : "☆"}
            </button>
            <button onClick={handleArchive} aria-label={quote.isArchived ? "Remove from archived" : "Add to archived"}>
                {quote.isArchived ? "📓" : "🗒"}
            </button>
        </div>
    );
}