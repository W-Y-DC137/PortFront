import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import PageAdmin from "./pages/PageAcceuilAdmin";
import PageAgent from "./pages/PageAceuilAgent";
import PageClient from "./pages/PageAcceuilClient";
import PrivateRoute from './router/PrivateRouter';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <PageAdmin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/agent"
                    element={
                        <PrivateRoute>
                            <PageAgent />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/client"
                    element={
                        <PrivateRoute>
                            <PageClient />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;