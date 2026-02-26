// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../features/learn/components/Header/Header';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page content goes here – changes per route */}
      <main className="flex-grow pt-4 md:pt-6">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-6 text-center">
        © 2026 awsafambar.com. All rights reserved.
      </footer>
    </div>
  );
}