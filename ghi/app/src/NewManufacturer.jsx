import { useState } from "react";

export default function NewManufacturer() {
    const initialState = {
        manufacturer: "",
        showSuccess: false,
    };

    const [formState, setFormState] = useState(initialState);
    const { manufacturer, showSuccess } = formState;

    const handleFormChange = async (event) => {
        const { id, value } = event.target;
        setFormState({...formState, [id]: value,});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            "name": manufacturer,
        };

        const resourceUrl = "http://localhost:8100/api/manufacturers/";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        const postResponse = await fetch(resourceUrl, options);
        if (postResponse.ok) {
            setFormState(prevState => ({ ...prevState, manufacturer: "", showSuccess: true }));
            setTimeout(() => {
                setFormState(prevState => ({ ...prevState, showSuccess: false }));
            }, 3000);
        }
    };

    return (
        <div className="d-flex align-items-center flex-column">
            <form className="col-6 p-4 shadow mt-4" onSubmit={handleSubmit}>
                <h2 className="mb-4">Add a Manufacturer</h2>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="manufacturer"
                        value={manufacturer}
                        placeholder="Manufacturer"
                        onChange={handleFormChange}
                    />
                    <label htmlFor="manufacturer">
                        Manufacturer
                    </label>
                </div>
                <button className="btn btn-success w-100 fw-bold py-2 fs-5">Add Manufacturer</button>
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
