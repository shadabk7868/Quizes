import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function ShowQuiz() {
  const [quizes, setQuizes] = useState({});
  const [editData, setEditData] = useState(null);

  // 🔥 LOAD FROM FIREBASE (same object structure)
  useEffect(() => {
    const fetchQuizes = async () => {
      const ref = doc(db, "appdata", "allQuizes");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setQuizes(snap.data().data || {});
      }
    };

    fetchQuizes();
  }, []);

  const deleteQuiz = async (category, index) => {
    const updated = { ...quizes };
    updated[category].splice(index, 1);

    const ref = doc(db, "appdata", "allQuizes");
    await setDoc(ref, { data: updated });

    setQuizes(updated);
  };

  const updateQuiz = async () => {
    const { category, index, question, options, correctOption } = editData;
    const updated = { ...quizes };

    updated[category][index] = {
      question,
      options,
      correctOption,
    };

    const ref = doc(db, "appdata", "allQuizes");
    await setDoc(ref, { data: updated });

    setQuizes(updated);
    setEditData(null);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">All Quizzes</h4>

      {Object.keys(quizes).map((category) => (
        <div key={category} className="mb-4">
          <h5 className="text-primary">{category}</h5>

          {quizes[category].map((q, i) => {
            const optionsObj = q.options || {};
            const correctText = optionsObj[q.correctOption];

            const isEdit =
              editData &&
              editData.category === category &&
              editData.index === i;

            return (
              <div key={i} className="card p-3 mb-2 shadow-sm">
                {isEdit ? (
                  <>
                    <input
                      className="form-control mb-2"
                      value={editData.question}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          question: e.target.value,
                        })
                      }
                    />

                    {Object.keys(editData.options).map((key) => (
                      <input
                        key={key}
                        className="form-control mb-1"
                        value={editData.options[key]}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            options: {
                              ...editData.options,
                              [key]: e.target.value,
                            },
                          })
                        }
                      />
                    ))}

                    <select
                      className="form-control mb-3"
                      value={editData.correctOption}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          correctOption: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Select Correct Option
                      </option>
                      <option value="a">Option A</option>
                      <option value="b">Option B</option>
                      <option value="c">Option C</option>
                      <option value="d">Option D</option>
                    </select>

                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-success btn-sm w-25"
                        onClick={updateQuiz}
                      >
                        Update
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="fw-bold">{q.question}</p>

                    <ul>
                      {Object.entries(optionsObj).map(([key, val]) => (
                        <li key={key}>
                          <b>{key.toUpperCase()}.</b> {val}
                        </li>
                      ))}
                    </ul>

                    <p className="text-success fw-bold mb-3">
                      Correct Answer: {q.correctOption?.toUpperCase()} —{" "}
                      {correctText}
                    </p>

                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-warning btn-sm w-25"
                        onClick={() =>
                          setEditData({
                            category,
                            index: i,
                            question: q.question,
                            options: q.options,
                            correctOption: q.correctOption,
                          })
                        }
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-danger btn-sm w-25"
                        onClick={() => deleteQuiz(category, i)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}




// User side quiz play (MCQ attempt)
// 👉 Score calculate
// 👉 Leaderboard,   okay kardo or user side quiz play me wo quiz aani chaiye jo correct option ke sath admin show quiz me complete ho