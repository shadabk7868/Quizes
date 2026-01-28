import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Firebase.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register() {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: values.email,
          password: values.password,
        });

        console.log("Document written with ID: ", docRef.id);
        alert("User registered successfully");
        nav("/login");

      } catch (err) {
        console.error("Error adding document: ", err);
        alert("Something went wrong");
      }
    },
  });

  return (
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center bg-light'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-50 text-white p-5 rounded shadow'
        style={{ background: "linear-gradient(135deg, #8d64b6, #48325c)" }}
      >
        <h2 className='text-center text-dark mb-4'>Register User</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-warning">{formik.errors.email}</small>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <small className="text-warning">{formik.errors.password}</small>
          )}
        </div>

        <button type="submit" className="btn btn-light w-100 fw-bold">
          Register
        </button>
      </form>
    </div>
  );
}
