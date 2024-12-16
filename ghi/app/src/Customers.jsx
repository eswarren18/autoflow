import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
            <div className="d-flex align-items-center justify-content-between">
                <h1 className="fw-bold">Customers</h1>
                <Link to="/customers/new" className="btn btn-success fw-bold">
                    Add a Customer
                </Link>
            </div>
            {customersState.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="col-2">First Name</th>
                            <th className="col-2">Last Name</th>
                            <th className="col-3">Phone Number</th>
                            <th className="col-5">Address</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {customersState.map((customer) => {
                            return (
                                <tr key={customer.id}>
                                    <td className="text-capitalize">{customer.first_name}</td>
                                    <td className="text-capitalize">{customer.last_name}</td>
                                    <td>{customer.phone_number}</td>
                                    <td className="text-capitalize">{customer.address}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>
                    There are currently no customers on record. Use the Add
                    Customer form to add a customer.
                </p>
            )}
        </div>
    );
}
