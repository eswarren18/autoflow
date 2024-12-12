import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import Technicians from "./Technicians"
import NewTechnician from "./NewTechnician";
import NewAppointment from "./NewAppointment";
import PendingAppointments from "./PendingAppointments";
import NewSalesperson from "./NewSalesperson";

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
					<Route path="/sales-team/new" element={<NewSalesperson />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
