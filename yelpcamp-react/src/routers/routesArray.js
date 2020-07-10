import Detail from "../components/Campgrounds/Details";
import AllCamps from "../components/Campgrounds/AllCamps";
import UserLogin from "../components/UserLogin/UserLogin";
import UserRegister from "../components/UserRegister/UserRegister";
import NewCamp from "../components/Campgrounds/NewCamp";

export const routes = [
  {
    path: "/",
    name: "Landing",
    Component: AllCamps,
    modal: false,
    secured: false,
  },
  {
    path: "/campgrounds/:id",
    name: "Detail",
    Component: Detail,
    modal: false,
    secured: false,
  },
  {
    path: "/register",
    name: "register",
    Component: UserRegister,
    modal: true,
    secured: false,
  },
  {
    path: "/login",
    name: "login",
    Component: UserLogin,
    modal: true,
    secured: false,
  },
  {
    path: "/new-campground",
    name: "newCampground",
    Component: NewCamp,
    modal: true,
    secured: true,
  },
];
