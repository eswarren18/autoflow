import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Cars() {
  const [autos, setAutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchAutos() {
    try {
      const response = await fetch('http://localhost:8100/api/automobiles/');
      if (response.ok) {
        const data = await response.json();
        setAutos(data.autos);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error fetching automobiles:', error);
    }
  }

  useEffect(() => {
    fetchAutos();
  }, []);

  const filteredAutos = autos.filter((auto) =>
    `${auto.vin} ${auto.year} ${auto.color} ${auto.model.name} ${auto.model.manufacturer.name} ${auto.sold}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * 10;
  const indexOfFirstRecord = indexOfLastRecord - 10;
  const currentRecords = filteredAutos.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredAutos.length / 10);

  return (
    <div className="card mt-2 p-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="h1 fw-bold">Automobile Inventory</div>
        <NavLink className="btn btn-success fw-bold" to="/inventory/new">
          Add New Auto to Inventory
        </NavLink>
      </div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Filter Automobiles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((auto) => (
            <tr key={auto.vin}>
              <td className="text-uppercase">{auto.vin}</td>
              <td className='text-capitalize'>{auto.color}</td>
              <td>{auto.year}</td>
              <td className='text-capitalize'>{auto.model.name}</td>
              <td className='text-capitalize'>{auto.model.manufacturer.name}</td>
              <td>{auto.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className='d-flex justify-content-between align-items-top'>
        <div>
          Showing <span className='fw-bold'>{currentRecords.length}</span> of <span className='fw-bold'>{autos.length}</span> total records...
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

export default Cars
