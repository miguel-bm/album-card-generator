import { BrowserRouter, Routes, Route } from "react-router";
import { SettingsProvider } from "./context/SettingsContext";
import { AlbumProvider } from "./context/AlbumContext";
import TopBar from "./components/TopBar";

export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AlbumProvider>
          <div className="min-h-screen bg-bg">
            <TopBar />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="p-8">
                    <h1 className="text-2xl font-semibold">
                      Album Card Generator
                    </h1>
                    <p className="text-text-muted mt-2">
                      Context providers + routing working.
                    </p>
                  </div>
                }
              />
              <Route
                path="/batch"
                element={
                  <div className="p-8">
                    <h1 className="text-2xl font-semibold">Batch Generator</h1>
                    <p className="text-text-muted mt-2">Batch page placeholder.</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </AlbumProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}
