import React from 'react'
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthForm from './pages/AuthForm.jsx';
import Home from './pages/Home.jsx';
import Contacts from './pages/Contacts.jsx';
import About from './pages/About.jsx';
import MainLayout from './layouts/MainLayout.jsx';
//
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import Profile from './pages/Profile.jsx';
import Favourites from './pages/Favourites.jsx';
import Settings from './pages/Settings.jsx';
import Cart from './pages/Cart.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ChatHome from './pages/ChatHome.jsx';
import ChatMainLayout from './layouts/ChatMainLayout.jsx';
import ExploreCategories from './components/chat/ExploreCategories.jsx';
import Explore from './components/chat/Explore.jsx';
import ExploreServers from './components/chat/ExploreServers.jsx';
import Server from './components/chat/Server.jsx';

const App = () => {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contacts" element={<Contacts />} />
            </Route>

            {/* Auth-protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/chat-home" element={<ChatMainLayout />}>
                <Route index element={<ChatHome />} />
                <Route path="explore/:categoryName" element={<ChatHome />} />
                <Route path="server/:serverId/:channelId?" element={<Server />} />
              </Route>
            </Route>

            {/* Auth forms */}
            <Route path="/login" element={<AuthForm isRegister={false} />} />
            <Route path="/register" element={<AuthForm isRegister={true} />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default App