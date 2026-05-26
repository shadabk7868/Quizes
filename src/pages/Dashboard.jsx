import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {BsLightningChargeFill} from "react-icons/bs"

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login", { replace: true });
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav
        className="navbar px-3 px-md-4 py-3 shadow"
        style={{
          background:
            "linear-gradient(135deg, #141e30, #243b55)",
        }}
      >
        <span className="navbar-brand fw-bold text-white fs-4">
          Admin Panel <BsLightningChargeFill/>
        </span>

        <button
          className="btn btn-outline-light btn-sm px-3"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      <div className="d-flex flex-column flex-md-row w-100 min-vh-100">

        {/* SIDEBAR */}
        <div
          className="p-3 p-md-4 d-flex flex-md-column flex-row gap-3 gap-md-4 shadow flex-wrap"
          style={{
            minWidth: "100%",
            background:
              "linear-gradient(180deg, #1e293b, #0f172a)",
          }}
        >

          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-primary text-white rounded px-3 py-2 fw-bold text-center"
                : "nav-link text-light px-3 py-2 text-center"
            }
          >
          Dashboard
          </NavLink>

          <NavLink
            to="addquiz"
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-primary text-white rounded px-3 py-2 fw-bold text-center"
                : "nav-link text-light px-3 py-2 text-center"
            }
          >
          Add Quiz
          </NavLink>

          <NavLink
            to="showquiz"
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-primary text-white rounded px-3 py-2 fw-bold text-center"
                : "nav-link text-light px-3 py-2 text-center"
            }
          >
          Show Quiz
          </NavLink>


        </div>

        {/* MAIN CONTENT */}
        <div
          className="p-3 p-md-4 w-100"
          style={{
            overflowY: "auto",
            background: "#f1f5f9",
          }}
        >
          <Outlet />
        </div>

      </div>

      {/* RESPONSIVE SIDEBAR WIDTH */}
      <style>
        {`
          @media (min-width: 768px) {
            .d-flex.flex-column.flex-md-row > div:first-child {
              min-width: 240px !important;
              min-height: 100vh;
            }
          }
        `}
      </style>
    </>
  );
}