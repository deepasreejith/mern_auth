import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"

function PrivateRouteAdmin() {
    const {currentAdmin} = useSelector(state =>state.admin)
  return currentAdmin ? <Outlet /> : <Navigate to='/admin_signin' />
}



export default PrivateRouteAdmin