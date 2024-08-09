import ReactPaginate from 'react-paginate';

export default function Paginate(props) {
    return (
        <div className="pagination justify-content-center mt-3">
            <ReactPaginate
                nextLabel=">"
                onPageChange={props.handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={props.totalPages}
                previousLabel="<"
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
                forcePage={props.forcePage}
            />
        </div>
    )
}