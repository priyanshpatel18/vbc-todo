import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import BrowsePage from "./pages/BrowsePage";
import AddToggle from "./components/AddToggle";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <div>
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
