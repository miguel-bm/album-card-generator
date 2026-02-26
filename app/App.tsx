import { BrowserRouter, Routes, Route } from "react-router";
import { SettingsProvider } from "./context/SettingsContext";
import { AlbumProvider } from "./context/AlbumContext";
import TopBar from "./components/TopBar";
import DesignPage from "./pages/DesignPage";
import BatchPage from "./pages/BatchPage";

export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AlbumProvider>
          <div className="min-h-screen bg-bg">
            <TopBar />
            <Routes>
              <Route path="/" element={<DesignPage />} />
              <Route path="/batch" element={<BatchPage />} />
            </Routes>
          </div>
        </AlbumProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}
