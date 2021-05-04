import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from './Users';
import Dashboard from './Dashboard';


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users/*" element={<Users />} />
      </Routes>
    </div>
  );
}
