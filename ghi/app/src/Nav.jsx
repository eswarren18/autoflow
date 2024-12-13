import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    setOpenDropdown(null); // Close all dropdowns on navigation
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Sales Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/sales') ? 'active' : ''}`}
                role="button"
                onClick={() => handleDropdownToggle('sales')}
                aria-expanded={openDropdown === 'sales'}
              >
                Sales
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'sales' ? 'show' : ''}`}>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales" end>View Sales</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales/new" end>Record New Sale</NavLink>
              </ul>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/service') ? 'active' : ''}`}
                role="button"
                onClick={() => handleDropdownToggle('service')}
                aria-expanded={openDropdown === 'service'}
              >
                Services
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'service' ? 'show' : ''}`}>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services" end>View All Service History</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services/upcoming" end>View Upcoming Service Appointments</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services/new" end>Schedule Service Appointment</NavLink>
              </ul>
            </li>

            {/* Inventory Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/inventory') ? 'active' : ''}`}
                role="button"
                onClick={() => handleDropdownToggle('inventory')}
                aria-expanded={openDropdown === 'inventory'}
              >
                Inventory
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'inventory' ? 'show' : ''}`}>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/inventory" end>View Inventory</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/inventory/new" end>Add Automobile to Inventory</NavLink>
              </ul>
            </li>

            {/* Sales Team Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/sales-team') ? 'active' : ''}`}
                role="button"
                onClick={() => handleDropdownToggle('sales-team')}
                aria-expanded={openDropdown === 'sales-team'}
              >
                Sales Team
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'sales-team' ? 'show' : ''}`}>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales-team" end>View Sales Team</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales-team/new" end>Add Salesperson</NavLink>
              </ul>
            </li>

            {/* Technicians Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/technicians') ? 'active' : ''}`}
                role="button"
                onClick={() => handleDropdownToggle('technicians')}
                aria-expanded={openDropdown === 'technicians'}
              >
                Technicians
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'technicians' ? 'show' : ''}`}>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/technicians" end>View Technicians</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/technicians/new" end>Add Technician</NavLink>
              </ul>
            </li>

            {/* Customers Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/customers') ? 'active' : ''}`}
                role="button"
                onClick={() => handleDropdownToggle('customers')}
                aria-expanded={openDropdown === 'customers'}
              >
                Customers
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'customers' ? 'show' : ''}`}>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/customers" end>View Customers</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/customers/new" end>Add Customer</NavLink>
              </ul>
            </li>

            {/* Manufacturers Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/manufacturers') ? 'active' : ''}`}
                role="button"
                onClick={() => handleDropdownToggle('manufacturers')}
                aria-expanded={openDropdown === 'manufacturers'}
              >
                Manufacturers
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'manufacturers' ? 'show' : ''}`}>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/manufacturers" end>View Manufacturers</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/manufacturers/new" end>Add Manufacturer</NavLink>
              </ul>
            </li>

            {/* Models Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/models') ? 'active' : ''}`}
                role="button"
                onClick={() => handleDropdownToggle('models')}
                aria-expanded={openDropdown === 'models'}
              >
                Models
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'models' ? 'show' : ''}`}>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/models" end>View Models</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/models/new" end>Add Model</NavLink>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
