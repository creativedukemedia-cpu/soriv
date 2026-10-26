import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Survey from "./pages/Survey";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/about"} element={<About />}></Route>
          <Route path={"/survey"} element={<Survey />}></Route>
          <Route path={"/contact"} element={<Contact />}></Route>
          <Route path={"/resources"} element={<Resources />}></Route>
          <Route path={"*"} element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
