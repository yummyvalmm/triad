import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import MainLayout from './layouts/MainLayout';
import Preloader from './components/ui/Preloader';

// Lazy load pages for better performance (Code Splitting)
const Home = React.lazy(() => import('./pages/Home'));
const Checkout = React.lazy(() => import('./pages/Checkout'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="bg-brand-black min-h-screen" />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;