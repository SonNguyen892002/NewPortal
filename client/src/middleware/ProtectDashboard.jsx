import { Navigate, Outlet } from "react-router-dom";
import storeContext from "../context/storeContext";
import { useContext } from "react";

const ProtectDashboard = () => {
  const { store } = useContext(storeContext);

  if (store.userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectDashboard;
