import Landing from "./pages/Landing";
import MovieDetails from "./pages/MovieDetails";
import TheatreSelection from "./pages/TheatreSelection";
import BookingWindow from "./pages/BookingWindow";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Authentication from "./pages/Authentication";
import UserProfile from "./pages/Authentication/UserProfile";
import Food from "./pages/Food";
import Summary from "./pages/Summary";
import Success from "./pages/Payments/Success";
import Failure from "./pages/Payments/Failure";
import AdminMovie from "./pages/Admin/Movie";
import AdminTheatre from "./pages/Admin/Theatre";
import AdminScreen from "./pages/Admin/Screen";
import AdminFood from "./pages/Admin/Food";
import parties from "./pages/parties/partiespage";
import ForgotPassword from "./pages/Authentication/forgotPassword";
import longtermrental from "./pages/parties/longtermrental";
import inquirenow from "./pages/parties/inquirenow";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Landing,
    layout: "public",
  },
  {
    path: "/login",
    name: "Authentication",
    component: Authentication,
    layout: "public",
  },
  {
    path: "/profile",
    name: "Profile",
    component: UserProfile,
    layout: "private",
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: ForgotPassword,
    layout: "pubic",
  },
  {
    path: "/movies",
    name: "Movies",
    component: MovieDetails,
    layout: "public",
  },
  {
    path: "/theatre",
    name: "Theatres",
    component: TheatreSelection,
    layout: "private",
  },
  {
    path: "/booking",
    name: "Booking",
    component: BookingWindow,
    layout: "private",
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    layout: "public",
  },
  { path: "/food", name: "Food", component: Food, layout: "private" },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
    layout: "public",
  },
  {
    path: "/parties",
    name: "Parties at Cineverse",
    component: parties,
    layout: "public",
  },
  {
    path: "/parties/longtermrental",
    name: "Long Term Rentals",
    component: longtermrental,
    layout: "private",
  },
  {
    path: "/parties/inquirenow",
    name: "Inquire Now",
    component: inquirenow,
    layout: "private",
  },
  {
    path: "/summary",
    name: "Summary",
    component: Summary,
    layout: "private",
  },
  {
    path: "/paymentSuccess",
    name: "paymentSuccess",
    component: Success,
    layout: "none",
  },
  {
    path: "/paymentFail",
    name: "paymentFail",
    component: Failure,
    layout: "none",
  },
  {
    path: "/admin/food",
    name: "Food",
    component: AdminFood,
    layout: "admin",
  },
  {
    path: "/admin/movie",
    name: "Movie",
    component: AdminMovie,
    layout: "admin",
  },
  {
    path: "/admin/theatre",
    name: "Theatre",
    component: AdminTheatre,
    layout: "admin",
  },
  {
    path: "/admin/screen",
    name: "Screen",
    component: AdminScreen,
    layout: "admin",
  },
];

export default routes;
