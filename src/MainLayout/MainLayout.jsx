import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { store } from '../redux/store';
import Header from '../components/Header';
import Footer from '../components/Footer';


const MainLayout = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default MainLayout;