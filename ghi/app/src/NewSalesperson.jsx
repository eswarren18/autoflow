import { useState } from "react";

export default function Salesperson() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleFirstNameChange = async (event) => {
        const newValue = event.target.value;
        setFirstName(newValue);
    };

    const handleLastNameChange = async (event) => {
        const newValue = event.target.value;
        setLastName(newValue);
    };

    const handleEmployeeIdChange = async (event) => {
        const newValue = event.target.value;
        setEmployeeId(newValue);
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
            const newSalesperson = await postResponse.json();
            console.log(newSalesperson);
            setFirstName("");
            setLastName("");
            setEmployeeId("");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
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
                        onChange={handleFirstNameChange}
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
                        onChange={handleLastNameChange}
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
                        onChange={handleEmployeeIdChange}
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
