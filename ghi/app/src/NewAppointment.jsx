import { useEffect, useState } from "react";

function NewAppointment() {
    const initialFormData = {
        date: "",
        time: "",
        reason: "",
        vin: "",
        customer: "",
        technician: ""
    }
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [technicians, setTechnicians] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const hatUrl = 'http://localhost:8080/api/appointments/';
        const postData = {
            ...formData,
            date_time: formData.date + " " + formData.time,
            status: "pending"
        }
        delete postData.date
        delete postData.time
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(postData),
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
                            New service appointment sucessfully created!
                        </div>
                    }
                    <h2 className="mb-4">Schedule a service appointment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input value={formData.vin} onChange={handleChange} placeholder="Automobile VIN" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Automobile VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.customer} onChange={handleChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.date} onChange={handleChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.time} onChange={handleChange} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                            <label htmlFor="time">Time</label>
                        </div>

                        <div className="form-floating mb-3">
                            <select value={formData.technician || ""} onChange={handleChange} required name="technician" id="technician" className="form-select">
                                <option value="">Choose a technician</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.id}>
                                          {technician.employee_id}: {technician.first_name} {technician.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                            <label htmlFor="technician">Technician</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.reason} onChange={handleChange} placeholder="Reason For Service" required type="text" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason For Service</label>
                        </div>
                        <button className="btn btn-success w-100 fw-bold py-2 fs-5">Schedule Service</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewAppointment;
