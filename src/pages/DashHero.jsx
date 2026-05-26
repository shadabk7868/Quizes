import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { FaUsers } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";

export default function DashHero() {
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [categoryCount, setCategoryCount] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const usersSnap = await getDocs(
        collection(db, "users")
      );

      setTotalUsers(usersSnap.size);

      const ref = doc(db, "appdata", "allQuizes");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data().data || {};

        let total = 0;
        let catObj = {};

        Object.keys(data).forEach((category) => {
          const questions = data[category];

          catObj[category] = questions.length;

          total += questions.length;
        });

        setTotalQuestions(total);
        setCategoryCount(catObj);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <h2
        className="fw-bold mb-4"
        style={{
          color: "#1c2447",
        }}
      >
        Admin Dashboard
      </h2>

      <div className="row g-3">

        {/* USERS */}
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="card border-0 shadow-sm h-50 p-2"
            style={{
              borderRadius: "16px",
              backgroundColor: "#4f46e5",
              transition: "0.3s",
            }}
            // onClick={() => navigate("/")}
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.transform =
            //     "translateY(-3px)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.transform =
            //     "translateY(0px)";
            // }}
          >
            <div className="card-body text-white text-center py-3">
              <h6 className="fw-semibold">
                 Total Users
              </h6>

              <h2 className="fw-bold mt-2">
                {totalUsers}
              </h2>
            </div>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="card border-0 shadow-sm h-50 p-2"
            style={{
              borderRadius: "16px",
              cursor: "pointer",
              backgroundColor: "#c96a2b",
              transition: "0.3s",
            }}
            onClick={() => navigate("/dashboard/showquiz")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px)";
            }}
          >
            <div className="card-body text-white text-center py-3">
              <h6 className="fw-semibold">
                 Total Questions
              </h6>

              <h2 className="fw-bold mt-2">
                {totalQuestions}
              </h2>
            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="col-12 col-lg-4">
          <div
            className="card border-0 shadow-sm p-3"
            style={{
              borderRadius: "16px",
              backgroundColor: "#f8fafc",
            }}
          >
            <div className="card-body py-2">
              <h6 className="text-center fw-bold mb-3">
                 Category Wise
              </h6>

              <ul className="list-group">

                {Object.keys(categoryCount).length === 0 && (
                  <li className="list-group-item text-center rounded-3">
                    No Quiz Added
                  </li>
                )}

                {Object.entries(categoryCount).map(
                  ([cat, count], i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between align-items-center mb-2 rounded-3"
                      style={{
                        cursor: "pointer",
                        transition: "0.3s",
                        backgroundColor: "#ffffff",
                      }}
                      onClick={() =>
                        navigate(`/dashboard/showquiz/${cat}`)
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1.01)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1)";
                      }}
                    >
                      <span className="fw-semibold">
                        {cat}
                      </span>

                      <span className="badge bg-dark px-3 py-2">
                        {count}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}