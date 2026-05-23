import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [allQuizes, setAllQuizes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "appdata", "allQuizes");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data().data || {};
        const order = ["HTML", "CSS", "JS", "REACT"];
        const cats = order.filter(cat => data[cat]?.length > 0);

        setAllQuizes(data);
        setCategories(cats);
      }
    };

    fetchData();
  }, []);

  return (
    <div
  className="container-fluid py-5 text-center"
  style={{
    minHeight: "100vh",
    backgroundImage:
      "url('https://i1-c.pinimg.com/736x/ad/02/07/ad020763b7c3198a3da9f24b9a462fcc.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
      <h2 className="fw-bold  mb-5"
      style={{
          color: "#474747",
        }}>Select Quiz Category 🎯</h2>

      <div className="row justify-content-center px-4">

        {categories.map((cat) => (
          <div key={cat} className="col-10 col-sm-6 col-md-4 col-lg-3 mb-4">

            <div
              className="card shadow border-0 p-5 h-100"
              style={{
                cursor: "pointer",
                borderRadius: "15px",
                minHeight: "180px",
                backgroundColor:"#eeecece4",
              }}
              onClick={() => navigate(`/quizzes/${cat}`)}
            >
              <h3 className="fw-bold">{cat}</h3>

              <p className="text-muted mt-3 fs-5">
                {allQuizes[cat]?.length} Questions
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}