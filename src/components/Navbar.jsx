import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();


  const isLoggedIn = !!localStorage.getItem("token"); // assuming token is stored after login

  useEffect(() => {

    const path = window.location.pathname;
    if (isLoggedIn && (path === "/login" || path === "/signup")) {
      navigate("/"); 
    } else if (!isLoggedIn && path === "/") {
      navigate("/login"); 
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#f5f5f5" }}>
      {!isLoggedIn && (
        <>
          <div onClick={() => navigate("/signup")}>Sign up</div>
          <div onClick={() => navigate("/login")}>Login</div>
        </>
      )}

      {isLoggedIn && (
        <>
          <div onClick={() => navigate("/")}>Dashboard</div>
          <div onClick={handleLogout}>Logout</div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
