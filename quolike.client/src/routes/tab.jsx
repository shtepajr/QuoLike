import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Quote from './quote.jsx';
import { limit } from './root.jsx';
import Paginate from '../paginate.jsx'
import { nanoid } from 'nanoid'

export default function Tab() {
    const quotesData = useLoaderData();
    const navigate = useNavigate();

    // pagination
    const [page, setPage] = useState(quotesData.page || 1);
    const [totalPages, setTotalPages] = useState(1);
    //const qLimit = useState(limit && 6);

    useEffect(() => {
        setTotalPages(quotesData.totalPages);
        setPage(quotesData.page || 1);
        console.log('quotes data changes', quotesData.page);
    }, [quotesData]);

    useEffect(() => {
        navigate(`?page=${page}`);
        console.log('page changes', page);
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
            <Paginate
                handlePageClick={handlePageClick}
                totalPages={totalPages}
                forcePage={page - 1}
            />
        </>
    );
}