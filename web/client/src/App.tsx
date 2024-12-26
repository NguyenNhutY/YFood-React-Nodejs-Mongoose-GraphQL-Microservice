// src/App.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import NotFound from "./pages/NotFound/NotFound";
import Info from "./pages/Info/Info";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Cur from "./components/Cur/Cur";
import Thanks from "./pages/Thanks/Thanks";
import Loading from "./pages/Loading/Loading";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Feedback from "./pages/Feedback/Feedback";
import Career from "./pages/Career/Career";
import Layout from "./containers/Layout/Layout";
import PullToRefresh from "react-pull-to-refresh";
import "react-toastify/dist/ReactToastify.css";
import NewsPage from "./pages/News/News";
import "./App.scss";
import NewsDetail from "./components/NewsDetail/NewsDetail";
import ProductPage from "./pages/Product/Product";
import Quiz from "./pages/Quiz/Quiz";
import {ApolloProvider } from "@apollo/client"
import clientGraphql from "./ApolloClient"

const App: React.FC = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    console.log("Page refreshed!");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Layout>
      <ScrollToTop />

      <div className='app'>
        <PullToRefresh onRefresh={handleRefresh}>
          <Routes>
            <Route path='/' element={<Home searchName={searchName} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/info' element={<Info />} />
            <Route path='/policy' element={<PrivacyPolicy />} />
            <Route path='/thanks' element={<Thanks />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/career' element={<Career />} />
            <Route path='/news' element={<NewsPage />} />{" "}
            <Route path='/news/:id' element={<NewsDetail />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/quiz' element={<Quiz />} />{" "}
          </Routes>
        </PullToRefresh>

        <Cur />
      </div>
    </Layout>
  );
};

export default App;
