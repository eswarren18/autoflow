import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Manufacturers() {
    const [manufacturers, setManufacturers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchManufacturers() {
        try {
            const response = await fetch('http://localhost:8100/api/manufacturers/');
            if (response.ok) {
                const data = await response.json();
                setManufacturers(data.manufacturers);
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Error fetching inventory manufacturers:', error);
        }
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const filteredManufacturers = manufacturers.filter((manufacturer) =>
        `${manufacturer.name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * 10;
    const indexOfFirstRecord = indexOfLastRecord - 10;
    const currentRecords = filteredManufacturers.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredManufacturers.length / 10);

    return (
        <div className="card mt-2 p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="h1 fw-bold">Automobile Manufacturers</div>
                <NavLink className="btn btn-success fw-bold" to="/manufacturers/new">
                    Add New Automobile Manufacturer
                </NavLink>
            </div>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Filter Manufacturers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((manufacturer) => (
                        <tr key={manufacturer.id}>
                            <td className='text-capitalize'>{manufacturer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav className='d-flex justify-content-between align-items-top'>
                <div>
                    Showing <span className='fw-bold'>{currentRecords.length}</span> of <span className='fw-bold'>{manufacturers.length}</span> total records...
                </div>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                        const startPage = Math.max(1, currentPage - 2);
                        const pageNumber = startPage + index;
                        if (pageNumber > totalPages) return null;

                        return (
                            <li
                                key={pageNumber}
                                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        );
                    })}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Manufacturers
