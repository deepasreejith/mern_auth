import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { signOut } from "../redux/admin/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async()=>{
    try {
      await fetch('api/admin_auth/admin-signout');
      dispatch(signOut());
      navigate('/admin_signin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Admin</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/admin_home">
            <li>Home</li>
          </Link>
         
            <li className="cursor-pointer" onClick={handleSignout}>
              SignOut
            </li>
          
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
