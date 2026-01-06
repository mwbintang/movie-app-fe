import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";
import { BackButton } from "./components/Button";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
}

function Layout({ title, children, showBackButton = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {title && (
        <header className="sticky top-0 z-10 border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-4">
            {showBackButton && <BackButton />}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout title="Popular Movies">
              <Home />
            </Layout>
          } />
        <Route
          path="/movies/:id"
          element={
            <Layout title="Movie Details" showBackButton={true}>
              <MovieDetail />
            </Layout>
          }
        />
        {/* <Route path="/movies/:id" element={<MovieDetail />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
