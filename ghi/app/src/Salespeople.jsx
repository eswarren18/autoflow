import { useEffect, useState } from "react";

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
            <h1>Salespeople</h1>
            {salespeopleState.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespeopleState.map(salesperson => {
                            return (
                                <tr key={salesperson.id}>
                                    <td>{salesperson.employee_id}</td>
                                    <td>{salesperson.first_name}</td>
                                    <td>{salesperson.last_name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>There are currently no salespeople on record. Use the Add Salesperson form to add a salesperson.</p>
            )}
        </div>
    );
}
