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
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales" end>View All Sales</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales/new" end>Record New Sale</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales/history" end>Salesperson History</NavLink>
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
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services" end>View All Service History</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services/upcoming" end>View Upcoming Service Appointments</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/services/new" end>Schedule Service Appointment</NavLink>
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
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/inventory" end>View Inventory</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/inventory/new" end>Add Automobile to Inventory</NavLink>
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
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales-team" end>View Sales Team</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/sales-team/new" end>Add Salesperson</NavLink>
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
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/customers" end>View Customers</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/customers/new" end>Add Customer</NavLink>
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
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/manufacturers" end>View Manufacturers</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/manufacturers/new" end>Add Manufacturer</NavLink>
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
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/models" end>View Models</NavLink>
                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/models/new" end>Add Model</NavLink>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
