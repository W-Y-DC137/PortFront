import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import PageClient from "./pages/PageAcceuilClient";
import PageAgent from "./pages/PageAceuilAgent";
import ProfileAgent from './pages/AgentPages/Profile';
import AgentTicketList from './pages/AgentPages/TicketList';
import CreateTicket from './pages/ClientPages/CreateTicket';
import ClientTicketList from './pages/ClientPages/SuivreMesTickets'; // Add this import
import TicketDetails from './pages/TicketDetails';
import PageAdmin from "./pages/PageAcceuilAdmin";
import AdminUserList from './pages/AdminPages/UsersList';
import PrivateRoute from './router/PrivateRouter';
import TicketDetailsClient from './pages/ClientPages/TicketDetailsClient';
import UtilisateurDétails from './pages/AdminPages/ProfileUtilisateur';
import AjouterUtilisateur from './pages/AdminPages/AjouterUtilisateur';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './router/ProtectedRout';

const App = () => {
    return (
        <Router>
            <Routes>
                
                <Route path="/login" element={<Login />} />
                 {/* Routes protégées */}
                 <Route element={<ProtectedRoute />}>
                    <Route path="/client/tickets/:id" element={<TicketDetailsClient />} />
                </Route>
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="/reset_password" element={<ResetPassword />} />

                <Route
                    path="/employee/profile"
                    element={
                        <PrivateRoute>
                            <ProfileAgent />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <PageAdmin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/tickets"
                    element={
                        <PrivateRoute>
                            <AgentTicketList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <PrivateRoute>
                            <AdminUserList />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/users/:id"
                    element={
                        <PrivateRoute>
                            <UtilisateurDétails />
                        </PrivateRoute>
                    }
                />


                <Route
                    path="/users/Adding"
                    element={
                        <PrivateRoute>
                            <AjouterUtilisateur />
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
                    path="/agent/tickets"
                    element={
                        <PrivateRoute>
                            <AgentTicketList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ticket/:id"
                    element={
                        <PrivateRoute>
                            <TicketDetails />
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
                <Route
                    path="/client/create-ticket"
                    element={
                        <PrivateRoute>
                            <CreateTicket />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/client/tickets"
                    element={
                        <PrivateRoute>
                            <ClientTicketList />
                        </PrivateRoute>
                    }
                />
                 <Route
                    path="/client/tickets/:id"
                    element={
                        <PrivateRoute>
                            <TicketDetailsClient />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
