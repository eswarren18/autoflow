import { useEffect, useState } from "react";

export default function NewSale() {
    const initialState = {
        vin: "",
        salesperson: "",
        customer: "",
        price: "",
        showSuccess: false,
    };
    const [autosState, setAutosState] = useState([]);
    const [salespeopleState, setSalespeopleState] = useState([]);
    const [customerState, setCustomersState] = useState([]);
    const [formState, setFormState] = useState(initialState);

    const { vin, salesperson, customer, price, showSuccess } = formState;

    const handleChange = async (event) => {
        const { id, value } = event.target;
        setFormState({ ...formState, [id]: value });
    };

    const fetchData = async () => {
        const getAutoResponse = await fetch("http://localhost:8100/api/automobiles/")
        const getSalespersonResponse = await fetch("http://localhost:8090/api/salespeople/")
        const getCustomerResponse = await fetch ("http://localhost:8090/api/customers/")
        if (getAutoResponse.ok && getSalespersonResponse.ok && getCustomerResponse.ok) {
            const { autos } = await getAutoResponse.json();
            const { salespeople } = await getSalespersonResponse.json();
            const { customers } = await getCustomerResponse.json();
            const filterdAutos = autos.filter(auto => !auto.sold);
            setAutosState(filterdAutos);
            setSalespeopleState(salespeople);
            setCustomersState(customers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            "automobile": vin,
            "salesperson": parseInt(salesperson),
            "customer": parseInt(customer),
            "price": price,
        };

        const postUrl = "http://localhost:8090/api/sales/";
        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        const postResponse = await fetch(postUrl, postOptions);

        const putUrl = `http://localhost:8100/api/automobiles/${vin}/`;
        const putOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"sold": true}),
        }

        const putResponse = await fetch(putUrl, putOptions);

        if (postResponse.ok && putResponse.ok) {
            setFormState(prevState => ({ ...prevState, vin: "", salesperson: "", customer: "", price: "", showSuccess: true }));
            setTimeout(() => {
                setFormState(prevState => ({ ...prevState, showSuccess: false }));
            }, 3000);
        }
    };

    return (
        <div className="d-flex align-items-center flex-column">
            <form className="col-6 p-4 border rounded" onSubmit={handleSubmit}>
                <h1>Record a New Sale</h1>
                <div className="form-floating mb-3">
                    <select required className="form-select" id="vin" value={vin} onChange={handleChange}>
                        <option value="">Select an Automobile by VIN</option>
                        {autosState.map(auto => {
                            return(
                                <option
                                    key={auto.id}
                                    value={auto.vin}
                                >
                                    {auto.vin}
                                </option>
                            )
                        })}
                    </select>
                    <label htmlFor="vin">Automobile VIN</label>
                </div>
                <div className="form-floating mb-3">
                    <select required className="form-select" id="salesperson" value={salesperson} onChange={handleChange}>
                        <option value="">Select a Salesperson</option>
                        {salespeopleState.map(salesperson => {
                            return(
                                <option
                                    key={salesperson.id}
                                    value={salesperson.id}
                                >
                                    {`${salesperson.first_name} ${salesperson.last_name}`}
                                </option>
                            )
                        })}
                    </select>
                    <label htmlFor="salesperson">Salesperson</label>
                </div>
                <div className="form-floating mb-3">
                    <select required className="form-select" id="customer" value={customer} onChange={handleChange}>
                        <option value="">Select a Customer</option>
                        {customerState.map(customer => {
                            return(
                                <option
                                    key={customer.id}
                                    value={customer.id}
                                >
                                    {`${customer.first_name} ${customer.last_name}`}
                                </option>
                            )
                        })}
                    </select>
                    <label htmlFor="customer">Customer</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="price"
                        value={price}
                        placeholder="Price"
                        onChange={handleChange}
                    />
                    <label htmlFor="price">
                        Price
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
