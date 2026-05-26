import { Link } from "react-router-dom";

import { MdQuiz } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#f5f7fb",
      }}
    >

      {/* HERO SECTION */}
      <div
        className="text-white text-center py-5"
        style={{
          background:
            "linear-gradient(135deg, #1c2447, #46236c)",
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">

          <div
            className="mx-auto"
            style={{
              maxWidth: "750px",
            }}
          >
            <h1
              className="fw-bold"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
              }}
            >
              Quiz Master 🎯
            </h1>

            <p
              className="lead mt-4"
              style={{
                color: "#d7d7d7",
                lineHeight: "1.8",
              }}
            >
              Challenge yourself with interactive quizzes,
              improve your skills, and compete on the
              leaderboard 🚀
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">

              <Link
                to="/categories"
                className="btn btn-light px-4 py-2 py-md-3 px-md-5 fw-bold shadow"
                style={{
                  borderRadius: "14px",
                }}
              >
                Start Quiz
              </Link>

              <Link
                to="/rankings"
                className="btn btn-outline-light px-4 py-2 py-md-3 px-md-5 fw-bold"
                style={{
                  borderRadius: "14px",
                }}
              >
                View Rankings
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Why Choose Quiz Master?
          </h2>

          <p className="text-muted mt-3">
            Learn, practice and test your knowledge
            with modern quizzes.
          </p>
        </div>

        <div className="row g-4">

          {/* CARD 1 */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg h-100 p-3 p-md-4"
              style={{
                borderRadius: "20px",
                transition: "0.3s",
              }}
            >
              <div className="card-body text-center">

                <div
                  className="mb-3 text-primary"
                  style={{
                    fontSize: "clamp(35px, 8vw, 50px)",
                  }}
                >
                  <MdQuiz />
                </div>

                <h4 className="fw-bold">
                  Multiple Categories
                </h4>

                <p className="text-muted mt-3">
                  Explore quizzes on HTML, CSS,
                  JavaScript, React and more.
                </p>

              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg h-100 p-4"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body text-center">

                <div
                  className="mb-3 text-warning"
                  style={{
                    fontSize: "clamp(35px, 8vw, 50px)",
                  }}
                >
                  <BsLightningChargeFill />
                </div>

                <h4 className="fw-bold">
                  Instant Results
                </h4>

                <p className="text-muted mt-3">
                  Get real-time scores and instantly
                  track your quiz performance.
                </p>

              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg h-100 p-4"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body text-center">

                <div
                  className="mb-3 text-success"
                  style={{
                    fontSize: "clamp(35px, 8vw, 50px)",
                  }}
                >
                  <FaTrophy />
                </div>

                <h4 className="fw-bold">
                  Leaderboard
                </h4>

                <p className="text-muted mt-3">
                  Compete with other players and
                  climb the rankings.
                </p>

                <Link
                  to="/rankings"
                  className="btn btn-outline-primary mt-3 px-4"
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  Explore
                </Link>

              </div>
            </div>
          </div>

        </div>

      </div>

      <div
        className="py-5"
        style={{
          backgroundColor: "#eef2ff",
        }}
      >
        <div className="container text-center">

          <h2 className="fw-bold mb-5">
            How It Works ?
          </h2>

          <div className="row g-4">

            <div className="col-md-4">
              <div
                className="bg-white shadow-sm p-3 p-md-4 h-100"
                style={{
                  borderRadius: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(30px, 8vw, 45px)",
                  }}
                >
                  1
                </div>

                <h5 className="fw-bold mt-3">
                  Select Category
                </h5>

                <p className="text-muted mt-2">
                  Pick your favorite topic and start
                  your learning journey.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="bg-white shadow-sm p-3 p-md-4 h-100"
                style={{
                  borderRadius: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(30px, 8vw, 45px)",
                  }}
                >
                  2
                </div>

                <h5 className="fw-bold mt-3">
                  Answer Questions
                </h5>

                <p className="text-muted mt-2">
                  Solve quiz questions with timer
                  based challenges.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="bg-white shadow-sm p-3 p-md-4 h-100"
                style={{
                  borderRadius: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(30px, 8vw, 45px)",
                  }}
                >
                  3
                </div>

                <h5 className="fw-bold mt-3">
                  Check Results
                </h5>

                <p className="text-muted mt-2">
                  View your score instantly and
                  compare with others.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}