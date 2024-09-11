import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Quote from '../components/Quote';
import Paginate from '../components/Paginate'
export default function Tab() {
    const quotesData = useLoaderData();
    const navigate = useNavigate();

    // pagination
    const [page, setPage] = useState(quotesData.page || 1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setTotalPages(quotesData.totalPages);
        setPage(quotesData.page || 1);
        console.log('useEffect: quotesData changes with page', quotesData.page);
    }, [quotesData]);

    const handlePageClick = (data) => {
        navigate(`?page=${data.selected + 1}`);
        console.log(`handlePageClick called: navigates to the ${data.selected + 1} page`);
    };

    let quotes = quotesData?.results?.map(
        (quote) => {
            return (
                <Quote
                    key={quote._id}
                    _id={quote._id}
                    tags={quote.tags}
                    content={quote.content}
                    author={quote.author}
                    authorSlug={quote.authorSlug}
                    length={quote.length}
                    dateAdded={quote.dateAdded}
                    dateModified={quote.dateModified}
                    isFavorite={quote.isFavorite}
                    isArchived={quote.isArchived}
                />
            );
        }
    );

    return (
        <>
            <div className="quotes row row-cols-1 row-cols-md-2 g-3 overflow-auto">
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