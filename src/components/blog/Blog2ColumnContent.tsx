"use client";
import blogData from '@/assets/jsonData/blog/BlogData.json'
import SingleBlog2Column from './SingleBlog2Column';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Pagination from 'react-paginate';

const Blog2ColumnContent = () => {

    // Pagination 
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get page from URL query
    const currentPageNumber = Number(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(currentPageNumber);
    const [itemsPerPage] = useState(4);

    useEffect(() => {
        setCurrentPage(currentPageNumber);
    }, [currentPageNumber]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogData = blogData.slice(startIndex, endIndex);

    const handlePageClick = (data: { selected: number }) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
        router.push(`/blog-2-column?page=${selectedPage}`);

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    };

    const totalPages = Math.ceil(blogData.length / itemsPerPage);


    return (
        <>
            <div className="blog-area blog-grid default-padding">
                <div className="container">
                    <div className="blog-item-box">
                        <div className="row">
                            {currentBlogData.map(blog =>
                                <div className="col-xl-6" key={blog.id}>
                                    <SingleBlog2Column blog={blog} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="row">
                        <div className="col-md-12 pagi-area text-center">
                            <Pagination
                                previousLabel={currentPage === 1 ? <i className='fas fa-ban'></i> : <i className='fas fa-angle-double-left'></i>}
                                nextLabel={currentPage === totalPages ? <i className='fas fa-ban'></i> : <i className='fas fa-angle-double-right'></i>}
                                breakLabel={'...'}
                                pageCount={Math.ceil(blogData.length / itemsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination text-center'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog2ColumnContent;