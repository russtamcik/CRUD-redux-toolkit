import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/front/HomePage";
import AdminLayout from "./components/layout/admin";
import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";
import UsersPage from "./pages/admin/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
