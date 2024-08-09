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
        <div className="col">
            <div className="quote card h-100 flex-row align-items-center ps-3">
                <div className="col-10 d-flex flex-column text-center">
                    <div className="quote--content">{quote.content}</div>
                    <em className="quote--author text-secondary">- {quote.author}</em>
                    {quote.tags && <div className="quote--tags align-self-end">{
                        quote.tags.map((tag) => <span className="badge bg-secondary m-2" key={tag}>{tag}</span>)}</div>}
                </div>
                <div className="col-2">
                    <button onClick={handleFavorite} className="btn" aria-label={quote.isFavorite ? "Remove from favorites" : "Add to favorites"} >
                        {quote.isFavorite ?
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                favorite
                            </span> :
                            <span className="material-symbols-outlined">
                                favorite
                            </span>}
                    </button>
                    <button onClick={handleArchive} className="btn" aria-label={quote.isArchived ? "Remove from archived" : "Add to archived"}>
                        {quote.isArchived ?
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                unarchive
                            </span> : <span className="material-symbols-outlined">
                                archive
                            </span>}
                    </button>
                </div>
            </div>
        </div>
    );
}