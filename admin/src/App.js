import './app.css'
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from './pages/login/Login'
import { AuthContext } from './context/authContext/AuthContext';
import { useContext } from 'react';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <>
      <Topbar />
      <div className="container">
        <Sidebar />
          <Routes>
            <Route path='/login' element={<Login/> } /> 
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/user/:userId' element={<User />} />
            <Route path='/newUser' element={<NewUser />} />
            <Route path='/movies' element={<ProductList />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/newProduct' element={<NewProduct />} />
          </Routes>
      </div>
      </>
    </Router>
  );
}

export default App;
