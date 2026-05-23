import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../Firebase";

export default function Leaderboard() {

  const { category } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchLeaderboard = async () => {

      try {

        const q = query(
          collection(db, "leaderboard"),
          where("category", "==", category)
        );

        const snapshot = await getDocs(q);

        let list = [];

        snapshot.forEach((doc) => {
          list.push(doc.data());
        });

        setData(list);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchLeaderboard();

  }, [category]);

  const filteredData = data
    .filter(
      (item) =>
        item.category?.toLowerCase() ===
        category?.toLowerCase()
    )

    .reduce((acc, current) => {

      const existingUser = acc.find(
        (item) => item.email === current.email
      );

      if (!existingUser) {

        acc.push(current);

      } else if (
        current.score > existingUser.score
      ) {

        const index = acc.findIndex(
          (item) => item.email === current.email
        );

        acc[index] = current;
      }

      return acc;

    }, [])

    .sort((a, b) => b.score - a.score);

  // LOADING
  if (loading) {

    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (

    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",

        backgroundImage:
          "url('https://i1-c.pinimg.com/1200x/34/12/74/3412745d4803187eaeaf08dc1a83349b.jpg')",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="container">

        <div
          className="mx-auto shadow-lg p-4 p-md-5"
          style={{
            maxWidth: "900px",
            background: "rgba(255,255,255,0.92)",
            borderRadius: "20px",
            backdropFilter: "blur(5px)",
          }}
        >

          <h2 className="text-center fw-bold mb-4">
            🏆 {category} Leaderboard
          </h2>

          {filteredData.length === 0 ? (

            <p className="text-center text-muted fs-5">
              No scores yet 😢
            </p>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle shadow-sm">

                <thead
                  className="text-white"
                  style={{
                    background:
                      "linear-gradient(90deg,#0f2027,#203a43,#2c5364)",
                  }}
                >
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Score</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredData.map((item, index) => (

                    <tr key={index}>

                      <td className="fw-bold">
                        {index === 0
                          ? "1": index + 1}
                      </td>

                      <td>{item.email}</td>

                      <td className="fw-bold text-success">
                        {item.score}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

          <div className="text-center mt-4">

            <button
              className="btn btn-primary px-4 py-2 fw-bold"
              onClick={() => navigate("/categories")}
            >
            Play Again
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}