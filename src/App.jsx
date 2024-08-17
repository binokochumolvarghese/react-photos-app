import { useState } from "react";
import "./App.css";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import { PhotoContextProvider } from "./store/PhotoContext";
import PhotosList from "./components/PhotoForms/PhotosList";
import SearchPhotos from "./components/PhotoForms/SearchPhotos";

function App() {
  return (
    <>
      <PhotoContextProvider>
        <Header />
        <div className="bodyComponent">
          <SearchPhotos />
          <PhotosList />
        </div>
        <Footer />
      </PhotoContextProvider>
    </>
  );
}

export default App;
