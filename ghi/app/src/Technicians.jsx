import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Technicians() {
  const [technicians, setTechnicians] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchTechnicians() {
    try {
      const response = await fetch('http://localhost:8080/api/technicians/');
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  }

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const filteredTechnicians = technicians.filter((tech) =>
    `${tech.first_name} ${tech.last_name} ${tech.employee_id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * 10;
  const indexOfFirstRecord = indexOfLastRecord - 10;
  const currentRecords = filteredTechnicians.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredTechnicians.length / 10);

  return (
    <div className="card mt-2 p-4">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="h2">Technicians</div>
        <NavLink className="btn btn-success fw-bold" to="/technicians/new">
          Add New Technician
        </NavLink>
      </div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Filter Technicians.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.employee_id}</td>
              <td>{technician.first_name}</td>
              <td>{technician.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className='d-flex justify-content-between align-items-top'>
        <div>
          Showing <span className='fw-bold'>{currentRecords.length}</span> of <span className='fw-bold'>{technicians.length}</span> total records...
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
  );
}

export default Technicians;
