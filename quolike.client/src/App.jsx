import { useEffect, useState } from 'react';
import './App.css';
import Quote from './components/Quote';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const [quotesData, setQuotesData] = useState({}); // api data
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(15);
    // local data (describe api data)
    const [selectedQuotesData, setSelectedQuotesData] =
        useState(() => JSON.parse(localStorage.getItem('selectedQuotesData')) || []);

    useEffect(() => {
        fetchQuotes(page, limit); // api data
    }, [page, limit]);

    useEffect(() => {
        localStorage.setItem('selectedQuotesData', JSON.stringify(selectedQuotesData));
    }, [selectedQuotesData]);

    async function fetchQuotes(page, limit) {
        try {
            const response = await fetch(`https://api.quotable.io/quotes?page=${page}&limit=${limit}`);
            const data = await response.json();
            setQuotesData(data);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    }

    const handlePageClick = (data) => {
        setPage(data.selected + 1); // data.selected is zero-based, so we add 1 to get the actual page number
    };

    function toggleFavorite(id) {
        // Update local state
        setSelectedQuotesData((oldSelect) => {
            let current = oldSelect?.find(sq => sq.id === id);
            if (current === undefined) {
                return [...oldSelect.filter(sq => sq.id !== id), { id, isFavorite: true, isArchived: false }];
            } else {
                return [...oldSelect.filter(sq => sq.id !== id), { ...current, isFavorite: !current.isFavorite }];
            }
        });
    }

    let quotes = quotesData?.results?.map(
        (quote) => {
            return (
                <Quote
                    id={quote._id}
                    key={quote._id}
                    title={quote.title}
                    content={quote.content}
                    author={quote.author}
                    tags={quote.tags}
                    isFavorite={selectedQuotesData?.find(sq => sq.id === quote._id)?.isFavorite}
                    isArchived={selectedQuotesData?.find(sq => sq.id === quote._id)?.isArchived}
                    toggleFavorite={toggleFavorite}
                />
            );
        }
    );

    return (
        <>
            <header className="header">
                <a>Logo</a>
                <button>Dark mode</button>
                <button>Profile</button>
            </header>
            <main className="main">
                <div className="tabs">
                    <nav className="tab-nav">
                        <ul className="tab-list">
                            <li>
                                <button role="tab">Quotes</button>
                            </li>
                            <li>
                                <button role="tab">Liked</button>
                            </li>
                            <li>
                                <button role="tab">Achieved</button>
                            </li>
                        </ul>
                    </nav>
                </div> 
                <div className="quotes">
                    {quotes}
                </div>
                <div className="pagination">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </main>
        </>
    );
}

export default App;