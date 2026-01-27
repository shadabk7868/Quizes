import { useEffect, useState } from "react";

export default function DashHero() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [categoryCount, setCategoryCount] = useState({});

  useEffect(() => {
    // USERS COUNT
    const users = JSON.parse(localStorage.getItem("allusers")) || [];
    setTotalUsers(users.length);

    // QUIZ DATA
    const quizes = JSON.parse(localStorage.getItem("allQuizes")) || {};

    let quesCount = 0;
    let catObj = {};

    Object.keys(quizes).forEach((cat) => {
      const len = quizes[cat]?.length || 0;
      quesCount += len;
      catObj[cat] = len;
    });

    setTotalQuestions(quesCount);
    setCategoryCount(catObj);
  }, []);

  return (
    <div className="container">
      <h3 className="mb-4 fw-bold">Admin Dashboard</h3>

      <div className="row g-4">
        {/* USERS */}
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h2>{totalUsers}</h2>
            </div>
          </div>
        </div>

        {/* TOTAL QUESTIONS */}
        <div className="col-md-4">
          <div className="card text-white bg-secondary shadow">
            <div className="card-body text-center">
              <h5>Total Quiz Questions</h5>
              <h2>{totalQuestions}</h2>
            </div>
          </div>
        </div>

        {/* CATEGORY WISE */}
        <div className="col-md-4">
          <div className="card bg-warning shadow">
            <div className="card-body">
              <h5 className="text-center">Category Wise</h5>
              <ul className="mt-3">
                {Object.keys(categoryCount).length === 0 && (
                  <li className="list-group-item text-center">
                    No Quiz Added
                  </li>
                )}

                {Object.entries(categoryCount).map(([cat, count], i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>{cat}</span>
                    <strong>{count}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

