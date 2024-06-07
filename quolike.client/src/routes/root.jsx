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
} from '../quotes.js';

export async function loader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;
    const limit = url.searchParams.get('limit') || 15;
    return await fetchQuotable(page, limit);
}

export default function Root() {
    const quotesData = useLoaderData();
    const navigate = useNavigate();

    // pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(quotesData.totalPages);
    const [limit, setLimit] = useState(15);

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