import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateItem from "./features/CreateItem";
import ItemList from "./features/ItemList";
import Dashboard from "./pages/Dashboard";
import { CssBaseline } from "@mui/material";

function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <AuthProvider>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    {/* المسارات الاضافية */}
                    <Route path="/create" element={<PrivateRoute><CreateItem /></PrivateRoute>} />
                    <Route path="/list" element={<PrivateRoute><ItemList /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
