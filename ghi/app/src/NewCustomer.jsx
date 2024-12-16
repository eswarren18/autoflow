import { useState } from "react";

export default function NewCustomer() {
    const initialState = {
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        showSuccess: false,
    };
    const [formState, setFormState] = useState(initialState);
    const { firstName, lastName, address, phoneNumber, showSuccess } = formState;

    const handleChange = async (event) => {
        const { id, value } = event.target;
        setFormState({ ...formState, [id]: value });
    };

    const handlePhoneChange = (event) => {
        let input = event.target.value.replace(/\D/g, "");

        if (input.length > 10) input = input.slice(0, 10);
        if (input.length > 6) {
            input = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
        } else if (input.length > 3) {
            input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
        } else if (input.length > 0) {
            input = `(${input}`;
        }

        setFormState({ ...formState, phoneNumber: input })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            "first_name": firstName,
            "last_name": lastName,
            "address": address,
            "phone_number": phoneNumber,
        };

        const resourceUrl = "http://localhost:8090/api/customers/";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        const postResponse = await fetch(resourceUrl, options);

        if (postResponse.ok) {
            setFormState(prevState => ({ ...prevState, firstName: "", lastName: "", address: "", phoneNumber: "", showSuccess: true }));
            setTimeout(() => {
                setFormState(prevState => ({ ...prevState, showSuccess: false }));
            }, 3000);
        }
    };

    return (
        <div className="d-flex align-items-center flex-column">
            <form className="col-6 p-4 shadow mt-4" onSubmit={handleSubmit}>
                <h2 className="mb-4">Add a Customer</h2>
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
                        id="address"
                        value={address}
                        placeholder="Address"
                        onChange={handleChange}
                    />
                    <label htmlFor="address">
                        Address
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        placeholder="Phone Number"
                        minLength="14"
                        maxLength="14"
                        onChange={handlePhoneChange}
                    />
                    <label htmlFor="phoneNumber">
                        Phone Number
                    </label>
                </div>
                <button className="btn btn-success w-100 fw-bold py-2 fs-5">Add Customer</button>
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
