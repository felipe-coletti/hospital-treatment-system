import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import ViewDoctors from "../pages/ViewDoctors";
import ViewDoctor from "../pages/ViewDoctor";
import ViewReceptionists from "../pages/ViewReceptionists";
import ViewReceptionist from "../pages/ViewReceptionist";
import ViewPatientsResults from "../pages/ViewPatientsResults";
import ViewPatients from "../pages/ViewPatients";
import ViewPatient from "../pages/ViewPatient";
import Exam from "../pages/Exam";

const PagesRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/doctors" element={<ViewDoctors/>}/>
                <Route path="/doctors/:id" element={<ViewDoctor/>}/>
                <Route path="/receptionists" element={<ViewReceptionists/>}/>
                <Route path="/receptionists/:id" element={<ViewReceptionist/>}/>
                <Route path="/patients/results" element={<ViewPatientsResults/>}/>
                <Route path="/patients/results/:id" element={<ViewPatientsResults/>}/>
                <Route path="/patients" element={<ViewPatients/>}/>
                <Route path="/patients/:id" element={<ViewPatient/>}/>
                <Route path="/exam" element={<Exam/>}/>
            </Routes>
        </Router>
    )
}

export default PagesRoutes
