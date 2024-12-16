import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Models() {
    const [models, setModels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchModels() {
        try {
            const response = await fetch('http://localhost:8100/api/models/');
            if (response.ok) {
                const data = await response.json();
                setModels(data.models);
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Error fetching inventory models:', error);
        }
    }

    useEffect(() => {
        fetchModels();
    }, []);

    const filteredModels = models.filter((model) =>
        `${model.name} ${model.manufacturer.name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * 10;
    const indexOfFirstRecord = indexOfLastRecord - 10;
    const currentRecords = filteredModels.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredModels.length / 10);

    return (
        <div className="card mt-2 p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="h1 fw-bold">Automobile Models</div>
                <NavLink className="btn btn-success fw-bold" to="/models/new">
                    Add New Automobile Model
                </NavLink>
            </div>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Filter Models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Manufacturer</th>
                        <th>Model Name</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((model) => (
                        <tr key={model.id}>
                            <td><img src={model.picture_url} alt="car" className="img-fluid rounded" style={{ width: '40px', height: '40px', objectFit: 'cover', objectPosition: 'center' }} /></td>
                            <td className='text-capitalize'>{model.manufacturer.name}</td>
                            <td className='text-capitalize'>{model.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav className='d-flex justify-content-between align-items-top'>
                <div>
                    Showing <span className='fw-bold'>{currentRecords.length}</span> of <span className='fw-bold'>{models.length}</span> total records...
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

export default Models
