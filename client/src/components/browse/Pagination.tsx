import { MouseEventHandler, useEffect, useState } from "react";

interface PaginationProps {
    page: number;
    data: unknown[];
    range: number;
    interval: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({page, data, range, interval, onPageChange}) => {
    const [pages, setPages] = useState<number[]>()
    const [lastPage, setLastPage] = useState<number>()
    const [start, setStart] = useState<number>()
    const [end, setEnd] = useState<number>()
    const [cur, setCur] = useState<number>()

    // generates array of page numbers to be displayed
    // range variable determines the number of page numbers to be displayed
    // interval variable is the number of items per page
    useEffect(() => {
        const pages: number[] = []
        const lastPage = data.length / interval
        // Starting and ending page numbers to be displayed
        let start = page - page % range;
        let end = page + range - (page % range);

        // Adjust start and end page numbers as they approach the first and last page in the current range
        if (start < range) start++; //skip page 1 since already accounted for
        else if (lastPage - start < range) start = lastPage - range //makes sure start page isn't too close to last page so that full range of page numbers is displayed
        else if (start === page) start-- //make the last page number from previous range as the start
        if (end >= lastPage) end = lastPage - 1
        else if (page + 1 === end && end + 1 !== lastPage) end++

        for (let i = start; i < end; i++) {
            pages.push(i + 1)
        }
        setPages(pages)
        setLastPage(lastPage)
        setEnd(end)
        setStart(start)
        setCur(page + 1)
    }, [page, range, interval])

    return (
        <div className='pagination'>
            <button className={cur === 1 ? 'page active' : 'page'} onClick={() => onPageChange(0)}>1</button>
            <button onClick={() => onPageChange(start!-1)} style={{display: page >= range ? 'block' : 'none'}}>...</button>
            {pages?.map((p, idx) => {
                return (
                    <button 
                        className={cur === p ? 'page active' : 'page'}
                        key={idx}
                        onClick={() => onPageChange(p-1)}
                        >{p}
                    </button>
                )
            })}
            <button onClick={() => onPageChange(end!)} style={{display: end! < lastPage!-1 ? 'block' : 'none'}}>...</button>
            <button onClick={() => onPageChange(lastPage!-1)} className={lastPage === cur ? 'page active' : 'page'}>{lastPage}</button>
        </div>
    )
}

export default Pagination;
