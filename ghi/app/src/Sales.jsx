import { useEffect, useState } from "react";

export default function Sales() {
    const [salesState, setSalesState] = useState([]);
    const [salespersonState, setSalespersonState] = useState("");

    const fetchSales = async () => {
        const getSaleResponse = await fetch("http://localhost:8090/api/sales/");
        if (getSaleResponse.ok) {
            const { sales } = await getSaleResponse.json();
            setSalesState(sales);
        }
    };

    const handleSalespersonChange = async (event) => {
        setSalespersonState(event.target.value);
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const filteredSales = salespersonState
        ? salesState.filter((sale) => sale.salesperson.id === parseInt(salespersonState))
        : salesState;

    return (
        <div className="col-6 p-4 border rounded w-100">
            <h1>Sales History</h1>
            <div className="form-floating mb-3">
                <select required className="form-select" id="salesperson" value={salespersonState} onChange={handleSalespersonChange}>
                    <option value="">Select a Salesperson</option>
                    {Array.from(new Set(salesState.map((sale) => sale.salesperson.id))).map((id) => {
                        const salesperson = salesState.find((sale) => sale.salesperson.id === id)?.salesperson;
                        return(
                            <option key={id} value={id}>
                                {`${salesperson.first_name} ${salesperson.last_name}`}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor="salesperson">Salesperson</label>
            </div>
            {salesState.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson Employee ID</th>
                            <th>Salesperson Name</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.employee_id}</td>
                                    <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                                    <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{`$${sale.price.toFixed(2)}`}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>There are currently no sales on record. Use the Add Sale Record form to add a sale.</p>
            )}
        </div>
    );
}
