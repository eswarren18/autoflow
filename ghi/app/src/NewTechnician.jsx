import { useState } from "react";

function NewTechnician() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    employee_id: ""
  }
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(event) {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const hatUrl = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(hatUrl, fetchConfig);
      if (response.ok) {
        await response.json();
        setFormData(initialFormData)
        setSaved(true);
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          {saved &&
            <div className="alert alert-success" role="alert">
              New technician sucessfully added!
            </div>
          }
          <h2 className="mb-4">Add a new technician</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input value={formData.employee_id} onChange={handleChange} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.first_name} onChange={handleChange} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.last_name} onChange={handleChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <button className="btn btn-success w-100 fw-bold py-2 fs-5">Add Technician</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTechnician;
