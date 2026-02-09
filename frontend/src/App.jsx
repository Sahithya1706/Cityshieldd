import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import StreetLight from "./pages/StreetLight";
import WasteCollection from "./pages/WasteCollection";
import HousingComplaints from "./pages/HousingComplaints";
import ProtectedRoute from "./components/ProtectedRoute";
import GeneralIssues from "./pages/GeneralIssues";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/street-light"
          element={
            <ProtectedRoute>
              <StreetLight />
            </ProtectedRoute>
          }
        />

        <Route
          path="/waste-collection"
          element={
            <ProtectedRoute>
              <WasteCollection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/housing-complaints"
          element={
            <ProtectedRoute>
              <HousingComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/general-issues"
          element={
            <ProtectedRoute>
              <GeneralIssues />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
