import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
export default function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
