import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";
import { AppShell } from "./components/layout/AppShell";
import { WizardPage } from "./components/wizard/WizardPage";
import { BomPage } from "./components/bom/BomPage";
import { StlPage } from "./components/stl/StlPage";
import { AssemblyPage } from "./components/assembly/AssemblyPage";
import { ProgressPage } from "./components/progress/ProgressPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/wizard" replace />} />
          <Route path="wizard" element={<WizardPage />} />
          <Route path="bom" element={<BomPage />} />
          <Route path="stl" element={<StlPage />} />
          <Route path="assembly" element={<AssemblyPage />} />
          <Route path="progress" element={<ProgressPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
