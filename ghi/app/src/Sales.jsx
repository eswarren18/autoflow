import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Sales() {
    const [salesState, setSalesState] = useState([]);
    const [salespeopleState, setSalespeopleState] = useState([]);
    const [salespersonState, setSalespersonState] = useState("");

    const fetchSales = async () => {
        const getSaleResponse = await fetch("http://localhost:8090/api/sales/");
        if (getSaleResponse.ok) {
            const { sales } = await getSaleResponse.json();
            setSalesState(sales);
        }
    };

    const fetchSalespeople = async () => {
        const getSalespeopleResponse = await fetch("http://localhost:8090/api/salespeople/");
        if (getSalespeopleResponse.ok) {
            const { salespeople } = await getSalespeopleResponse.json();
            setSalespeopleState(salespeople);
        }
    }

    const handleSalespersonChange = async (event) => {
        setSalespersonState(event.target.value);
    };

    useEffect(() => {
        fetchSales();
        fetchSalespeople();
    }, []);

    const filteredSales = salespersonState
        ? salesState.filter((sale) => sale.salesperson.id === parseInt(salespersonState))
        : salesState;

    return (
        <div className="p-4 border rounded w-100">
            <div className="d-flex align-items-center justify-content-between">
                <h1 className="fw-bold">Sales History</h1>
                <Link to="/sales/new" className="btn btn-success fw-bold">
                    Add a Sales Record
                </Link>
            </div>
            <div className="form-floating mb-3 mt-3">
                <select required className="form-select" id="salesperson" value={salespersonState} onChange={handleSalespersonChange}>
                    <option value="">Select a Salesperson</option>
                    {salespeopleState.map((salesperson) => {
                        return (
                            <option key={salesperson.id} value={salesperson.id}>
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
                            <th className="col-1">Staff ID</th>
                            <th className="col-3">Sales Staff</th>
                            <th className="col-3">Customer</th>
                            <th className="col-3">VIN</th>
                            <th className="col-2">Price</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {filteredSales.length > 0 ? (
                            filteredSales.map((sale) => (
                                <tr key={sale.id}>
                                    <td className="text-uppercase">{sale.salesperson.employee_id}</td>
                                    <td className="text-capitalize">{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                                    <td className="text-capitalize">{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                                    <td className="text-uppercase">{sale.automobile.vin}</td>
                                    <td>{`$${sale.price.toFixed(2)}`}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12">
                                    Employee does not have any sales on record.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                <p>There are currently no sales on record. Use the Add a Sales Record form to add a sale.</p>
            )}
        </div>
    );
}
