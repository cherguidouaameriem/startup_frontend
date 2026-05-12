import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import VanillaCake from "./components/cakeflavour/vanilla";
import AdminDashboard from "./components/AdminInterface";
import OrderConfirmation from "./components/Orderconfirmation";
import Home from "./Home";
import PartnerForm from "./components/PartnerForm";
import CakeBuilder from "./components/commande";
import Pastryshops from "./components/wilyas";
import ShopLogin from "./components/PastryLogin";
import DashboardPage from "./components/DashboardPage";
import DeliveryDetails from "./components/Livraison";
import AppLayout from "./components/AppLayout";
import BakerSelectionPage from "./components/BakersList";
import BakerProfile from "./sections/BakerProfile";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/dashboard.css";

function App() {
  return (
    
        <BrowserRouter>
          <Routes>

            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/partner-form" element={<PartnerForm />} />
            <Route path="/cake-builder" element={<CakeBuilder />} />
            <Route path="/cake-builder/:bakerId" element={<CakeBuilder/>} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/pastry-shops" element={<Pastryshops />} />
            <Route path="/vanilla" element={<VanillaCake/>} />
            <Route path="/connexion_patis" element={<ShopLogin/>}/>
            <Route path="/delivery" element={<DeliveryDetails />} />
            <Route path="/bakers" element={<BakerSelectionPage/>}/>
            <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/baker/:bakerId" element={<BakerProfile />} />
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            
            </Route>

          </Routes>
        </BrowserRouter>
   
  );
}

export default App;