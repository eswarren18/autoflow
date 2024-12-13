import { useState } from "react";

export default function NewSalesperson() {
    const initialState = {
        firstName: "",
        lastName: "",
        employeeId: "",
        showSuccess: false,
    };

    const [formState, setFormState] = useState(initialState);
    const { firstName, lastName, employeeId, showSuccess } = formState;

    const handleChange = async (event) => {
        const { id, value } = event.target;
        setFormState({ ...formState, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            "first_name": firstName,
            "last_name": lastName,
            "employee_id": employeeId,
        };
        const resourceUrl = "http://localhost:8090/api/salespeople/";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        const postResponse = await fetch(resourceUrl, options);
        if (postResponse.ok) {
            setFormState(prevState => ({ ...prevState, firstName: "", lastName: "", employeeId: "", showSuccess: true }));
            setTimeout(() => {
                setFormState(prevState => ({ ...prevState, showSuccess: false }));
            }, 3000);
        }
    };

    return (
        <div className="d-flex align-items-center flex-column">
            <form className="col-6 p-4 border rounded" onSubmit={handleSubmit}>
                <h1>Add a Salesperson</h1>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        placeholder="First Name"
                        onChange={handleChange}
                    />
                    <label htmlFor="firstName">
                        First Name
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={handleChange}
                    />
                    <label htmlFor="lastName">
                        Last Name
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="employeeId"
                        value={employeeId}
                        placeholder="Employee ID"
                        onChange={handleChange}
                    />
                    <label htmlFor="employeeId">
                        Employee ID
                    </label>
                </div>
                <button className="btn btn-success">Create</button>
            </form>
            {showSuccess && (
                <div
                    className="alert alert-success col-6 p-2 mt-4"
                    role="alert"
                >
                    Form successfully submitted!
                </div>
            )}
        </div>
    );
}
