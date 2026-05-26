import { useNavigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

export default function RankingCategories() {

  const navigate = useNavigate();

  const categories = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
  ];

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

      <h2 className="text-center fw-bold mb-5">
        <FaTrophy/> Quiz Rankings
      </h2>

      <div className="row justify-content-center">

        {categories.map((cat, index) => (

          <div key={index} className="col-md-3 mb-4">

            <div
              className="card shadow border-0 p-4 text-center h-100"
              style={{
                cursor: "pointer",
                borderRadius: "16px",
                transition: "0.3s",
              }}
              onClick={() =>
                navigate(`/leaderboard/${cat}`)
              }
            >
              <h4 className="fw-bold">
                {cat}
              </h4>

              <p className="text-muted mt-2">
                View leaderboard
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}