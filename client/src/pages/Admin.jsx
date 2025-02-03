/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Pencil, Trash2 } from "lucide-react";
import { IoIosAddCircle as Addition } from "react-icons/io";
import { useGetAllPostsQuery } from "../redux/api/postApi";
import Loader from "../components/Loader.jsx"
import { useState } from "react";


const generateDummyData = (count = 50) => {
    return Array.from({ length: count }, (_, index) => {
        const id = index + 1;
        return {
            id,
            _id: `64${id.toString().padStart(7, "0")}abcdef12345678`,
            title: `Item ${id}`,
            createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
                .toUTCString(),
            updatedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
                .toUTCString(),
        };
    });
};

const dummyData = generateDummyData(50);


const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Title", accessor: "title" },
    { Header: "Created At", accessor: "createdAt" },
    { Header: "Updated At", accessor: "updatedAt" },
    {
        Header: "Action",
        accessor: "actions",
        Cell: () => (
            <div className="flex gap-2 justify-center">
                <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <Pencil size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700 cursor-pointer">
                    <Trash2 size={20} />
                </button>
            </div>
        ),
    },
];

const Admin = () => {

    const { data, isLoading, isError } = useGetAllPostsQuery()
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.posts)
        }
    }, [data])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state: { pageIndex },
        pageCount,
    } = useTable({ columns, data: rows }, useSortBy, usePagination);

    return (isLoading ? <Loader /> :
        <div className="flex flex-col items-center h-screen bg-gray-600 p-4 ">

            <div className="w-full max-w-6xl overflow-x-auto mt-24 rounded-b-xl">
                <table
                    {...getTableProps()}
                    className="table-auto w-full border border-gray-300 shadow-md rounded-lg bg-white"
                >
                    {/* Table Header */}
                    <thead className="bg-black text-white">
                        {headerGroups.map((hg) => (
                            <tr key={hg.id} {...hg.getHeaderGroupProps()}>
                                {hg.headers.map((column) => (
                                    <th
                                        key={column.id}
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="px-4 py-2 border border-gray-300 text-sm md:text-base text-center"
                                    >
                                        {column.render("Header")}
                                        {column.isSorted && (
                                            <span>{column.isSortedDesc ? " ↓" : " ↑"}</span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {/* Table Body */}
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr key={row.id} {...row.getRowProps()} className="hover:bg-gray-100">
                                    {row.cells.map((cell) => (
                                        <td
                                            key={cell.id}
                                            {...cell.getCellProps()}
                                            className="px-4 py-2 border border-gray-300 text-sm md:text-base text-center"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-4 mt-4">
                <button
                    className="font-bold text-white bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg disabled:opacity-50"
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                >
                    Prev
                </button>
                <span className="text-sm md:text-base text-white">
                    Page {pageIndex + 1} of {pageCount}
                </span>
                <button
                    className="font-bold text-white bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg disabled:opacity-50"
                    onClick={nextPage}
                    disabled={!canNextPage}
                >
                    Next
                </button>
                <div className="cursor-pointer hover:bg-gray-500"><Addition size={40} /></div>
            </div>

        </div>
    );
};

export default Admin;
