import { useEffect, useState } from 'react';
import '../index.css';
import Quote from './quote.jsx';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.css';

import {
    Outlet,
    NavLink,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
    useSubmit,
    useNavigate,
} from "react-router-dom";

import {
    fetchQuotable,
    fetchFavorites,
    fetchArchived
} from '../quotes.js';

export async function loader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;
    const limit = url.searchParams.get('limit') || 15;

    // Fetch quotes from Quotable API
    const quotableData = await fetchQuotable(page, limit);

    // Fetch favorites and archived from my own API
    const favoriteQuotes = await fetchFavorites();
    const archivedQuotes = await fetchArchived();

    // Merge
    const mergedQuotes = quotableData.results.map(quote => {
        const isFavorite = favoriteQuotes.results.some(fav => fav.externalId === quote._id);
        const isArchived = archivedQuotes.results.some(arch => arch.externalId === quote._id);
        if (isFavorite) {
            console.log('favorite found');
        }
        if (isArchived) {
            console.log('archived found');
        }
        return { ...quote, isFavorite, isArchived };
    });

    return { results: mergedQuotes, totalPages: quotableData.totalPages };
}

export default function Root() {
    // router
    const quotesData = useLoaderData();
    const navigate = useNavigate();

    // pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(6);

    const tabs = ['quotes', 'favorite', 'achieved'];
    const [tab, setTab] = useState(tabs[0]);

    useEffect(() => {
        setTotalPages(quotesData.totalPages);
    }, [quotesData]);

    useEffect(() => {
        setPage(1);
        // TODO: fetch my quotes
    }, [tab]);

    useEffect(() => {
        navigate(`/?page=${page}&limit=${limit}`);
        console.log('useEffect called by [page, limit, navigate] changes');
    }, [page, limit, navigate]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        console.log('handlePageClick called');
    };

    let quotes = quotesData?.results.map(
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
                //isFavorite={selectedQuotesData?.find(sq => sq.id === quote._id)?.isFavorite}
                //isArchived={selectedQuotesData?.find(sq => sq.id === quote._id)?.isArchived}
                //toggleFavorite={toggleFavorite}
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
                            {tabs.map((tab) => {
                                return (
                                    <li key={tab}>
                                        <button
                                            role="tab"
                                            onClick={() => setTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                <div className="quotes">
                    {quotes}
                </div>

                {/*<Outlet />*/}
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