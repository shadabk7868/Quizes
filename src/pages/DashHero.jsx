import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function DashHero() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [categoryCount, setCategoryCount] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // USERS
      const usersSnap = await getDocs(collection(db, "users"));
      setTotalUsers(usersSnap.size);

      // QUIZ
      const quizSnap = await getDocs(collection(db, "quizzes"));
      let total = 0;
      let catObj = {};

      quizSnap.forEach(doc => {
        const data = doc.data();
        total++;
        catObj[data.category] = (catObj[data.category] || 0) + 1;
      });

      setTotalQuestions(total);
      setCategoryCount(catObj);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h3 className="mb-4 fw-bold">Admin Dashboard</h3>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h2>{totalUsers}</h2>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-white bg-secondary shadow">
            <div className="card-body text-center">
              <h5>Total Quiz Questions</h5>
              <h2>{totalQuestions}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning shadow">
            <div className="card-body">
              <h5 className="text-center">Category Wise</h5>
              <ul className="mt-3">
                {Object.keys(categoryCount).length === 0 && (
                  <li className="list-group-item text-center">No Quiz Added</li>
                )}

                {Object.entries(categoryCount).map(([cat, count], i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
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
