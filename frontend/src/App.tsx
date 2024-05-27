import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import BrowsePage from "./pages/BrowsePage";
import AddToggle from "./components/AddToggle";
import SearchPage from "./pages/SearchPage";
import Toaster from "./components/Sonner";
import { useEffect } from "react";
import { Store } from "./store/store";

export default function App() {
  const store = Store();
  const redirect = useNavigate();

  useEffect(() => {
    store.getUser(redirect, "/login");
  }, [store.user])

  return (
    <div>
      <Toaster richColors position="top-center" />
      <AddToggle />
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<HomePage />} path="/personal" />
        <Route element={<HomePage />} path="/work" />
        <Route element={<HomePage />} path="/education" />
        <Route element={<ProfilePage />} path="/profile" />
        <Route element={<BrowsePage />} path="/browse" />
        <Route element={<SearchPage />} path="/search"></Route>

        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
      </Routes>
    </div>
  );
}
