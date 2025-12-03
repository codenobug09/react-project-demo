import { Link, Outlet } from "react-router";


export default function MainLayout() {
  return (
    <>
      <nav style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Outlet />

      <footer style={{ marginTop: "50px" }}>Footer © 2025</footer>

    </>
  );
}
