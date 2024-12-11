import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';

DataTable.use(DT);

const columns = [
  { data: 'employee_id' },
  { data: 'first_name' },
  { data: 'last_name' }
];

function Technicians() {
  const [technicians, setTechnicians] = useState([])

  async function fetchTechnicians(){
    try {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians.map((technician) => {
                return {
                    employee_id: technician.employee_id,
                    first_name: technician.first_name,
                    last_name: technician.last_name
                }
            }));
            console.log(data.technicians)
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error('Error fetching technicians:', error);
    }
  }

  useEffect(() => {
    fetchTechnicians();
  }, [])

  return (
    <>
    <div className="d-flex justify-content-between align-items-start">
      <div className="h2">Technicians</div>
      <NavLink className="btn btn-success fw-bold" to="/technicians/new">
      Add New Technician
      </NavLink>

    </div>
    <div className="card mt-2 p-4">

    <DataTable
    className="table table-striped"
    options={{
      lengthChange: false,
      dom: 'frtip',
      layout: {
        topStart: 'search',
        topEnd: null
    }
    }}
    columns={columns}
    data={technicians}
>
    <thead>
        <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
        </tr>
    </thead>
</DataTable>
    </div>
</>
  )
}

export default Technicians
