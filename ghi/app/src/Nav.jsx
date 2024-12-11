import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Nav() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/sales') ? 'active' : ''}`}

                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales
              </a>
              <ul className="dropdown-menu">
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales">View All Sales</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales/new">Record New Sale</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales/history">Salesperson History</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/service') ? 'active' : ''}`}

                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu">
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services">View All Service History</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services/upcoming">View Upcoming Service Appointments</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services/new">Schedule Service Appointment</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/inventory') ? 'active' : ''}`}

                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventory
              </a>
              <ul className="dropdown-menu">
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/inventory">View Inventory</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/inventory/new">Add Automobile to Inventory</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/sales-team') ? 'active' : ''}`}

                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales Team
              </a>
              <ul className="dropdown-menu">
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales-team">View Sales Team</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales-team/new">Add Salesperson</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/technicians') ? 'active' : ''}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Technicians
              </a>
              <ul className="dropdown-menu">
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/technicians" end>View Technicians</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/technicians/new" end>Add Technician</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/customers') ? 'active' : ''}`}

                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Customers
              </a>
              <ul className="dropdown-menu">
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/customers">View Customers</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/customers/new">Add Customer</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/manufacturers') ? 'active' : ''}`}

                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manufacturers
              </a>
              <ul className="dropdown-menu">
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/manufacturers">View Manufacturers</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/manufacturers/new">Add Manufacturer</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/models') ? 'active' : ''}`}

                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Models
              </a>
              <ul className="dropdown-menu">
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/models">View Models</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/models/new">Add Model</NavLink>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
