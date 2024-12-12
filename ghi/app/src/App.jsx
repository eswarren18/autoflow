import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import Technicians from "./Technicians"
import NewTechnician from "./NewTechnician";
import NewAppointment from "./NewAppointment";
import NewSalesperson from "./NewSalesperson";
import NewCustomer from "./NewCustomer";

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
                    <Route path="/sales-team/new" element={<NewSalesperson />} />
                    <Route path="/customers/new" element={<NewCustomer />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
