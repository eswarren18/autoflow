import { useEffect, useState } from "react";

export default function Customers() {
    const [customersState, setCustomersState] = useState([]);

    const fetchCustomers = async () => {
        const getCustomerResponse = await fetch("http://localhost:8090/api/customers/");
        if (getCustomerResponse.ok) {
            const { customers } = await getCustomerResponse.json();
            setCustomersState(customers);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="col-6 p-4 border rounded w-100">
            <h1>Customers</h1>
            {customersState.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersState.map(customer => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.phone_number}</td>
                                    <td>{customer.address}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>There are currently no customers on record. Use the Add Customer form to add a customer.</p>
            )}
        </div>
    );
}
