import { useEffect, useState } from "react";

export default function NewCar() {
    const initialState = {
        color: "",
        year: "",
        vin: "",
        model: "",
        showSuccess: false,
    };
    const [modelsState, setModelsState] = useState([]);
    const [formState, setFormState] = useState(initialState);

    const { color, year, vin, model, showSuccess } = formState;

    const handleChange = async (event) => {
        const { id, value } = event.target;
        setFormState({ ...formState, [id]: value });
    };

    const fetchData = async () => {
        const getResponse = await fetch("http://localhost:8100/api/models/")
        if (getResponse.ok) {
            const { models } = await getResponse.json();
            setModelsState(models);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            "color": color,
            "year": parseInt(year),
            "vin": vin,
            "model_id": parseInt(model),
        };
        const resourceUrl = "http://localhost:8100/api/automobiles/";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        const postResponse = await fetch(resourceUrl, options);

        if (postResponse.ok) {
            setFormState(prevState => ({ ...prevState, color: "", year: "", vin: "", model: "", showSuccess: true }));
            setTimeout(() => {
                setFormState(prevState => ({ ...prevState, showSuccess: false }));
            }, 3000);
        }
    };

    return (
        <div className="d-flex align-items-center flex-column">
            <form className="col-6 p-4 border rounded" onSubmit={handleSubmit}>
                <h1>Add a Automobile to the Inventory</h1>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="color"
                        value={color}
                        placeholder="Color"
                        onChange={handleChange}
                    />
                    <label htmlFor="color">
                        Color
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="year"
                        value={year}
                        placeholder="Year"
                        onChange={handleChange}
                    />
                    <label htmlFor="year">
                        Year
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="vin"
                        value={vin}
                        placeholder="Vin"
                        minLength="17"
                        maxLength="17"
                        onChange={handleChange}
                    />
                    <label htmlFor="vin">
                        VIN
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <select required className="form-select" id="model" value={model} onChange={handleChange}>
                        <option value="">Select a Model</option>
                        {modelsState.map(model => {
                            return(
                                <option
                                    key={model.id}
                                    value={model.id}
                                >
                                    {model.name}
                                </option>
                            )
                        })}
                    </select>
                    <label htmlFor="model">Model</label>
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
