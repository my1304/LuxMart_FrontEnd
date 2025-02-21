import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';

import AppRoutes from '../Routes/Routes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import UserForm from '../User/UserForm';
import { getCategories } from '../../features/categories/categoriesSlice';
import { getProducts } from '../../features/products/productsSlice';
import { fetchUserProfile } from '../../features/user/userSlice';

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
        dispatch(fetchUserProfile());
    }, [dispatch]);

    // Проверяем текущий путь и решаем, нужно ли отображать Sidebar
    const shouldDisplaySidebar = !location.pathname.startsWith('/help')
                            && !location.pathname.startsWith('/terms')
                            && !location.pathname.startsWith('/cart')
                            && !location.pathname.startsWith('/orders');

    return (
        <div className="app">
            <Header />
            <UserForm />
            <div className="container">
                {shouldDisplaySidebar && <Sidebar />}
                <AppRoutes />
            </div>
            <Footer />
        </div>
    );
};

export default App;