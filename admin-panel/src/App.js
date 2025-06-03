import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import WomenPage from './pages/WomenPage';
import MenPage from './pages/MenPage';
import KidsPage from './pages/KidsPage';
import GiftsPage from './pages/GiftsPage';
import ProtectedRoute from './pages/ProtectedRoute';
import ProductDetails from './pages/ProductDetails';
import WishlistPage from './pages/WishlistPage';
import BuyPage from './pages/BuyPage';
import { ProductsProvider } from './ProductsContext';
import { WishlistProvider } from './WishlistContext';
import { OrderProvider } from './OrderContext';
import Navbar from './components/Navbar';

const HomeRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={user ? "/admin" : "/register"} />;
};

const LoginRedirect = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/admin" /> : <Login />;
};

const RegisterRedirect = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/admin" /> : <Register />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <ProductsProvider>
            <OrderProvider>
              <Navbar />
              <Routes>
                {/* Redirect routes */}
                <Route path="/" element={<HomeRedirect />} />
                <Route path="/login" element={<LoginRedirect />} />
                <Route path="/register" element={<RegisterRedirect />} />

                {/* Protected route */}
                <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />

                {/* Public pages */}
                <Route path="/women" element={<WomenPage />} />
                <Route path="/men" element={<MenPage />} />
                <Route path="/kids" element={<KidsPage />} />
                <Route path="/gifts" element={<GiftsPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/buy" element={<BuyPage />} />
              </Routes>
            </OrderProvider>
          </ProductsProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
