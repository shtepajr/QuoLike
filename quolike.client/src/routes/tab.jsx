import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Quote from './quote.jsx';
import { limit } from './root.jsx';

export default function Tab() {
    const quotesData = useLoaderData();
    const navigate = useNavigate();

    // pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const qLimit = useState(limit && 6);

    useEffect(() => {
        setTotalPages(quotesData.totalPages);
    }, [quotesData]);

    useEffect(() => {
        navigate(`/all/?page=${page}`);
        console.log('useEffect called by [page, limit, navigate] changes');
    }, [page, navigate]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        console.log('handlePageClick called');
    };

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
        </>
    );
}