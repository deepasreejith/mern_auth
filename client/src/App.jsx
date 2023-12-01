import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import PrivateRouteAdmin from "./components/PrivateRouteAdmin"
import AdminSignIn from "./pages/AdminSignin"
import AdminHome from "./pages/AdminHome"
import AdminEditUser from "./pages/AdminEditUser"
import AdminCreateUser from "./pages/AdminCreateUser"

function App() {
  return (
   <BrowserRouter>
  
   <Routes>
    <Route path="/" element={<Home />} />

    {/* <Route path="/admin" element={<AdminSignIn />} /> */}
    <Route path="/admin_signin" element={<AdminSignIn />} />
    <Route element={<PrivateRouteAdmin />}>
    <Route path="/admin_home" element={<AdminHome />} />
    <Route path='/admin/editUser/:id' element={<AdminEditUser/>}/>
    <Route path="/admin/addUser" element={<AdminCreateUser />} />
    </Route>

    <Route path="/about" element={<About />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile />} />
    </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
