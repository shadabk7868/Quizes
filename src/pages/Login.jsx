import { useNavigate, NavLink } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase.js';
import { useFormik } from 'formik';

export default function Login() {

  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const querySnapshot = await getDocs(collection(db, "users"));
      let users = [];

      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      const user = users.find(
        u => u.email === values.email && u.password === values.password
      );

      console.log(user);

      if (user) {
        localStorage.setItem("userloggedIn", "true");
        nav("/", { replace: true });
      } else {
        alert("Invalid email or password");
      }
    }
  });

  return (
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-50 p-5 rounded shadow'
        style={{
          background: "linear-gradient(135deg, #8d64b6, #48325c)"
        }}
      >
        <h1 className='text-center text-dark mb-4'>Login User</h1>

        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-light fw-bold">Submit</button>
          <NavLink to="/register" className="text-white text-decoration-none">
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
}
