import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Salespeople() {
    const [salespeopleState, setSalespeopleState] = useState([]);

    const fetchSalespeople = async () => {
        const getSalespersonResponse = await fetch("http://localhost:8090/api/salespeople/");
        if (getSalespersonResponse.ok) {
            const { salespeople } = await getSalespersonResponse.json();
            setSalespeopleState(salespeople);
        }
    };

    useEffect(() => {
        fetchSalespeople();
    }, []);

    return (
        <div className="col-6 p-4 border rounded w-100">
            <div className="d-flex align-items-center justify-content-between">
                <h1 className="fw-bold">Salespeople</h1>
                <Link to="/sales/new" className="btn btn-success fw-bold">
                    Add a Salesperson
                </Link>
            </div>
            {salespeopleState.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="col-2">Employee ID</th>
                            <th className="col-5">First Name</th>
                            <th className="col-5">Last Name</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {salespeopleState.map((salesperson) => {
                            return (
                                <tr key={salesperson.id}>
                                    <td className="text-uppercase">{salesperson.employee_id}</td>
                                    <td className="text-capitalize">{salesperson.first_name}</td>
                                    <td className="text-capitalize">{salesperson.last_name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>
                    There are currently no salespeople on record. Use the Add
                    Salesperson form to add a salesperson.
                </p>
            )}
        </div>
    );
}
