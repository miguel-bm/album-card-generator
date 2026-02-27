import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { SettingsProvider } from "./context/SettingsContext";
import { AlbumProvider } from "./context/AlbumContext";
import TopBar from "./components/TopBar";
import DesignPage from "./pages/DesignPage";
import AboutPage from "./pages/AboutPage";

const PrintPage = lazy(() => import("./pages/PrintPage"));
const WriteTagsPage = lazy(() => import("./pages/WriteTagsPage"));

function PageFallback() {
  return <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 text-sm text-text-muted">Loading...</div>;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<DesignPage />} />
          <Route
            path="/print"
            element={(
              <Suspense fallback={<PageFallback />}>
                <PrintPage />
              </Suspense>
            )}
          />
          <Route
            path="/write-tags"
            element={(
              <Suspense fallback={<PageFallback />}>
                <WriteTagsPage />
              </Suspense>
            )}
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AlbumProvider>
          <div className="min-h-screen bg-bg">
            <TopBar />
            <AnimatedRoutes />
            <Toaster
              position="bottom-right"
              closeButton
              duration={2000}
              toastOptions={{
                style: {
                  background: "#FFFFFF",
                  border: "1px solid #E8E5E0",
                  color: "#1A1A1A",
                  fontFamily: "Inter, sans-serif",
                },
              }}
            />
          </div>
        </AlbumProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}
