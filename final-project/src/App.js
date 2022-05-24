import "./App.css";
import "./index.css";
import LoginContainer from "./Components/LoginContainer/LoginContainer";
import { useState } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import NotFound from "./Static/NotFound";
import SessionContext from "./Contexts/SessionContext";
import PostViewer from "./Components/PostViewer/PostViewer";
import Admin from './Components/Admin/Admin';
import Container from "./Components/Container/Container";
import ContainerMobile from './Components/Container/ContainerMobile'
import Favorites from './Components/Container/Favorites/Favorites'

import Crossroad from "./Components/Crossroad/Crossroad";

function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.login != null ? JSON.parse(localStorage.login) : {});
  return (
    <SessionContext.Provider value={{ authenticated, setAuthenticated }}>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<LoginContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/home" element={<Crossroad />} />
          <Route path="/main" element={<Container />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/posts/:id" element={<PostViewer />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/mobile" element={<ContainerMobile />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </HashRouter>
    </SessionContext.Provider>
  );
}

export default App;
