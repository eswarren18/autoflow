import { useEffect, useState } from "react";

export default function NewModel() {
    const initialState = {
        name: "",
        pictureUrl: "",
        manufacturer: "",
        showSuccess: false,
    };
    const [manufacturersState, setManufacturersState] = useState([]);
    const [formState, setFormState] = useState(initialState);

    const { name, pictureUrl, manufacturer, showSuccess } = formState;

    const handleChange = async (event) => {
        const { id, value } = event.target;
        setFormState({ ...formState, [id]: value });
    };

    const fetchData = async () => {
        const getResponse = await fetch("http://localhost:8100/api/manufacturers/")
        if (getResponse.ok) {
            const { manufacturers } = await getResponse.json();
            setManufacturersState(manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            "name": name,
            "picture_url": pictureUrl,
            "manufacturer_id": parseInt(manufacturer),
        };

        const resourceUrl = "http://localhost:8100/api/models/";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        const postResponse = await fetch(resourceUrl, options);

        if (postResponse.ok) {
            setFormState(prevState => ({ ...prevState, name: "", pictureUrl: "", manufacturer: "", showSuccess: true }));
            setTimeout(() => {
                setFormState(prevState => ({ ...prevState, showSuccess: false }));
            }, 3000);
        }
    };

    return (
        <div className="d-flex align-items-center flex-column">
            <form className="col-6 p-4 border rounded" onSubmit={handleSubmit}>
                <h1>Create a Vehicle Model</h1>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        placeholder="Name"
                        onChange={handleChange}
                    />
                    <label htmlFor="name">
                        Model Name
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="pictureUrl"
                        value={pictureUrl}
                        placeholder="Picture URL"
                        onChange={handleChange}
                    />
                    <label htmlFor="pictureUrl">
                        Picture URL
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <select required className="form-select" id="manufacturer" value={manufacturer} onChange={handleChange}>
                        <option value="">Select a Manufacturer</option>
                        {manufacturersState.map(manufacturer => {
                            return(
                                <option
                                    key={manufacturer.id}
                                    value={manufacturer.id}
                                >
                                    {manufacturer.name}
                                </option>
                            )
                        })}
                    </select>
                    <label htmlFor="manufacturer">Manufacturer</label>
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
