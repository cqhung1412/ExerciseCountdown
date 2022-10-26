import React from "react";
import Navigation, { Screen } from "./wrappers/Navigation";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const screens: Screen[] = [
  {
    name: "Timer",
    component: Home,
  },
  {
    name: "Profile",
    component: Profile,
  },
];

const App = () => {
  return <Navigation screens={screens} />;
};

export default App;
