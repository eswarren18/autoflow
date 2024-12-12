import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function ServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [autos, setAutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchVehicles() {
    try {
      const response = await fetch('http://localhost:8100/api/automobiles/');
      if (response.ok) {
        const data = await response.json();
        setAutos(data.autos.map((auto) => auto.vin));
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error fetching automobiles:', error);
    }
  }

  async function fetchAppointments(autoVins) {
    try {
      const response = await fetch('http://localhost:8080/api/appointments/');
      if (response.ok) {
        const data = await response.json();
        setAppointments(
          data.appointments
        );
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (autos.length > 0) {
      fetchAppointments(autos);
    }
  }, [autos]);

  const filteredAppointments = appointments.filter((appt) =>
    `${appt.customer} ${appt.vin} ${appt.technician.first_name} ${appt.technician.last_name} ${appt.reason} ${appt.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * 10;
  const indexOfFirstRecord = indexOfLastRecord - 10;
  const currentRecords = filteredAppointments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredAppointments.length / 10);

  return (
    <div className="card mt-2 p-4">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="h2">Service History</div>
        <NavLink className="btn btn-success fw-bold" to="/services/new">
          Schedule New Appointment
        </NavLink>
      </div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Filter Service History..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>VIN</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.customer} {autos.includes(appointment.vin) ? <span style={{ fontSize: '12px' }} className='fw-bold bg-warning p-1 rounded font-size-xl'>VIP</span> : ''}</td>
              <td>{appointment.vin}</td>
              <td>{new Date(appointment.date_time).toLocaleDateString('en-US')}</td>
              <td>{new Date(new Date(appointment.date_time).getTime() + 8 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className='d-flex justify-content-between align-items-top'>
        <div>
          Showing <span className='fw-bold'>{currentRecords.length}</span> of <span className='fw-bold'>{appointments.length}</span> total records...
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

export default ServiceHistory
