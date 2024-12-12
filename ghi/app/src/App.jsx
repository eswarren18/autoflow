import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import Technicians from "./Technicians"
import NewTechnician from "./NewTechnician";
import NewAppointment from "./NewAppointment";
import PendingAppointments from "./PendingAppointments";
import Salespeople from "./Salespeople";
import NewSalesperson from "./NewSalesperson";
import ServiceHistory from "./ServiceHistory";
import NewCustomer from "./NewCustomer";
import NewSale from "./NewSale";
import Customers from "./Customers";
import Sales from "./Sales";
import Cars from "./Cars";
import NewCar from "./NewCar";
import Manufacturers from "./Manufacturers"
import NewManufacturer from "./NewManufacturer";
import Models from "./Models"
import NewModel from "./NewModel"

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container mt-4">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/technicians" element={<Technicians />} />
					<Route path="/technicians/new" element={<NewTechnician />} />
					<Route path="/services/new" element={<NewAppointment />} />
					<Route path="/services/upcoming" element={<PendingAppointments />} />
					<Route path="/services/" element={<ServiceHistory />} />
                    <Route path="/sales-team" element={<Salespeople />} />
                    <Route path="/sales-team/new" element={<NewSalesperson />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customers/new" element={<NewCustomer />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/sales/new" element={<NewSale />} />
                    <Route path="/inventory" element={<Cars />} />
                    <Route path="/inventory/new" element={<NewCar />} />
                    <Route path="/models" element={<Models />} />
                    <Route path="/models/new" element={<NewModel />} />
                    <Route path="/manufacturers" element={<Manufacturers />} />
                    <Route path="/manufacturers/new" element={<NewManufacturer />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
